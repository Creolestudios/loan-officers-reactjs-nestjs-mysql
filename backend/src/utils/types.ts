export interface ListResponseInterface<T> {
  list: T;
}

export interface ResponseGlobalInterface<T> {
  data: T;
  message: string;
}

export type SuccessResponse = Record<string, unknown> | Array<unknown>;

export interface BorrowerInterface {
  name: string;
  created_at: Date;
}

export interface LOOfficerInterface {
  id: number;
  first_name: string;
  last_name: string;
  name: string;
  bio?: string | null;
  profile_photo?: string | null;
}

export type ObjectType = Record<string, any> | Array<any>;

export interface DeviceTokenInterface {
  device_token?: string;
}

export type GlobalResponseType = Promise<ResponseGlobalInterface<SuccessResponse>>;

export interface UploadS3DataInterface {
  Location: string;
}
