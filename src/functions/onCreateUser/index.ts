import * as functions from 'firebase-functions';
import { firebase } from '../../firebase';

export const onCreateUser = functions.auth
  .user().onCreate(async (user) => {
    await firebase.firestore().collection('users').doc(user.uid).set({
      plan: 'basic'
    })
  })