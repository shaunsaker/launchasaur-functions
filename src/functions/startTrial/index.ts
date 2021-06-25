import * as functions from 'firebase-functions';
import * as moment from 'moment';
import { db } from '../../firebase/models';
import { isUserEligibleForTrial } from '../common/isUserEligibleForTrial';

export const startTrial = functions.https.onCall(async (_, context) => {
  // check if the user is eligible to start a trial
  const email = context.auth.token.email;
  const isEligibleForTrial = await isUserEligibleForTrial(email);

  if (isEligibleForTrial) {
    // if they are, set the user data
    const uid = context.auth.uid;
    const trialStartDate = moment().toISOString();
    await db.users.doc(uid).set(
      {
        isTrialActive: true,
        trialStartDate,
      },
      { merge: true }, // update does not type correctly
    );

    // and the userTrial data
    await db.userTrials.doc(email).set({
      trialStartDate,
    });

    return {
      success: true,
    };
  } else {
    throw new functions.https.HttpsError(
      'permission-denied',
      `User with email, ${email}, has already started/completed their Pro trial.`,
    );
  }
});
