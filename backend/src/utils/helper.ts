import { BadGatewayException } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { Branded_App_Users } from 'src/shared/entity/branded_app_users.entity';
import { Users } from 'src/shared/entity/users.entity';
import { IsNull, Not } from 'typeorm';
import { UserRole, VALIDATION_MSG } from './constant';
import { UploadS3DataInterface } from './types';
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.REGION,
});

export const s3bucket = new AWS.S3({
  params: {
    Bucket: process.env.AWS_S3_BUCKET_PROFILEIMAGE,
  },
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const uploadImageToS3 = (key, data, bucketName) =>
  new Promise((resolve, reject) => {
    const params = {
      Key: key,
      Body: data,
      Bucket: bucketName,
      ACL: 'public-read',
    };
    s3bucket.upload(params, async (error, fileInfo) => {
      if (error) {
        return reject(error);
      }
      return resolve(fileInfo.Location);
    });
  });

export const uploadPhotoBufferToS3 = (
  key: string,
  data: Express.Multer.File,
  bucketName: string,
): Promise<UploadS3DataInterface> =>
  new Promise((resolve, reject) => {
    const params = {
      Key: key,
      Body: data.buffer,
      Bucket: bucketName,
      ContentType: data.mimetype,
      ACL: 'public-read',
    };

    s3bucket.upload(params, async (error, fileInfo) => {
      if (error) {
        return reject(error);
      }
      return resolve(fileInfo);
    });
  });

export const uploadDocumentToS3 = (key: string, file: Express.Multer.File, bucketName: string): Promise<unknown> =>
  new Promise((resolve, reject) => {
    const params = {
      Key: Date.now().toString() + '.' + key.split('.')[1],
      Body: file.buffer,
      Bucket: bucketName,
      ACL: 'public-read',
    };

    s3bucket.upload(params, async (error, fileInfo) => {
      if (error) {
        return reject(error);
      }
      return resolve(fileInfo);
    });
  });

export const uploadChatDocumentToS3 = (key: string, buffer: Buffer, bucketName: string): Promise<unknown> =>
  new Promise((resolve, reject) => {
    const params = {
      Key: Date.now().toString() + '_' + key,
      Body: buffer,
      Bucket: bucketName,
      ACL: 'public-read',
    };

    s3bucket.upload(params, async (error, fileInfo) => {
      if (error) {
        return reject(error);
      }
      return resolve(fileInfo);
    });
  });

export const uploadCalculationToS3 = (key: string, buffer: Buffer, bucketName: string): Promise<unknown> =>
  new Promise((resolve, reject) => {
    const params = {
      Key: key,
      Body: buffer,
      Bucket: bucketName,
      ACL: 'public-read',
    };

    s3bucket.upload(params, async (error, fileInfo) => {
      if (error) {
        return reject(error);
      }
      return resolve(fileInfo);
    });
  });

export const uploadQrCodeToS3 = (key: string, data: Buffer, bucketName: string): Promise<unknown> =>
  new Promise((resolve, reject) => {
    const params = {
      Key: key,
      Body: data,
      Bucket: bucketName,
      ACL: 'public-read',
      ContentEncoding: 'base64',
      ContentType: 'image/png',
    };
    s3bucket.upload(params, async (error, data) => {
      if (error) {
        return reject(error);
      }
      return resolve(data);
    });
  });

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const removeImageToS3 = (key, bucketName) =>
  new Promise((resolve, reject) => {
    const params = {
      Key: key,
      Bucket: bucketName,
    };
    s3bucket.deleteObject(params, async (error, data) => {
      if (error) {
        return reject(error);
      }
      return resolve(data);
    });
  });

export const fileS3Remove = async (filepath: string, bucketNameSource: string): Promise<any> => {
  const pathStrSplit = filepath.toString().split('/');
  const fileName = pathStrSplit.pop();
  let key: string = fileName;

  await removeImageToS3(`${key}`, bucketNameSource);
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// NOTE currently now we don't have use cases for this
// export const AUTH0Signup = async (
//   httpService: HttpService,
//   user: Users,
//   signupData: SignupMobileDto,
//   auth0Token: any,
// ): Promise<any> => {
//   await httpService
//     .post(
//       `${process.env.AUTH0_DOMAIN}dbconnections/signup`,
//       {
//         client_id: `${process.env.AUTH0_CLIENT_ID}`,
//         email: signupData.email,
//         password: signupData.password,
//         connection: 'Username-Password-Authentication',
//         user_metadata: {
//           contact_number: signupData.contact_code + '-' + signupData.contact_number,
//           role: user.role.toString(),
//         },
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${auth0Token}`,
//         },
//       },
//     )
//     .toPromise()
//     .catch(error => console.log(error, 'Auth0 Error'));
// };

export const brandedAppUser = async (user: Users): Promise<any> => {
  let id = null;

  if (user.role === 3 && user.parent_id) {
    // check for brandedApp employee lo
    const loUserDetails = await Users.findOne({
      where: {
        id: user.parent_id,
        parent_id: Not(IsNull()),
        role: UserRole.LO,
        deleted_at: IsNull(),
      },
    });
    if (loUserDetails) {
      id = loUserDetails.parent_id;
    } else {
      id = user.parent_id;
    }
  } else {
    // to check Branded App Lo
    id = user.parent_id ? user.parent_id : user.id; // brandedApp user not allowed
  }

  const brandedAppUser = await Branded_App_Users.findOne({
    where: {
      loan_officer_id: id,
      config_id: process.env.BUNDLE_IDENTIFIER + id,
      status: 1,
      reject_reason: IsNull(),
      deleted_at: IsNull(),
    },
  });
  if (brandedAppUser) {
    throw new BadGatewayException(VALIDATION_MSG.brandedapp_not_access);
  }
};
