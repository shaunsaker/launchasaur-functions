import { firebase } from '.';

export enum Plans {
  Basic = 'basic',
  Pro = 'pro',
}

export interface UserData {
  isEligibleForTrial: boolean;
  isTrialActive: boolean;
  trialStartDate: string;
  plan: Plans;
}

interface UserTrialsData {
  trialStartDate: string;
}

// taken and modified from https://www.thetechplatform.com/post/using-firestore-with-typescript
const converter = <T>() => ({
  toFirestore: (data: Partial<T>) => data,
  fromFirestore: (snapshot: firebase.firestore.QueryDocumentSnapshot) =>
    snapshot.data() as T,
});

const dataPoint = <T>(collectionPath: string) =>
  firebase.firestore().collection(collectionPath).withConverter(converter<T>());

const db = {
  users: dataPoint<UserData>('users'),
  userTrials: dataPoint<UserTrialsData>('userTrials'),
};

export { db };
