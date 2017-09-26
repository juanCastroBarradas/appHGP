import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { OrdenesPage } from '../pages/ordenes/ordenes';
import { DetalleOrdenPage } from '../pages/detalle-orden/detalle-orden';
import { PopoverObservacionPage } from '../pages/popover-observacion/popover-observacion';
import { PopoverEventosPage } from '../pages/popover-eventos/popover-eventos';
import { UserPage } from '../pages/user/user';
import { ApiProvider } from '../providers/api/api';

@NgModule({
  declarations: [
    MyApp,
    UserPage,
    LoginPage,
    OrdenesPage,
    DetalleOrdenPage,
    PopoverEventosPage,
    PopoverObservacionPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    UserPage,
    LoginPage,
    OrdenesPage,
    DetalleOrdenPage,
    PopoverEventosPage,
    PopoverObservacionPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiProvider
  ]
})
export class AppModule {}
