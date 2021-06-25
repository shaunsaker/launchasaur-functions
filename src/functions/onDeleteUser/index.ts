import * as functions from 'firebase-functions';
import { db } from '../../firebase/models';

export const onDeleteUser = functions.auth.user().onDelete(async (user) => {
  await db.users.doc(user.uid).delete();
});
