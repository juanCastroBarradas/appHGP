var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { OrdenesPage } from '../pages/ordenes/ordenes';
import { DetalleOrdenPage } from '../pages/detalle-orden/detalle-orden';
import { OrdenTramitePage } from '../pages/orden-tramite/orden-tramite';
import { OrdenProcesoPage } from '../pages/orden-proceso/orden-proceso';
import { OrdenPendientePage } from '../pages/orden-pendiente/orden-pendiente';
import { PopoverObservacionPage } from '../pages/popover-observacion/popover-observacion';
import { PopoverEventosPage } from '../pages/popover-eventos/popover-eventos';
import { UserPage } from '../pages/user/user';
import { ApiProvider } from '../providers/api/api';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [
                MyApp,
                UserPage,
                HomePage,
                LoginPage,
                OrdenesPage,
                DetalleOrdenPage,
                OrdenTramitePage,
                OrdenProcesoPage,
                OrdenPendientePage,
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
                HomePage,
                LoginPage,
                OrdenesPage,
                DetalleOrdenPage,
                OrdenTramitePage,
                OrdenProcesoPage,
                OrdenPendientePage,
                PopoverEventosPage,
                PopoverObservacionPage
            ],
            providers: [
                StatusBar,
                SplashScreen,
                BarcodeScanner,
                { provide: ErrorHandler, useClass: IonicErrorHandler },
                ApiProvider
            ]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map