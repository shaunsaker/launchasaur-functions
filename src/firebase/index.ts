import * as admin from 'firebase-admin';
const serviceAccount = require('./service-account.json');

admin.initializeApp({
  credential: admin.credential.cert({
    privateKey: serviceAccount.private_key,
    clientEmail: serviceAccount.client_email,
    projectId: serviceAccount.project_id,
  }),
});

export { admin as firebase };
