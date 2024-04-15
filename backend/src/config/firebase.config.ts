import * as admin from 'firebase-admin';
import { ObjectType } from 'src/utils/types';

// TODO: Remove CLIENT_EMAIL env from envs.
export class FirebaseClass {
  constructor(public firebaseInstance?: ObjectType) {
    this.init();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async init() {
    let type = 'dev';
    switch (process.env.NODE_ENV) {
      case 'production':
        type = 'prod';
        break;
      case 'staging':
        type = 'stag';
        break;

      default:
        break;
    }

    const firebaseConfig = await import(`../../loantack-firebase-adminsdk-${type}.json`);
    const firebaseParams = {
      type: firebaseConfig.type,
      projectId: firebaseConfig.project_id,
      privateKeyId: firebaseConfig.private_key_id,
      privateKey: firebaseConfig.private_key,
      clientEmail: firebaseConfig.client_email,
      clientId: firebaseConfig.client_id,
      authUri: firebaseConfig.auth_uri,
      tokenUri: firebaseConfig.token_uri,
      authProviderX509CertUrl: firebaseConfig.auth_provider_x509_cert_url,
      clientC509CertUrl: firebaseConfig.client_x509_cert_url,
    };

    this.firebaseInstance = admin.initializeApp({
      credential: admin.credential.cert(firebaseParams),
      databaseURL: process.env.FIREBASE_DATABASE_URL,
    });

    console.log('************Firebase-Initialized************', this.firebaseInstance.name);

    return null;
  }
}

export const fireMainNode = 'loantack';

export const fireUsersNode = 'users';

export const fireChatListNode = 'chatList';
