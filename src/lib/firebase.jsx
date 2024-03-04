import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

// import { seedDatabase } from '~/seed';

const config = {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
};

const firebaseApp = firebase.initializeApp(config);
const { FieldValue } = firebase.firestore;

// seedDatabase(firebaseApp);

export { firebaseApp, FieldValue };
