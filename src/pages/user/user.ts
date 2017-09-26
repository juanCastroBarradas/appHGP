import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';


@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {
	nameUser: String;
	emailUser: String;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public alertCtrl: AlertController, 
			public loadingCtrl: LoadingController, public storage: Storage) {
  	this.storage.get('dataUser').then((val) => {
			this.nameUser = val.name;
			this.emailUser = val.email;
		});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  doLogoutUser(){
		let confirm = this.alertCtrl.create({
			message: '¿Desas cerrar sesion?',
			buttons: [
				{
				  text: 'Cancelar',
				  handler: () => {			  }
				},
				{
				  text: 'Aceptar',
				  handler: () => {
				    let loading = this.loadingCtrl.create({
						spinner: 'bubbles',
						content: 'cerrando sesion.'
					});
					loading.present();
					this.storage.set('isLoginStorage', false);
					this.storage.remove('dataUser');
					loading.dismiss();	
					this.navCtrl.setRoot(LoginPage);
				  }
				}
			]
		});
		confirm.present();	
	}

}
