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
import { NavController, NavParams, LoadingController, ToastController, ViewController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { Storage } from '@ionic/storage';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
var PopoverObservacionPage = /** @class */ (function () {
    function PopoverObservacionPage(navCtrl, navParams, loadingCtrl, toastCtrl, viewCtrl, api, storage, barcodeScanner) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.viewCtrl = viewCtrl;
        this.api = api;
        this.storage = storage;
        this.barcodeScanner = barcodeScanner;
    }
    PopoverObservacionPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MyPopOverPage');
    };
    PopoverObservacionPage.prototype.ngOnInit = function () {
        var _this = this;
        if (this.navParams.data) {
            this.nidOrden = this.navParams.data.idOrden;
            this.estatusOrden = this.navParams.data.estatusOrden;
        }
        this.storage.get('dataUser').then(function (val) {
            _this.ctecnico = val.name;
            _this.nidtecnico = val.iduser;
        });
    };
    PopoverObservacionPage.prototype.registraObservacion = function (cstatus) {
        var _this = this;
        if (this.observacion == '' || this.observacion == null) {
            this.active = true;
        }
        else {
            this.active = false;
            this.barcodeScanner.scan().then(function (barcodeData) {
                var text = "success!! \ntexto: " + barcodeData.text + "\n" +
                    "formato: " + barcodeData.format;
                alert(text);
                var loading = _this.loadingCtrl.create({
                    spinner: 'bubbles',
                    content: 'Gurdando Observacion.'
                });
                loading.present();
                var seq = _this.api.post('ordenes/detalle/' + _this.nidOrden + '/capturar', { observacion: _this.observacion, nidtecnico: _this.nidtecnico, ctecnico: _this.ctecnico, ccstatus: cstatus });
                seq.map(function (res) { return res.json(); })
                    .subscribe(function (data) {
                    loading.dismiss();
                    var toast = _this.toastCtrl.create({
                        message: data.arrReults,
                        duration: 3000,
                        position: 'bottom'
                    });
                    toast.present();
                    _this.close(true);
                    _this.estatusOrden = cstatus;
                }, function (error) {
                    loading.dismiss();
                    console.log(error);
                    var toast = _this.toastCtrl.create({
                        message: 'Servidor inaccesible',
                        duration: 3000
                    });
                    toast.present();
                });
                _this.observacion = '';
            }, function (err) {
                alert("¡Lector QR no accesible!");
            });
        }
    };
    PopoverObservacionPage.prototype.close = function (modifica) {
        var data = { estatus: this.estatusOrden, modifica: modifica };
        this.viewCtrl.dismiss(data);
    };
    PopoverObservacionPage = __decorate([
        Component({
            selector: 'page-popover-observacion',
            templateUrl: 'popover-observacion.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, LoadingController,
            ToastController, ViewController, ApiProvider, Storage,
            BarcodeScanner])
    ], PopoverObservacionPage);
    return PopoverObservacionPage;
}());
export { PopoverObservacionPage };
//# sourceMappingURL=popover-observacion.js.map