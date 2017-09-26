import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, ModalController } from 'ionic-angular';
import { DetalleOrdenPage } from '../detalle-orden/detalle-orden';
import { UserPage } from '../user/user';
import { ApiProvider } from '../../providers/api/api';

@Component({
  selector: 'page-ordenes',
  templateUrl: 'ordenes.html',
})
export class OrdenesPage {
	ordenes : any[];

	constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController,
				public loadingCtrl: LoadingController, public toastCtrl: ToastController, public api : ApiProvider) {
		this.cargaDatos();
	}

	ngOnInit(){
		
  	}

  	ionViewDidLoad() {
  		console.log('ionViewDidLoad HomePage');
	}

	modalUserShow() {
		let contactModal = this.modalCtrl.create(UserPage);
   		contactModal.present();
	}

	doRefresh(refresher){
		this.cargaDatos();	      
		refresher.complete();
	}

	cargaDatos(){
		let loading = this.loadingCtrl.create({
	    	spinner: 'bubbles',
      		content: 'Cargando eventos de la orden.'
		});		
		loading.present();
		/*empleamos el uso del provider Api para realizar la peticiones http
		este metodo nos retornara una conexion http con respuesta de la ruta especificada*/
		//let seq = this.api.get('ordenes/consultar/all');
		let seq = this.api.get('ordenes/consultar/all');
		seq.map(res => res.json())
		    	.subscribe(data => {
		      		this.ordenes = data.arrReults;
		      		loading.dismiss();
		    	},err => {
		        	console.error('ERROR', err);
		        	loading.dismiss();
					let toast = this.toastCtrl.create({
						message: 'Error Access: Servidor inaccesible. no hay acceso a internet',
						duration: 4000
					});
					toast.present();
		    	});
	}

	itemTapped(event, item) {
		// That's right, we're pushing to ourselves!
		this.navCtrl.push(DetalleOrdenPage, {
			item: item
		});
	}


	filterItems(ev) {
		// set val to the value of the ev target
    	var val = ev.target.value;

		if (val && val.trim() !== '') {
			//this.usuarios = this.usuarios.filter(function(usuario) {
				//console.log(usuario);
				//return item.toLowerCase().includes(val.toLowerCase());
			//});
		}else{
			//this.usuarios = this.usuariosFilter;
		}
	}

}
