import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { ConfirmationService } from 'primeng/api';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
export const appConfig: ApplicationConfig = {
  providers: [
    MessageService,
    ConfirmationService,
    provideRouter(routes),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          projectId: 'todo-list-22a9f',
          appId: '1:35583167007:web:b3bd442eb915cc4dc6a32a',
          storageBucket: 'todo-list-22a9f.appspot.com',
          apiKey: 'AIzaSyDTz3zEJIFSK-AjuugOgCzAKqB-q6JBhxg',
          authDomain: 'todo-list-22a9f.firebaseapp.com',
          messagingSenderId: '35583167007',
        })
      )
    ),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    provideAnimations(),
  ],
};
