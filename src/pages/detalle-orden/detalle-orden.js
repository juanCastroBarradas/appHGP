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
import { NavController, NavParams, PopoverController, LoadingController, ViewController } from 'ionic-angular';
import { PopoverObservacionPage } from '../popover-observacion/popover-observacion';
import { PopoverEventosPage } from '../popover-eventos/popover-eventos';
import { HomePage } from '../home/home';
import { ApiProvider } from '../../providers/api/api';
var DetalleOrdenPage = /** @class */ (function () {
    function DetalleOrdenPage(navCtrl, navParams, viewCtrl, popoverCtrl, loadingCtrl, api) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.popoverCtrl = popoverCtrl;
        this.loadingCtrl = loadingCtrl;
        this.api = api;
        this.selectedItem = navParams.get('item');
        this.showObservacion = (this.selectedItem.cestatus == 'CERRADO') ? false : true;
    }
    DetalleOrdenPage.prototype.ngOnInit = function () {
        this.loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            content: 'Cargando detalle de la orden.'
        });
        this.cargaOrden();
    };
    DetalleOrdenPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad DetalleOrdenPage');
        this.loading.dismiss();
    };
    DetalleOrdenPage.prototype.presentPopover = function (myEvent) {
        var _this = this;
        var popover = this.popoverCtrl.create(PopoverObservacionPage, {
            idOrden: this.selectedItem.nidorden,
            estatusOrden: this.selectedItem.cestatus
        }, { enableBackdropDismiss: false });
        popover.present({});
        popover.onDidDismiss(function (popoverData) {
            _this.selectedItem.cestatus = popoverData.estatus;
            if (popoverData.modifica) {
                _this.dismiss();
                _this.navCtrl.setRoot(HomePage);
            }
        });
    };
    DetalleOrdenPage.prototype.popoverEventosShow = function (myEvent) {
        var popover = this.popoverCtrl.create(PopoverEventosPage, {
            idOrden: this.selectedItem.nidorden
        }, {});
        popover.present({});
    };
    DetalleOrdenPage.prototype.cargaOrden = function () {
        var _this = this;
        var nidOrden = this.selectedItem.nidorden;
        var seq = this.api.get('ordenes/consultar/' + nidOrden);
        seq.map(function (res) { return res.json(); })
            .subscribe(function (data) {
            _this.selectedItem = data.arrReults[0];
        }, function (error) {
            console.log(error);
        });
    };
    DetalleOrdenPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    DetalleOrdenPage = __decorate([
        Component({
            selector: 'page-detalle-orden',
            templateUrl: 'detalle-orden.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, ViewController,
            PopoverController, LoadingController, ApiProvider])
    ], DetalleOrdenPage);
    return DetalleOrdenPage;
}());
export { DetalleOrdenPage };
//# sourceMappingURL=detalle-orden.js.map