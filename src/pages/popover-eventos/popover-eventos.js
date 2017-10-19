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
import { NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
var PopoverEventosPage = /** @class */ (function () {
    function PopoverEventosPage(navCtrl, navParams, viewCtrl, loadingCtrl, toastCtrl, api) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.api = api;
    }
    PopoverEventosPage.prototype.ngOnInit = function () {
        if (this.navParams.data) {
            this.nidOrden = this.navParams.data.idOrden;
        }
        this.loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            content: 'Cargando orden.'
        });
        this.cargaEventos();
    };
    PopoverEventosPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PopOverEventosPage');
        this.loading.dismiss();
    };
    PopoverEventosPage.prototype.close = function () {
        this.viewCtrl.dismiss();
    };
    PopoverEventosPage.prototype.cargaEventos = function () {
        var _this = this;
        this.loading.present();
        var seq = this.api.get('ordenes/detalle/' + this.nidOrden + '/consultar');
        seq.map(function (res) { return res.json(); })
            .subscribe(function (data) {
            _this.eventos = data.arrReults;
        }, function (error) {
            console.log(error);
            var toast = _this.toastCtrl.create({
                message: 'Error Access: Servidor inaccesible. no hay acceso a internet',
                duration: 3000
            });
            toast.present();
        });
    };
    PopoverEventosPage = __decorate([
        Component({
            selector: 'page-popover-eventos',
            templateUrl: 'popover-eventos.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, ViewController,
            LoadingController, ToastController, ApiProvider])
    ], PopoverEventosPage);
    return PopoverEventosPage;
}());
export { PopoverEventosPage };
//# sourceMappingURL=popover-eventos.js.map