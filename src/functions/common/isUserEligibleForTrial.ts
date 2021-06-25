import { db } from '../../firebase/models';

export const isUserEligibleForTrial = async (
  email: string,
): Promise<boolean> => {
  return !(await db.userTrials.doc(email).get()).exists;
};
