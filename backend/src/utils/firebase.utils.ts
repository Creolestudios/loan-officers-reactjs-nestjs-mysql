import * as admin from 'firebase-admin';
import { Users } from 'src/shared/entity/users.entity';

export const fireadmin = admin;

export async function createNewFirebaseUser(
  user: Users,
  userDto: admin.auth.UpdateRequest,
  emailVerified = false,
): Promise<admin.auth.UserRecord> {
  return await admin.auth().createUser({
    email: user.email,
    emailVerified: emailVerified,
    password: userDto.password,
    displayName: user.first_name + ' ' + user.last_name,
    disabled: false,
  });
}

export async function updateFirebaseUser(user: Users, userUpdateDto: admin.auth.UpdateRequest): Promise<any> {
  return await admin.auth().updateUser(user.firebase_user_id, userUpdateDto);
}

export async function retrieveFirebaseUser(user: Users): Promise<any> {
  return await admin.auth().getUser(user.firebase_user_id);
}
