import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, ModalController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { DetalleOrdenPage } from '../detalle-orden/detalle-orden';

@Component({
  selector: 'page-orden-tramite',
  templateUrl: 'orden-tramite.html',
})
export class OrdenTramitePage {
	ordenes : any[];

	constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, 
				public toastCtrl: ToastController, public api : ApiProvider, public modalCtrl: ModalController) {
		this.cargaDatos();
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad OrdenTramitePage');
	}

  	cargaDatos(){
		let cestatus = 'TRAMITE';
		let loading = this.loadingCtrl.create({
	    	spinner: 'bubbles',
      		content: 'Cargando eventos de la orden.'
		});		
		loading.present();
		/*empleamos el uso del provider Api para realizar la peticiones http
		este metodo nos retornara una conexion http con respuesta de la ruta especificada*/
		//let seq = this.api.get('ordenes/consultar/all');
		let seq = this.api.get('ordenes/consultar/all/'+cestatus);
		seq.map(res => res.json())
		    	.subscribe(data => {
		    		console.log(data);
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

	doRefresh(refresher){
		this.cargaDatos();	      
		refresher.complete();
	}

	itemTapped(event, item) {
		// That's right, we're pushing to ourselves!
		let contactModal = this.modalCtrl.create(DetalleOrdenPage, {
			item: item
		});
		contactModal.present();
	}

}
