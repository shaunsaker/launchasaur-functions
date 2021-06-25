import * as functions from 'firebase-functions';
import { db, Plans } from '../../firebase/models';
import { isUserEligibleForTrial } from '../common/isUserEligibleForTrial';

export const onCreateUser = functions.auth.user().onCreate(async (user) => {
  // if a user deletes their account, they could potentially start a new trial
  // by creating a new account, so we keep track of all user emails that have started trials
  // and check that before making the user eligible for a trial
  const isEligibleForTrial = await isUserEligibleForTrial(user.email);

  await db.users.doc(user.uid).set({
    isEligibleForTrial,
    isTrialActive: false,
    trialStartDate: '',
    plan: Plans.Basic,
  });
});
