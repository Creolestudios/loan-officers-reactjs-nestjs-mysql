import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { getManager, IsNull } from 'typeorm';
import * as Sentry from '@sentry/minimal';
import * as moment from 'moment';
import { MailerService } from '@nestjs-modules/mailer';
import { getPublicImageUrl, getUserProfilePath } from './utils/functions';
import { DEFAULT_PROFILE_IMAGE, DEPLOY_VERSION, ResponseMap, UserRole } from './utils/constant';
import { isEmpty } from 'lodash';
import { ResponseGlobalInterface, SuccessResponse } from './utils/types';
import { Loan_Officers_Details } from './shared/entity/loan_officers_details.entity';
import { Response } from 'express';
import { Users } from './shared/entity/users.entity';
@Injectable()
export class AppService {
  constructor(private readonly mailerService: MailerService) {}

  serverCheck(): ResponseGlobalInterface<SuccessResponse> {
    return ResponseMap({ version: DEPLOY_VERSION }, 'Server is running');
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async redirectWebLink(id: number, res: Response) {
    const loDetails = await Loan_Officers_Details.findOne({
      where: {
        user_id: id,
        deleted_at: IsNull(),
      },
    });

    const userDetails = await Users.findOne({
      where: {
        id,
        deleted_at: IsNull(),
      },
    });

    // Employee
    if (userDetails.role === UserRole.LO && userDetails.parent_id) {
      const loBrandDetails = await Loan_Officers_Details.findOne({
        where: {
          user_id: userDetails.parent_id,
          deleted_at: IsNull(),
        },
      });

      return res.redirect(loBrandDetails.web_link || process.env.DEEP_LINK_REDIRECT_URL);
    }

    // Co-Brand
    if (userDetails.role === UserRole.PARTNERS && userDetails.parent_id) {
      const userParentLODetails = await Users.findOne({
        where: {
          id: userDetails.parent_id,
          deleted_at: IsNull(),
        },
      });

      // Branded App - Co-Brand
      if (userParentLODetails.parent_id) {
        const loBrandDetails = await Loan_Officers_Details.findOne({
          where: {
            user_id: userParentLODetails.parent_id,
            deleted_at: IsNull(),
          },
        });

        return res.redirect(loBrandDetails.web_link || process.env.DEEP_LINK_REDIRECT_URL);
      }

      // Regular LO - Co-Brand
      const loRegularDetails = await Loan_Officers_Details.findOne({
        where: {
          user_id: userDetails.parent_id,
          deleted_at: IsNull(),
        },
      });
      return res.redirect(loRegularDetails.web_link || process.env.DEEP_LINK_REDIRECT_URL);
    }

    // Regular LO
    return res.redirect(loDetails.web_link || process.env.DEEP_LINK_REDIRECT_URL);
  }

  @Cron('0 0 */15 * *') // At 00:00 on every 15th day-of-month.
  tokenExpiryCron(): void {
    console.log('Token Expiry Cron Started');
    this.tokenDelete();
  }

  async tokenDelete(): Promise<void> {
    try {
      const sqlQuery = `DELETE FROM oauth__tokens WHERE created_at <= NOW() - INTERVAL 1 DAY`;
      const entityManager = getManager();
      await entityManager.query(sqlQuery);
    } catch (error) {
      Sentry.captureException(error);
    }
  }

  @Cron('0 */24 * * *') // At minute 0 past every 24th hour.
  async reportCronJobLo(): Promise<void> {
    try {
      this.reportCheck(true);
    } catch (error) {
      console.log(error, 'catch error');
      Sentry.captureException(error);
    }
  }
  @Cron('0 0 * * 0') // At 00:00 on Sunday.
  async reportCronJobWeeklyLo(): Promise<void> {
    try {
      this.reportCheck(false);
    } catch (error) {
      console.log(error, 'catch error');
      Sentry.captureException(error);
    }
  }

  async reportCheck(isDaily: boolean): Promise<void> {
    try {
      const loDetailsQuery = `SELECT DISTINCT(loan__officers__details.id) as id, loan__officers__details.user_id, loan__officers__details.report_settings, 
      users.first_name, users.last_name, users.email, users.profile_photo, users.company_name, users.contact_code, users.contact_number, user_add.city,
      user_add.street_details, user_add.zip_code 
      FROM loan__officers__details INNER JOIN users ON users.id = loan__officers__details.user_id 
      LEFT JOIN user__address user_add ON user_add.user_id = loan__officers__details.user_id 
      WHERE loan__officers__details.deleted_at IS NULL AND users.role = ${UserRole.LO}`;
      const entityManager = getManager();
      const loResult = await entityManager.query(loDetailsQuery);

      if (isDaily) {
        loResult.map(async lo => {
          const report = JSON.parse(lo.report_settings);

          if (report.daily_report) {
            this.reportLogic(lo, isDaily);
          }
        });
      } else {
        loResult.map(async lo => {
          const report = JSON.parse(lo.report_settings);

          if (report.weekly_report) {
            this.reportLogic(lo, isDaily);
          }
        });
      }
    } catch (error) {
      console.log(error, 'catch error');
      Sentry.captureException(error);
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async reportLogic(lo: any, isDaily: boolean): Promise<void> {
    try {
      const entityManager = getManager();
      const userTotalRegQuery = `SELECT COUNT(users.id) as registration FROM users WHERE users.deleted_at IS NULL AND users.parent_id = ${lo.user_id} AND role = ${UserRole.BORROWER}`;
      const userTotalCalQuery = `SELECT COUNT(calculations.id) as calculations FROM calculations INNER JOIN users ON users.id = calculations.calculation_by_id WHERE users.deleted_at IS NULL AND users.parent_id = ${lo.user_id} AND users.role = ${UserRole.BORROWER} `;

      let userTotalRegResult = await entityManager.query(userTotalRegQuery);
      let userCalTotalResult = await entityManager.query(userTotalCalQuery);

      userTotalRegResult = !isEmpty(userTotalRegResult) ? userTotalRegResult?.[0]?.registration ?? '0' : '0';
      userCalTotalResult = !isEmpty(userCalTotalResult) ? userCalTotalResult?.[0]?.calculations ?? '0' : '0';

      const userRegQuery = `SELECT COUNT(users.id) as registration FROM users WHERE users.deleted_at IS NULL AND users.parent_id = ${
        lo.user_id
      } AND users.role = ${UserRole.BORROWER} AND ${
        isDaily
          ? `CAST(users.lo_selection as DATE) = "${moment().format('YYYY-MM-DD')}"`
          : `users.lo_selection >= "${moment()
              .subtract(7, 'd')
              .format('YYYY-MM-DD')}" AND users.lo_selection < "${moment().format('YYYY-MM-DD')}"`
      } `;

      const userCalQuery = `SELECT COUNT(calculations.id) as calculations FROM calculations INNER JOIN users ON users.id = calculations.calculation_by_id WHERE users.deleted_at IS NULL AND users.parent_id = ${
        lo.user_id
      } AND ${
        isDaily
          ? `CAST(calculations.created_at as DATE) = "${moment().format('YYYY-MM-DD')}"`
          : `calculations.created_at >= "${moment()
              .subtract(7, 'd')
              .format('YYYY-MM-DD')}" AND calculations.created_at < "${moment().format('YYYY-MM-DD')}"`
      } `;

      const userCoBrandRegQuery = `SELECT DISTINCT(users.id), users.first_name, users.last_name, users.email FROM users WHERE users.deleted_at IS NULL AND users.parent_id = ${
        lo.user_id
      } AND users.role = ${UserRole.PARTNERS} AND ${
        isDaily
          ? `CAST(users.lo_selection as DATE) = "${moment().format('YYYY-MM-DD')}"`
          : `users.lo_selection >= "${moment()
              .subtract(7, 'd')
              .format('YYYY-MM-DD')}" AND users.lo_selection < "${moment().format('YYYY-MM-DD')}"`
      } `;

      const userDetailRegQuery = `SELECT DISTINCT(users.id), users.first_name, users.last_name, users.email FROM users WHERE users.deleted_at IS NULL AND users.parent_id = ${
        lo.user_id
      } AND users.role = ${UserRole.BORROWER} AND ${
        isDaily
          ? `CAST(users.lo_selection as DATE) = "${moment().format('YYYY-MM-DD')}"`
          : `users.lo_selection >= "${moment()
              .subtract(7, 'd')
              .format('YYYY-MM-DD')}" AND users.lo_selection < "${moment().format('YYYY-MM-DD')}"`
      } `;

      let userRegResult = await entityManager.query(userRegQuery);
      let userCalResult = await entityManager.query(userCalQuery);
      const userCoBrandRegResult = await entityManager.query(userCoBrandRegQuery);
      const userDetailRegResult = await entityManager.query(userDetailRegQuery);

      userRegResult = !isEmpty(userRegResult) ? userRegResult?.[0]?.registration ?? '0' : '0';
      userCalResult = !isEmpty(userCalResult) ? userCalResult?.[0]?.calculations ?? '0' : '0';
      const name = lo.first_name + ' ' + lo.last_name;
      const profile_photo = lo.profile_photo ? getUserProfilePath(lo.profile_photo) : DEFAULT_PROFILE_IMAGE;
      const company_name = lo.company_name ? lo.company_name + ',' : '';
      const contact_info = lo.contact_number ? '+' + lo.contact_code + ' ' + lo.contact_number : '';
      const city = lo.city && lo.zip_code ? lo.city + ',' + lo.zip_code : '';
      const street_details = lo.street_details ? lo.street_details + ',' : '';

      this.mailerService
        .sendMail({
          to: lo.email,
          from: process.env.SENDGRID_USER_EMAIL,
          subject: 'Daily Report',
          template: 'report',
          context: {
            imageData: getPublicImageUrl(),
            dateTimeRender: isDaily
              ? `${moment().format('MMM DD, ‘YY')}`
              : `${moment()
                  .subtract(7, 'd')
                  .format('MMM DD, ‘YY')} - ${moment().format('MMM DD, ‘YY')}`,
            name,
            profile_photo,
            company_name,
            contact_info,
            city,
            street_details,
            userTotalRegResult,
            userCalTotalResult,
            userRegResult,
            userCalResult,
            userCoBrandRegResult,
            userDetailRegResult,
          },
        })
        .catch(mailError => {
          console.log(mailError, 'Mail Error');
          Sentry.captureException(mailError);
          // sendFailureMail(this.mailerService, mailError);
        });
    } catch (error) {
      console.log(error, 'catch error');
      Sentry.captureException(error);
    }
  }
}
