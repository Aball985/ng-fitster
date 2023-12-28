import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { firebaseProviders } from './environment';

const serverConfig: ApplicationConfig = {
  providers: [provideServerRendering(), firebaseProviders],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
