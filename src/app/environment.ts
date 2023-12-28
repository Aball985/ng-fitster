export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDbFbO8yXSgcztUvvf9GYlQOtJCOq7b60c',
    authDomain: 'ng-fitster.firebaseapp.com',
    projectId: 'ng-fitster',
    storageBucket: 'ng-fitster.appspot.com',
    messagingSenderId: '415252450748',
    appId: '1:415252450748:web:65e1b1abb09596697aefb9',
  },
};

import { importProvidersFrom, EnvironmentProviders } from '@angular/core';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';

const firebaseProviders: EnvironmentProviders = importProvidersFrom([
  provideFirebaseApp(() => initializeApp(environment.firebase)),
  provideFirestore(() => getFirestore()),
  provideAuth(() => getAuth()),
]);

export { firebaseProviders };
