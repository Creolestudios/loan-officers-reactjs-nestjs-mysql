import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { BadRequestException, BadGatewayException } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const imageFileFilter = (req: Request, file, callback: (type: null | Error, status: boolean) => void): void => {
  try {
    const filename = file.originalname.toLowerCase();
    if (!filename.match(/\.(jpg|jpeg|png|gif)$/)) {
      return callback(new BadRequestException('Only image files are allowed!'), false);
    }
    callback(null, true);
  } catch (error) {
    throw new BadGatewayException('Error');
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const documentFileFilter = (
  req: Request,
  file,
  callback: (type: null | Error, status: boolean) => void,
): void => {
  try {
    const filename = file.originalname.toLowerCase();
    if (!filename.match(/\.(jpg|jpeg|png|pdf|heic|heif)$/)) {
      return callback(new BadRequestException('Only documents files are allowed!'), false);
    }
    callback(null, true);
  } catch (error) {
    throw new BadGatewayException('Error');
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const editFileName = (req, file, callback) => {
  try {
    const name = file.originalname.split('.')[0];
    const filteredName = name.replace(/ /g, '_');
    const fileExtName = extname(file.originalname);
    const randomName = Array(4)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
    callback(null, `${filteredName}-${randomName}${fileExtName}`);
  } catch (error) {
    throw new BadGatewayException('Error');
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const editFileNameuid = (req, file, callback) => {
  try {
    const name = file.originalname.split('.')[0];
    const filteredName = name.replace(/ /g, '_');
    const fileExtName = extname(file.originalname);
    const randomName = uuidv4();
    callback(null, `${filteredName}-${randomName}${fileExtName}`);
  } catch (error) {
    throw new BadGatewayException('Error');
  }
};
