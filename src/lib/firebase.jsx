import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

// import { seedDatabase } from '~/seed';

const config = {
    apiKey: 'AIzaSyBNClFRFHz76JzaHckEg6aI6N9RhYjg8r0',
    authDomain: 'instagram-web-f9dff.firebaseapp.com',
    projectId: 'instagram-web-f9dff',
    storageBucket: 'instagram-web-f9dff.appspot.com',
    messagingSenderId: '821064868643',
    appId: '1:821064868643:web:78bb218f18c9e15a316296',
};

const firebaseApp = firebase.initializeApp(config);
const { FieldValue } = firebase.firestore;

// seedDatabase(firebaseApp);

export { firebaseApp, FieldValue };
