import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule, TranslateStore } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { environment } from '../environments/environment';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { ToastrModule } from 'ngx-toastr';
import { AuthState } from './auth/store/state/login.state';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { HeadersInterceptor } from './interceptors/headers.interceptor';
import { ErrorCatchingInterceptor } from './interceptors/error-catching.interceptor';
import { AllTasksState } from './dashboard/task-admin/store/state/allTasks.state';
<<<<<<< HEAD
import { MatPaginatorIntl } from '@angular/material/paginator';
=======
>>>>>>> 1d7c48d0e3be976f4a475297d7a898e5d4c2c6bd

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot(),

    TranslateModule.forRoot({
      defaultLanguage: "en",
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    NgxsModule.forRoot([AllTasksState]),
    NgxsReduxDevtoolsPluginModule.forRoot({
      maxAge: 50
    }),
    NgxsLoggerPluginModule.forRoot({
      // Do not log in production mode
      disabled: environment.production
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorCatchingInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
