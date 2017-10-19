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
import { DetalleOrdenPage } from '../detalle-orden/detalle-orden';
import { ApiProvider } from '../../providers/api/api';
import { FormBuilder, Validators } from '@angular/forms';
var OrdenesPage = /** @class */ (function () {
    function OrdenesPage(navCtrl, navParams, viewCtrl, loadingCtrl, toastCtrl, api, formBuilder) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.api = api;
        this.formBuilder = formBuilder;
        //this.filtro = navParams.get('filtro');
        //console.log(this.filtro);
        //this.cargaDatos();
        this.dislpayCerrado = this.dislpayPendiente = this.dislpayProceso = this.dislpayProceso = false;
        this.myForm = this.createMyForm();
    }
    OrdenesPage.prototype.createMyForm = function () {
        return this.formBuilder.group({
            filtro: ['', Validators.required],
        });
    };
    OrdenesPage.prototype.doRefresh = function (refresher) {
        this.cargaDatos();
        refresher.complete();
    };
    OrdenesPage.prototype.doSearch = function () {
    };
    OrdenesPage.prototype.cargaDatos = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            content: 'Cargando ordenes de servicio.'
        });
        loading.present();
        /*empleamos el uso del provider Api para realizar la peticiones http
        este metodo nos retornara una conexion http con respuesta de la ruta especificada*/
        //let seq = this.api.get('ordenes/consultar/all');
        var seq = this.api.get('ordenes/consultar/all/filtro/' + this.filtro);
        seq.map(function (res) { return res.json(); })
            .subscribe(function (data) {
            _this.ordenesFiltro = data.arrReults;
            _this.pendientes = data.arrReults.pendiente;
            _this.dislpayPendiente = (data.arrReults.pendiente.length > 0) ? true : false;
            _this.tramite = data.arrReults.tramite;
            _this.dislpayTramite = (data.arrReults.tramite.length > 0) ? true : false;
            _this.proceso = data.arrReults.proceso;
            _this.dislpayProceso = (data.arrReults.proceso.length > 0) ? true : false;
            _this.cerrado = data.arrReults.cerrado;
            _this.dislpayCerrado = (data.arrReults.cerrado.length > 0) ? true : false;
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
    OrdenesPage.prototype.itemTapped = function (event, item) {
        // That's right, we're pushing to ourselves!
        this.navCtrl.push(DetalleOrdenPage, {
            item: item
        });
    };
    OrdenesPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    OrdenesPage = __decorate([
        Component({
            selector: 'page-ordenes',
            templateUrl: 'ordenes.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            ViewController,
            LoadingController,
            ToastController,
            ApiProvider,
            FormBuilder])
    ], OrdenesPage);
    return OrdenesPage;
}());
export { OrdenesPage };
//# sourceMappingURL=ordenes.js.map