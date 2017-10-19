import { Component, AfterContentInit, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ApiProvider } from '../../providers/api/api';
import { HomePage } from '../home/home';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements AfterContentInit{
	myForm: FormGroup;
	@ViewChild("divLogin", {read: ElementRef}) divLogin: ElementRef;
	@ViewChild("content", {read: ElementRef}) content: ElementRef;

	constructor(public navCtrl: NavController, 
				public navParams: NavParams, 
				public storage: Storage, 
				public api : ApiProvider, 
				public loadingCtrl: LoadingController, 
				public toastCtrl: ToastController,
    			public formBuilder: FormBuilder) {
		this.myForm = this.createMyForm();
	}

	ngAfterContentInit() {

  	}

  	focusFunction(){
  		//let scrollForm = this.divLogin.nativeElement.getBoundingClientRect();
  		//this.divLogin.nativeElement.get(0).scrollIntoView();
  		console.log(this.divLogin.nativeElement.getBoundingClientRect());
  		console.log(this.content);
  		/*this.content.nativeElement.animate({
		    scrollTop: 0
		}, 8000);*/
  	}

	private createMyForm(){
		return this.formBuilder.group({
			email: ['', Validators.required],
			password: ['', Validators.required],
		});
	}
  
	doLoginUser(){
		let loading = this.loadingCtrl.create({
			spinner: 'bubbles',
			content: 'iniciando sesion.'
		});
		loading.present();
    	/*empleamos el uso del provider Api para realizar la peticiones http
		este metodo nos retornara una conexion http con respuesta de la ruta especificada*/
		//let seq = this.api.get('ordenes/consultar/all');
		let seq = this.api.post('usuario/login', { user : this.myForm.value.email, password: this.myForm.value.password });
		/*procemos a mapiar la solicitud http y suscribirnos a la peticion
		 validamos que todo halla ocurrido bien, en caso de error manejamos el error */
		seq.map(res => res.json())
	    	.subscribe(data => {
	    		loading.dismiss();
	      		console.error(data);
	      		if(data.Estatus == "success"){
	      			//bandera que nos permite saber cada vez que abramos la app si esta logeado el usuario
	      			this.storage.set('isLoginStorage', true);
	      			this.storage.set('dataUser', data.arrReults);
	      			this.navCtrl.setRoot(HomePage);
	      		}else{
	      			let toast = this.toastCtrl.create({
						message: 'Error: '+data.arrReults,
						duration: 4000
					});
					toast.present();
	      		}
	    	}, err => {
	    		loading.dismiss();
	        	console.error('ERROR', err);
				let toast = this.toastCtrl.create({
					message: 'Error Access: Servidor inaccesible. no hay acceso a internet',
					duration: 4000
				});
				toast.present();
	    	});
	}

}
