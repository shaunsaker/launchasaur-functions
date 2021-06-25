import * as functions from 'firebase-functions';
import * as moment from 'moment';
import { db, Plans } from '../../firebase/models';

export const trialsScheduler = functions.pubsub
  .schedule('0 0 * * *') // 00:00
  .onRun(async () => {
    // for every user with an active trial, check if it has expired (> 30 days)
    const now = moment();
    const docs = await db.users.where('isTrialActive', '==', true).get(); // FIXME: how to type this

    docs.forEach(async (doc) => {
      const { trialStartDate } = doc.data();
      const days = now.diff(moment(trialStartDate), 'days');

      if (days > 30) {
        await db.users.doc(doc.id).set(
          {
            isTrialActive: false,
            plan: Plans.Basic,
          },
          { merge: true },
        );
      }
    });

    return null;
  });
