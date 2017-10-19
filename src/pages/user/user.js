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
import { NavController, NavParams, ViewController, AlertController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
var UserPage = /** @class */ (function () {
    function UserPage(navCtrl, navParams, viewCtrl, alertCtrl, loadingCtrl, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.storage = storage;
        this.storage.get('dataUser').then(function (val) {
            _this.nameUser = val.name;
            _this.emailUser = val.email;
        });
    }
    UserPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad UserPage');
    };
    UserPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    UserPage.prototype.doLogoutUser = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({
            message: '¿Desas cerrar sesion?',
            buttons: [
                {
                    text: 'Cancelar',
                    handler: function () { }
                },
                {
                    text: 'Aceptar',
                    handler: function () {
                        var loading = _this.loadingCtrl.create({
                            spinner: 'bubbles',
                            content: 'cerrando sesion.'
                        });
                        loading.present();
                        _this.storage.set('isLoginStorage', false);
                        _this.storage.remove('dataUser');
                        loading.dismiss();
                        _this.navCtrl.setRoot(LoginPage);
                    }
                }
            ]
        });
        confirm.present();
    };
    UserPage = __decorate([
        Component({
            selector: 'page-user',
            templateUrl: 'user.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, ViewController, AlertController,
            LoadingController, Storage])
    ], UserPage);
    return UserPage;
}());
export { UserPage };
//# sourceMappingURL=user.js.map