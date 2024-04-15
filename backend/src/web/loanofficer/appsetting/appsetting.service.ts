import { Injectable, HttpException, HttpStatus, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/shared/entity/users.entity';
import { Repository, IsNull } from 'typeorm';
import { Loan_Officers_Details } from 'src/shared/entity/loan_officers_details.entity';
import { GlobalResponseType } from 'src/utils/types';
import { ResponseMap, UserRole, VALIDATION_MSG } from 'src/utils/constant';
import {
  DashBoardMenuSaveDto,
  AppMenuSaveDto,
  DashBoardCustomLinkSaveDto,
  AppGuideMenusDto,
} from 'src/dto/app-setting.dto';
import { isEmpty, find } from 'lodash';
import { MenuCustomLinkDto } from '../../../dto/app-setting.dto';
import { SuccessMessage } from '../../../utils/constant';
import { Branded_App_Users } from 'src/shared/entity/branded_app_users.entity';

@Injectable()
export class AppsettingService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    @InjectRepository(Branded_App_Users)
    private brandedAppUserRepository: Repository<Branded_App_Users>,
    @InjectRepository(Loan_Officers_Details)
    private loanOfficerDetailsRepository: Repository<Loan_Officers_Details>,
  ) {}

  async saveMortgageGuide(user: Users, appGuideMenusDto: AppGuideMenusDto): GlobalResponseType {
    try {
      const { mortgage_guide } = appGuideMenusDto;
      if (!Array.isArray(mortgage_guide)) {
        throw new BadRequestException(VALIDATION_MSG.mortgage_guide_array_of_object);
      }
      if (isEmpty(mortgage_guide)) {
        throw new BadRequestException(VALIDATION_MSG.mortgage_guide_not_empty);
      }

      const loanOfficerDetail = await this.loanOfficerDetailsRepository.findOne({
        user_id: user,
        deleted_at: IsNull(),
      });

      if (!loanOfficerDetail) {
        throw new NotFoundException(VALIDATION_MSG.lo_not_found);
      }

      loanOfficerDetail.mortgage_guide = JSON.stringify(mortgage_guide);
      await loanOfficerDetail.save();
      return ResponseMap(
        {
          mortgage_guide_list: mortgage_guide,
        },
        'success',
      );
    } catch (error) {
      throw new HttpException(error, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getMortgageGuide(user: Users): GlobalResponseType {
    try {
      const loanOfficerDetail = await this.loanOfficerDetailsRepository.findOne({
        user_id: user,
        deleted_at: IsNull(),
      });
      if (!loanOfficerDetail) {
        throw new NotFoundException(VALIDATION_MSG.lo_not_found);
      }
      const mortgageGuideMenu = loanOfficerDetail.mortgage_guide ? JSON.parse(loanOfficerDetail.mortgage_guide) : [];

      return ResponseMap(
        {
          mortgage_guide_list: mortgageGuideMenu,
        },
        'success',
      );
    } catch (error) {
      throw new HttpException(error, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // ANCHOR - DASHBOARD MENU
  async getDashboardMenu(user: Users): GlobalResponseType {
    try {
      const loanOfficerDetail = await this.loanOfficerDetailsRepository.findOne({
        user_id: user,
        deleted_at: IsNull(),
      });

      if (!loanOfficerDetail) {
        throw new NotFoundException(VALIDATION_MSG.lo_not_found);
      }

      const userDetails = await this.userRepository.findOne({
        id: user.id,
        deleted_at: IsNull(),
      });

      // Employee LO
      if (userDetails.parent_id) {
        // Send company links of LOprime to LO user. with disabled on!
        let dashboardMenus = loanOfficerDetail.dashboard_company_links
          ? JSON.parse(loanOfficerDetail.dashboard_company_links)
          : [];

        const custom_links = loanOfficerDetail.dashboard_menu_custom_links
          ? JSON.parse(loanOfficerDetail.dashboard_menu_custom_links)
          : [];

        if (loanOfficerDetail.isDM === 0) {
          dashboardMenus = dashboardMenus.filter((link: { id: string }) => {
            return link.id !== 'MESSAGE';
          });
        }

        return ResponseMap(
          {
            list: dashboardMenus,
            custom_links: custom_links,
          },
          'success',
        );
      }
      const brandedAppDetails = await this.brandedAppUserRepository.findOne({
        where: {
          loan_officer_id: user,
          status: 1,
          reject_reason: IsNull(),
          deleted_at: IsNull(),
        },
        order: {
          id: 'DESC',
        },
      });

      //Non-BrandedApp LO
      if (!brandedAppDetails) {
        // Send DashboardMenu Links
        let dashboardMenus = loanOfficerDetail.dashboard_menu_details
          ? JSON.parse(loanOfficerDetail.dashboard_menu_details)
          : [];

        const custom_links = loanOfficerDetail.dashboard_menu_custom_links
          ? JSON.parse(loanOfficerDetail.dashboard_menu_custom_links)
          : [];

        if (loanOfficerDetail.isDM === 0) {
          dashboardMenus = dashboardMenus.filter((link: { id: string }) => {
            return link.id !== 'MESSAGE';
          });
        }
        return ResponseMap(
          {
            list: dashboardMenus,
            custom_links: custom_links,
          },
          'success',
        );
      }
      //LO Prime
      else {
        let dashboardMenus = loanOfficerDetail.dashboard_menu_details
          ? JSON.parse(loanOfficerDetail.dashboard_menu_details)
          : [];

        const custom_links = loanOfficerDetail.dashboard_menu_custom_links
          ? JSON.parse(loanOfficerDetail.dashboard_menu_custom_links)
          : [];

        const companyLinksMenu = loanOfficerDetail.dashboard_company_links
          ? JSON.parse(loanOfficerDetail.dashboard_company_links)
          : [];

        if (loanOfficerDetail.isDM === 0) {
          dashboardMenus = dashboardMenus.filter((link: { id: string }) => {
            return link.id !== 'MESSAGE';
          });
        }

        return ResponseMap(
          {
            list: dashboardMenus,
            custom_links: custom_links,
            company_list: companyLinksMenu,
          },
          'success',
        );
      }
    } catch (error) {
      throw new HttpException(error, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // ANCHOR - UPDATE DASHBIARD MENU
  async saveDashboardMenu(user: Users, dashboardMenuDto: DashBoardMenuSaveDto): GlobalResponseType {
    try {
      const { menu, company_menu } = dashboardMenuDto;
      if (!Array.isArray(menu)) {
        throw new BadRequestException(VALIDATION_MSG.menu_array_of_object);
      }
      if (isEmpty(menu)) {
        throw new BadRequestException(VALIDATION_MSG.menu_not_empty);
      }
      if (!find(menu, { id: 'DASHBOARD' })) {
        throw new BadRequestException(VALIDATION_MSG.dashboard_required);
      }

      const userDetails = await this.userRepository.findOne({
        id: user.id,
        deleted_at: IsNull(),
      });
      const loanOfficerDetail = await this.loanOfficerDetailsRepository.findOne({
        user_id: user,
        deleted_at: IsNull(),
      });
      if (!loanOfficerDetail) {
        throw new NotFoundException(VALIDATION_MSG.lo_not_found);
      }

      // Employee LO
      if (userDetails.parent_id) {
        //save in company links.
        // !!! ADD isChangeable field here !!!
        loanOfficerDetail.dashboard_company_links = JSON.stringify(menu);
        await loanOfficerDetail.save();
        return ResponseMap(
          {
            list: menu,
          },
          'success',
        );
      }
      const brandedAppDetails = await this.brandedAppUserRepository.findOne({
        where: {
          loan_officer_id: user,
          status: 1,
          reject_reason: IsNull(),
          deleted_at: IsNull(),
        },
        order: {
          id: 'DESC',
        },
      });

      //Non-BrandedApp LO
      if (!brandedAppDetails) {
        // Save to DashboardMenu Links
        // !!! Don't add isChangeable field here !!!
        loanOfficerDetail.dashboard_menu_details = JSON.stringify(menu);
        await loanOfficerDetail.save();
        return ResponseMap(
          {
            list: menu,
          },
          'success',
        );
      }
      //LO prime
      else {
        if (!company_menu) {
          throw new BadRequestException(VALIDATION_MSG.company_menu_required);
        }
        if (!Array.isArray(company_menu)) {
          throw new BadRequestException(VALIDATION_MSG.company_menu_array_of_object);
        }
        if (isEmpty(company_menu)) {
          throw new BadRequestException(VALIDATION_MSG.company_menu_not_empty);
        }
        if (!find(company_menu, { id: 'DASHBOARD' })) {
          throw new BadRequestException(VALIDATION_MSG.dashboard_required);
        }

        loanOfficerDetail.dashboard_menu_details = JSON.stringify(menu);
        loanOfficerDetail.dashboard_company_links = JSON.stringify(company_menu);

        await loanOfficerDetail.save();
        //Update these in the Lo users.
        const usersDetails = await this.userRepository.find({
          select: [`id`],
          where: {
            parent_id: loanOfficerDetail.user_id,
            deleted_at: IsNull(),
          },
        });

        // if dashboard menu has unchecked and company menu is checked then add flag checked false & changeable to false
        company_menu.forEach(link => {
          if (!JSON.stringify(menu).includes(link.id)) {
            link.isChecked = false;
          }
        });

        if (usersDetails) {
          usersDetails.forEach(async user => {
            const loDetails = await this.loanOfficerDetailsRepository.findOne({
              where: {
                user_id: user.id,
                deleted_at: IsNull(),
              },
            });
            let newcompanyIDs = company_menu.map(link => link.id);

            if (loDetails && loDetails.dashboard_company_links) {
              let oldCompanyLinks = JSON.parse(loDetails.dashboard_company_links);

              let newCompanyLinks = oldCompanyLinks.map(link => {
                // if dashboard menu has unchecked and company menu is checked then add flag checked false & changeable to false
                if (!JSON.stringify(menu).includes(link.id)) {
                  link.isChecked = false;
                } else {
                  link.isChecked = true;
                }
                //Change Employee Link to not Changeable if already exists
                if (newcompanyIDs.includes(link.id)) {
                  newcompanyIDs = newcompanyIDs.filter(id => id !== link.id);
                  return {
                    ...link,
                    isChangeable: false,
                  };
                }
                //If link not in company_link then set isChangeable true
                else {
                  return {
                    ...link,
                    isChangeable: true,
                  };
                }
              });

              //For New links added by Branded LO set isChangeable false
              company_menu.forEach(link => {
                if (newcompanyIDs.includes(link.id)) {
                  newCompanyLinks.push({
                    ...link,
                    isChangeable: false,
                  });
                }
              });

              //Changes in Sequence if same sequence is encountered
              newCompanyLinks = await newCompanyLinks.map((link, index) => {
                link.sequence = index + 1;
                return {
                  ...link,
                };
              });

              loDetails.dashboard_company_links = JSON.stringify(await newCompanyLinks);
              await this.loanOfficerDetailsRepository.save(loDetails);
            } else if (loDetails && !loDetails.dashboard_company_links) {
              //No dashboard_company_links found --> Update BrandedLo links to employees.
              const newCompanyLinks = company_menu.map(link => {
                link.isChangeable = false;
                return link;
              });
              loDetails.dashboard_company_links = JSON.stringify(newCompanyLinks);
              await this.loanOfficerDetailsRepository.save(loDetails);
            }
          });
        }

        return ResponseMap(
          {
            list: menu,
            company_list: company_menu,
          },
          'success',
        );
      }
    } catch (error) {
      throw new HttpException(error, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // ANCHOR - ADD CUSTOM LINK DASHBOARD MENU
  async addCustomLinkToDashboardMenu(
    user: Users,
    dashboardCustomLinkDto: DashBoardCustomLinkSaveDto,
  ): GlobalResponseType {
    try {
      const loanOfficerDetail = await this.loanOfficerDetailsRepository.findOne({
        user_id: user,
        deleted_at: IsNull(),
      });
      if (!loanOfficerDetail) {
        throw new NotFoundException(VALIDATION_MSG.lo_not_found);
      }
      const dashboardCustomMenus = loanOfficerDetail.dashboard_menu_custom_links
        ? JSON.parse(loanOfficerDetail.dashboard_menu_custom_links)
        : [];
      const dashboardMenus = loanOfficerDetail.dashboard_menu_details
        ? JSON.parse(loanOfficerDetail.dashboard_menu_details)
        : [];
      const dashboardMenuCompanyLinks = loanOfficerDetail.dashboard_company_links
        ? JSON.parse(loanOfficerDetail.dashboard_company_links)
        : [];

      if (find(dashboardCustomMenus, { id: dashboardCustomLinkDto.id })) {
        throw new BadRequestException(VALIDATION_MSG.link_exits);
      }
      if (find(dashboardMenus, { id: dashboardCustomLinkDto.id })) {
        throw new BadRequestException(VALIDATION_MSG.link_exits);
      }
      if (find(dashboardMenuCompanyLinks, { id: dashboardCustomLinkDto.id })) {
        throw new BadRequestException(VALIDATION_MSG.link_exits);
      }
      dashboardCustomMenus.push({
        ...dashboardCustomLinkDto,
      });
      loanOfficerDetail.dashboard_menu_custom_links = JSON.stringify(dashboardCustomMenus);
      await loanOfficerDetail.save();
      return ResponseMap(
        {
          custom_links: dashboardCustomMenus,
        },
        'success',
      );
    } catch (error) {
      throw new HttpException(error, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // ANCHOR - DELETE CUSTOM LINK DASHBOARD MENU
  async deleteCustomLinkToDashboardMenu(user: Users, menuCustomLinkDto: MenuCustomLinkDto): GlobalResponseType {
    try {
      const loanOfficerDetail = await this.loanOfficerDetailsRepository.findOne({
        where: {
          user_id: user,
          deleted_at: IsNull(),
        },
      });

      if (isEmpty(loanOfficerDetail.dashboard_menu_custom_links)) {
        throw new NotFoundException(VALIDATION_MSG.link_not_exits);
      }

      let linkObject = JSON.parse(loanOfficerDetail.dashboard_menu_custom_links);
      let menuObject = JSON.parse(loanOfficerDetail.dashboard_menu_details);

      linkObject = linkObject
        .filter(link => {
          if (link.type === 2 && menuCustomLinkDto.id === link.id) {
            return false;
          }
          return true;
        })
        .map((link, inx) => ({ ...link, sequence: inx + 1 }));

      menuObject = menuObject
        .filter(link => {
          if (link.type === 2 && menuCustomLinkDto.id === link.id) {
            return false;
          }
          return true;
        })
        .map((link, inx) => ({ ...link, sequence: inx + 1 }));

      if (!isEmpty(loanOfficerDetail.dashboard_company_links)) {
        let companyLinkObject = JSON.parse(loanOfficerDetail.dashboard_company_links);

        companyLinkObject = companyLinkObject
          .filter(link => {
            if (link.type === 2 && menuCustomLinkDto.id === link.id) {
              return false;
            }
            return true;
          })
          .map((link, inx) => ({ ...link, sequence: inx + 1 }));

        loanOfficerDetail.dashboard_company_links = JSON.stringify(companyLinkObject);
      }

      loanOfficerDetail.dashboard_menu_custom_links = JSON.stringify(linkObject);
      loanOfficerDetail.dashboard_menu_details = JSON.stringify(menuObject);
      await loanOfficerDetail.save();

      const brandedAppDetails = await this.brandedAppUserRepository.findOne({
        where: {
          loan_officer_id: user,
          status: 1,
          reject_reason: IsNull(),
          deleted_at: IsNull(),
        },
      });

      if (brandedAppDetails) {
        const employeeLo = await this.userRepository.find({
          where: {
            parent_id: user,
            role: UserRole.LO,
            deleted_at: IsNull(),
          },
        });

        employeeLo.map(async employee => {
          const loanOfficerDetail = await this.loanOfficerDetailsRepository.findOne({
            where: {
              user_id: employee.id,
              deleted_at: IsNull(),
            },
          });

          if (!isEmpty(loanOfficerDetail.dashboard_company_links)) {
            let companyLinkObject = JSON.parse(loanOfficerDetail.dashboard_company_links);

            companyLinkObject = companyLinkObject
              .filter(link => {
                if (link.type === 2 && menuCustomLinkDto.id === link.id) {
                  return false;
                }
                return true;
              })
              .map((link, inx) => ({ ...link, sequence: inx + 1 }));

            loanOfficerDetail.dashboard_company_links = JSON.stringify(companyLinkObject);
          }

          await loanOfficerDetail.save();
        });
      }
      return ResponseMap({}, SuccessMessage.custom_link_deleted);
    } catch (error) {
      throw new HttpException(error, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // ANCHOR - APP MENU
  async getAppMenu(user: Users): GlobalResponseType {
    try {
      const loanOfficerDetail = await this.loanOfficerDetailsRepository.findOne({
        user_id: user,
        deleted_at: IsNull(),
      });
      if (!loanOfficerDetail) {
        throw new NotFoundException(VALIDATION_MSG.lo_not_found);
      }

      const userDetails = await this.userRepository.findOne({
        id: user.id,
        deleted_at: IsNull(),
      });

      // Employee LO
      if (userDetails.parent_id) {
        const custom_links = loanOfficerDetail.app_menu_custom_links
          ? JSON.parse(loanOfficerDetail.app_menu_custom_links)
          : [];

        // Send company links of LOprime to LO user. with disabled on!
        let appMenus = loanOfficerDetail.appMenu_company_links
          ? JSON.parse(loanOfficerDetail.appMenu_company_links)
          : [];

        if (loanOfficerDetail.isDM === 0) {
          appMenus = appMenus.filter((link: { id: string }) => {
            return link.id !== 'MESSAGE';
          });
        }
        return ResponseMap(
          {
            list: appMenus,
            custom_links: custom_links,
          },
          'success',
        );
      }
      const brandedAppDetails = await this.brandedAppUserRepository.findOne({
        where: {
          loan_officer_id: user,
          status: 1,
          reject_reason: IsNull(),
          deleted_at: IsNull(),
        },
        order: {
          id: 'DESC',
        },
      });

      //Non-BrandedApp LO
      if (!brandedAppDetails) {
        // Send DashboardMenu Links
        let appMenus = loanOfficerDetail.app_menu_details ? JSON.parse(loanOfficerDetail.app_menu_details) : [];

        const custom_links = loanOfficerDetail.app_menu_custom_links
          ? JSON.parse(loanOfficerDetail.app_menu_custom_links)
          : [];

        if (loanOfficerDetail.isDM === 0) {
          appMenus = appMenus.filter((link: { id: string }) => {
            return link.id !== 'MESSAGE';
          });
        }
        return ResponseMap(
          {
            list: appMenus,
            custom_links: custom_links,
          },
          'success',
        );
      }
      //LO Prime
      else {
        let appMenus = loanOfficerDetail.app_menu_details ? JSON.parse(loanOfficerDetail.app_menu_details) : [];

        const custom_links = loanOfficerDetail.app_menu_custom_links
          ? JSON.parse(loanOfficerDetail.app_menu_custom_links)
          : [];

        const companyLinksMenu = loanOfficerDetail.appMenu_company_links
          ? JSON.parse(loanOfficerDetail.appMenu_company_links)
          : [];

        if (loanOfficerDetail.isDM === 0) {
          appMenus = appMenus.filter((link: { id: string }) => {
            return link.id !== 'MESSAGE';
          });
        }
        return ResponseMap(
          {
            list: appMenus,
            custom_links: custom_links,
            company_list: companyLinksMenu,
          },
          'success',
        );
      }
    } catch (error) {
      throw new HttpException(error, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // ANCHOR - UPDATE APP MENU
  async saveAppMenu(user: Users, appMenuDto: AppMenuSaveDto): GlobalResponseType {
    try {
      const { menu, company_menu } = appMenuDto;
      if (!Array.isArray(menu)) {
        throw new BadRequestException(VALIDATION_MSG.menu_array_of_object);
      }
      if (isEmpty(menu)) {
        throw new BadRequestException(VALIDATION_MSG.menu_not_empty);
      }
      if (!find(menu, { id: 'DASHBOARD' })) {
        throw new BadRequestException(VALIDATION_MSG.dashboard_required);
      }

      const userDetails = await this.userRepository.findOne({
        id: user.id,
        deleted_at: IsNull(),
      });
      const loanOfficerDetail = await this.loanOfficerDetailsRepository.findOne({
        user_id: user,
        deleted_at: IsNull(),
      });
      if (!loanOfficerDetail) {
        throw new NotFoundException(VALIDATION_MSG.lo_not_found);
      }

      // Employee LO
      if (userDetails.parent_id) {
        //Get data and save them in company links.
        // !!! ADD isChangeable field here !!!
        loanOfficerDetail.appMenu_company_links = JSON.stringify(menu);
        await loanOfficerDetail.save();
        // this.handleBorrowerAppMenuChange(loanOfficerDetail, appMenuDto);
        return ResponseMap(
          {
            list: menu,
          },
          'success',
        );
      }
      const brandedAppDetails = await this.brandedAppUserRepository.findOne({
        where: {
          loan_officer_id: user,
          status: 1,
          reject_reason: IsNull(),
          deleted_at: IsNull(),
        },
        order: {
          id: 'DESC',
        },
      });

      //Non-BrandedApp LO
      if (!brandedAppDetails) {
        // Save to AppMenu Links
        // !!! Don't add isChangeable field here !!!
        loanOfficerDetail.app_menu_details = JSON.stringify(menu);
        await loanOfficerDetail.save();
        // this.handleBorrowerAppMenuChange(loanOfficerDetail, appMenuDto);
        return ResponseMap(
          {
            list: menu,
          },
          'success',
        );
      }
      //LO prime
      else {
        if (!company_menu) {
          throw new BadRequestException(VALIDATION_MSG.company_menu_required);
        }
        if (!Array.isArray(company_menu)) {
          throw new BadRequestException(VALIDATION_MSG.company_menu_array_of_object);
        }
        if (isEmpty(company_menu)) {
          throw new BadRequestException(VALIDATION_MSG.company_menu_not_empty);
        }
        if (!find(company_menu, { id: 'DASHBOARD' })) {
          throw new BadRequestException(VALIDATION_MSG.dashboard_required);
        }

        loanOfficerDetail.app_menu_details = JSON.stringify(menu);
        loanOfficerDetail.appMenu_company_links = JSON.stringify(company_menu);

        await loanOfficerDetail.save();
        //Update these in the Lo users.
        const usersDetails = await this.userRepository.find({
          select: [`id`],
          where: {
            parent_id: loanOfficerDetail.user_id,
            deleted_at: IsNull(),
          },
        });

        // if dashboard menu has unchecked and company menu is checked then add flag checked false & changeable to false
        company_menu?.forEach(link => {
          if (!JSON.stringify(menu).includes(link.id)) {
            link.isChecked = false;
          }
        });

        if (usersDetails) {
          usersDetails.forEach(async user => {
            const loDetails = await this.loanOfficerDetailsRepository.findOne({
              where: {
                user_id: user.id,
                deleted_at: IsNull(),
              },
            });
            let newcompanyIDs = company_menu.map(link => link.id);

            if (loDetails && loDetails.appMenu_company_links) {
              let oldCompanyLinks = JSON.parse(loDetails.appMenu_company_links);

              let newCompanyLinks = oldCompanyLinks.map(link => {
                // if dashboard menu has unchecked and company menu is checked then add flag checked false & changeable false
                if (!JSON.stringify(menu).includes(link.id)) {
                  link.isChecked = false;
                } else {
                  link.isChecked = true;
                }
                //Change Employee Link to not Changeable if already exists
                if (newcompanyIDs.includes(link.id)) {
                  newcompanyIDs = newcompanyIDs.filter(id => id !== link.id);
                  return {
                    ...link,
                    isChangeable: false,
                  };
                }
                //If link not in company_link then set isChangeable true
                else {
                  return {
                    ...link,
                    isChangeable: true,
                  };
                }
              });

              //For New links added by Branded LO set isChangeable false
              company_menu.forEach(link => {
                if (newcompanyIDs.includes(link.id)) {
                  newCompanyLinks.push({
                    ...link,
                    isChangeable: false,
                  });
                }
              });

              //Changes in Sequence if same sequence is encountered
              newCompanyLinks = await newCompanyLinks.map((link, index) => {
                link.sequence = index + 1;
                return {
                  ...link,
                };
              });

              loDetails.appMenu_company_links = JSON.stringify(await newCompanyLinks);
              await this.loanOfficerDetailsRepository.save(loDetails);
            } else if (loDetails && !loDetails.appMenu_company_links) {
              //No appMenu_company_links found --> Update BrandedLo links to employees.
              const newCompanyLinks = company_menu.map(link => {
                link.isChangeable = false;
                return link;
              });
              loDetails.appMenu_company_links = JSON.stringify(newCompanyLinks);
              await this.loanOfficerDetailsRepository.save(loDetails);
            }
          });
        }
        // this.handleBorrowerAppMenuChange(loanOfficerDetail, appMenuDto);
        return ResponseMap(
          {
            list: menu,
            company_list: company_menu,
          },
          'success',
        );
      }
    } catch (error) {
      throw new HttpException(error, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // ANCHOR - ADD CUSTOM LINK APP MENU
  async addCustomLinkToAppMenu(user: Users, appMenuDto: DashBoardCustomLinkSaveDto): GlobalResponseType {
    try {
      const loanOfficerDetail = await this.loanOfficerDetailsRepository.findOne({
        user_id: user,
        deleted_at: IsNull(),
      });
      if (!loanOfficerDetail) {
        throw new NotFoundException(VALIDATION_MSG.lo_not_found);
      }
      const appCustomMenus = loanOfficerDetail.app_menu_custom_links
        ? JSON.parse(loanOfficerDetail.app_menu_custom_links)
        : [];
      const appMenus = loanOfficerDetail.app_menu_details ? JSON.parse(loanOfficerDetail.app_menu_details) : [];
      const appMenuCompanyLinks = loanOfficerDetail.appMenu_company_links
        ? JSON.parse(loanOfficerDetail.appMenu_company_links)
        : [];

      if (find(appCustomMenus, { id: appMenuDto.id })) {
        throw new BadRequestException(VALIDATION_MSG.link_exits);
      }
      if (find(appMenus, { id: appMenuDto.id })) {
        throw new BadRequestException(VALIDATION_MSG.link_exits);
      }
      if (find(appMenuCompanyLinks, { id: appMenuDto.id })) {
        throw new BadRequestException(VALIDATION_MSG.link_exits);
      }

      appCustomMenus.push({
        ...appMenuDto,
      });
      loanOfficerDetail.app_menu_custom_links = JSON.stringify(appCustomMenus);
      await loanOfficerDetail.save();

      return ResponseMap(
        {
          custom_links: appCustomMenus,
        },
        'success',
      );
    } catch (error) {
      throw new HttpException(error, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // ANCHOR - DELETE CUSTOM LINK APP MENU
  async deleteCustomLinkToAppMenu(user: Users, menuCustomLinkDto: MenuCustomLinkDto): GlobalResponseType {
    try {
      const loanOfficerDetail = await this.loanOfficerDetailsRepository.findOne({
        where: {
          user_id: user,
          deleted_at: IsNull(),
        },
      });

      if (isEmpty(loanOfficerDetail.app_menu_custom_links)) {
        throw new NotFoundException(VALIDATION_MSG.link_not_exits);
      }

      let linkObject = JSON.parse(loanOfficerDetail.app_menu_custom_links);
      let menuObject = JSON.parse(loanOfficerDetail.app_menu_details);

      linkObject = linkObject
        .filter(link => {
          if (link.type === 2 && menuCustomLinkDto.id === link.id) {
            return false;
          }
          return true;
        })
        .map((link, inx) => ({ ...link, sequence: inx + 1 }));

      menuObject = menuObject
        .filter(link => {
          if (link.type === 2 && menuCustomLinkDto.id === link.id) {
            return false;
          }
          return true;
        })
        .map((link, inx) => ({ ...link, sequence: inx + 1 }));

      if (!isEmpty(loanOfficerDetail.appMenu_company_links)) {
        let companyLinkObject = JSON.parse(loanOfficerDetail.appMenu_company_links);

        companyLinkObject = companyLinkObject
          .filter(link => {
            if (link.type === 2 && menuCustomLinkDto.id === link.id) {
              return false;
            }
            return true;
          })
          .map((link, inx) => ({ ...link, sequence: inx + 1 }));

        loanOfficerDetail.appMenu_company_links = JSON.stringify(companyLinkObject);
      }

      loanOfficerDetail.app_menu_custom_links = JSON.stringify(linkObject);
      loanOfficerDetail.app_menu_details = JSON.stringify(menuObject);
      await loanOfficerDetail.save();

      const brandedAppDetails = await this.brandedAppUserRepository.findOne({
        where: {
          loan_officer_id: user,
          status: 1,
          reject_reason: IsNull(),
          deleted_at: IsNull(),
        },
      });

      if (brandedAppDetails) {
        const employeeLo = await this.userRepository.find({
          where: {
            parent_id: user,
            role: UserRole.LO,
            deleted_at: IsNull(),
          },
        });

        employeeLo.map(async employee => {
          const loanOfficerDetail = await this.loanOfficerDetailsRepository.findOne({
            where: {
              user_id: employee.id,
              deleted_at: IsNull(),
            },
          });

          if (!isEmpty(loanOfficerDetail.appMenu_company_links)) {
            let companyLinkObject = JSON.parse(loanOfficerDetail.appMenu_company_links);

            companyLinkObject = companyLinkObject
              .filter(link => {
                if (link.type === 2 && menuCustomLinkDto.id === link.id) {
                  return false;
                }
                return true;
              })
              .map((link, inx) => ({ ...link, sequence: inx + 1 }));

            loanOfficerDetail.appMenu_company_links = JSON.stringify(companyLinkObject);
          }

          await loanOfficerDetail.save();
        });
      }
      return ResponseMap({}, SuccessMessage.custom_link_deleted);
    } catch (error) {
      throw new HttpException(error, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async handleBorrowerAppMenuChange(
    loanOfficerDetail: Loan_Officers_Details,
    appMenuDto: AppMenuSaveDto,
  ): Promise<void> {
    const borrowers = await this.userRepository.find({
      deleted_at: null,
      parent_id: loanOfficerDetail.user_id,
    });

    if (!isEmpty(borrowers)) {
      await Promise.all(
        borrowers.map(async borrower => {
          if (!isEmpty(borrower.app_menu_details)) {
            let borrowerAppMenus = JSON.parse(borrower.app_menu_details);
            let loAppMenus = [];
            loAppMenus = appMenuDto.menu.map(element => element.id);
            const appMenus = borrowerAppMenus.map(element => element.id);

            // Remove check
            borrowerAppMenus = borrowerAppMenus.filter(element => {
              if (loAppMenus.includes(element.id)) {
                return true;
              } else {
                return false;
              }
            });

            // Add check
            loAppMenus = appMenuDto.menu.filter(element => {
              if (appMenus.includes(element.id)) {
                return false;
              } else {
                return true;
              }
            });

            loAppMenus.map(element => {
              borrowerAppMenus.push(element);
            });

            borrowerAppMenus = borrowerAppMenus.map((element, index) => {
              return {
                ...element,
                sequence: index + 1,
              };
            });

            borrower.app_menu_details = JSON.stringify(borrowerAppMenus);
            await borrower.save();
          }
        }),
      );
    }
  }
}
