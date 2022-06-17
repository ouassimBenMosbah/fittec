import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeFr from '@angular/common/locales/fr';
import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable, of } from 'rxjs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { AuthenticationService } from './modules/authentication/services/authentication/authentication.service';
import { BookingsModule } from './modules/bookings/bookings.module';
import { BooksModule } from './modules/books/books.module';
import { LocalStorageService } from './services/local-storage/local-storage.service';
registerLocaleData(localeFr);

export function setToken(
  authenticationService: AuthenticationService,
  localStorageService: LocalStorageService
): () => void {
  const factory = (): Observable<unknown> => {
    const tokenValue = localStorageService.get(
      authenticationService.localStorageTokenKey
    );
    if (!!tokenValue) {
      authenticationService.token = tokenValue;
    }
    return of();
  };
  return factory;
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    AuthenticationModule,
    BrowserModule,
    BrowserAnimationsModule,
    BookingsModule,
    BooksModule,
    HttpClientModule,
    MatTabsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    {
      deps: [AuthenticationService, LocalStorageService],
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: setToken
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
