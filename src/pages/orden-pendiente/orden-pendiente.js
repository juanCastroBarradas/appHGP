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
import { NavController, NavParams, LoadingController, ToastController, ModalController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { DetalleOrdenPage } from '../detalle-orden/detalle-orden';
var OrdenPendientePage = /** @class */ (function () {
    function OrdenPendientePage(navCtrl, navParams, loadingCtrl, toastCtrl, api, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.api = api;
        this.modalCtrl = modalCtrl;
        this.cargaDatos();
    }
    OrdenPendientePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad OrdenPendientePage');
    };
    OrdenPendientePage.prototype.cargaDatos = function () {
        var _this = this;
        var cestatus = 'PENDIENTE';
        var loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            content: 'Cargando ordenes de servicio.'
        });
        loading.present();
        /*empleamos el uso del provider Api para realizar la peticiones http
        este metodo nos retornara una conexion http con respuesta de la ruta especificada*/
        //let seq = this.api.get('ordenes/consultar/all');
        var seq = this.api.get('ordenes/consultar/all/' + cestatus);
        seq.map(function (res) { return res.json(); })
            .subscribe(function (data) {
            console.log(data);
            _this.ordenes = data.arrReults;
            loading.dismiss();
        }, function (err) {
            console.error('ERROR', err);
            loading.dismiss();
            var toast = _this.toastCtrl.create({
                message: 'Error Access: Servidor inaccesible. no hay acceso a internet',
                duration: 4000
            });
            toast.present();
        });
    };
    OrdenPendientePage.prototype.doRefresh = function (refresher) {
        this.cargaDatos();
        refresher.complete();
    };
    OrdenPendientePage.prototype.itemTapped = function (event, item) {
        // That's right, we're pushing to ourselves!
        var contactModal = this.modalCtrl.create(DetalleOrdenPage, {
            item: item
        });
        contactModal.present();
    };
    OrdenPendientePage = __decorate([
        Component({
            selector: 'page-orden-pendiente',
            templateUrl: 'orden-pendiente.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, LoadingController,
            ToastController, ApiProvider, ModalController])
    ], OrdenPendientePage);
    return OrdenPendientePage;
}());
export { OrdenPendientePage };
//# sourceMappingURL=orden-pendiente.js.map