import * as functions from 'firebase-functions';
import { firebase } from '../../firebase';

export const onDeleteUser = functions.auth.user().onDelete(async (user) => {
  await firebase.firestore().collection('users').doc(user.uid).delete();
});
