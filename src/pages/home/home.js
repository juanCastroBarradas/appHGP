var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { OrdenTramitePage } from '../orden-tramite/orden-tramite';
import { OrdenProcesoPage } from '../orden-proceso/orden-proceso';
import { OrdenPendientePage } from '../orden-pendiente/orden-pendiente';
import { UserPage } from '../user/user';
var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, navParams, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.ordenTramite = OrdenTramitePage;
        this.ordenProceso = OrdenProcesoPage;
        this.ordenPendiente = OrdenPendientePage;
    }
    HomePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad HomePage');
    };
    HomePage.prototype.modalUserShow = function () {
        var contactModal = this.modalCtrl.create(UserPage);
        contactModal.present();
    };
    HomePage = __decorate([
        Component({
            selector: 'page-home',
            templateUrl: 'home.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            ModalController])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.js.map