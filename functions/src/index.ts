import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

// Example Cloud Function
export const helloWorld = functions.https.onRequest((_request, response) => {
  functions.logger.info('Hello logs!', { structuredData: true });
  response.json({ message: 'Hello from Firebase!' });
});

// Example Firestore trigger
export const onUserCreate = functions.firestore
  .document('users/{userId}')
  .onCreate(async (snap, context) => {
    const userData = snap.data();
    functions.logger.info('User created', {
      userId: context.params.userId,
      userData,
    });

    // Add any custom logic here
    return null;
  });
