import * as functions from 'firebase-functions';


export const onWriteBotIsAlive = functions.firestore
  .document('bots/{botId}')
  .onWrite(async () => {
    // do something
  });
