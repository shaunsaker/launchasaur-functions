import * as functions from 'firebase-functions';
import { firebase } from '../../firebase';

export const onCreateUser = functions.auth.user().onCreate(async (user) => {
  // if a user deletes their account, they could potentially start a new trial
  // by creating a new account, so we keep track of all user emails that have started trials
  // and check that before making the user eligible for a trial
  const isEligibleForTrial = !(
    await firebase.firestore().collection('userTrials').doc(user.email).get()
  ).exists;

  await firebase.firestore().collection('users').doc(user.uid).set({
    isEligibleForTrial,
    plan: 'basic',
  });
});
