var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ApiProvider } from '../../providers/api/api';
import { HomePage } from '../home/home';
import { FormBuilder, Validators } from '@angular/forms';
var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, navParams, storage, api, loadingCtrl, toastCtrl, formBuilder) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.api = api;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.formBuilder = formBuilder;
        this.myForm = this.createMyForm();
    }
    LoginPage.prototype.ngAfterContentInit = function () {
    };
    LoginPage.prototype.focusFunction = function () {
        //let scrollForm = this.divLogin.nativeElement.getBoundingClientRect();
        //this.divLogin.nativeElement.get(0).scrollIntoView();
        console.log(this.divLogin.nativeElement.getBoundingClientRect());
        console.log(this.content);
        /*this.content.nativeElement.animate({
            scrollTop: 0
        }, 8000);*/
    };
    LoginPage.prototype.createMyForm = function () {
        return this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
        });
    };
    LoginPage.prototype.doLoginUser = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            content: 'iniciando sesion.'
        });
        loading.present();
        /*empleamos el uso del provider Api para realizar la peticiones http
        este metodo nos retornara una conexion http con respuesta de la ruta especificada*/
        //let seq = this.api.get('ordenes/consultar/all');
        var seq = this.api.post('usuario/login', { user: this.myForm.value.email, password: this.myForm.value.password });
        /*procemos a mapiar la solicitud http y suscribirnos a la peticion
         validamos que todo halla ocurrido bien, en caso de error manejamos el error */
        seq.map(function (res) { return res.json(); })
            .subscribe(function (data) {
            loading.dismiss();
            console.error(data);
            if (data.Estatus == "success") {
                //bandera que nos permite saber cada vez que abramos la app si esta logeado el usuario
                _this.storage.set('isLoginStorage', true);
                _this.storage.set('dataUser', data.arrReults);
                _this.navCtrl.setRoot(HomePage);
            }
            else {
                var toast = _this.toastCtrl.create({
                    message: 'Error: ' + data.arrReults,
                    duration: 4000
                });
                toast.present();
            }
        }, function (err) {
            loading.dismiss();
            console.error('ERROR', err);
            var toast = _this.toastCtrl.create({
                message: 'Error Access: Servidor inaccesible. no hay acceso a internet',
                duration: 4000
            });
            toast.present();
        });
    };
    __decorate([
        ViewChild("divLogin", { read: ElementRef }),
        __metadata("design:type", ElementRef)
    ], LoginPage.prototype, "divLogin", void 0);
    __decorate([
        ViewChild("content", { read: ElementRef }),
        __metadata("design:type", ElementRef)
    ], LoginPage.prototype, "content", void 0);
    LoginPage = __decorate([
        Component({
            selector: 'page-login',
            templateUrl: 'login.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            Storage,
            ApiProvider,
            LoadingController,
            ToastController,
            FormBuilder])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.js.map