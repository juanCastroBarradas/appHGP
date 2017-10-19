import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, ViewController } from 'ionic-angular';
import { DetalleOrdenPage } from '../detalle-orden/detalle-orden';
import { ApiProvider } from '../../providers/api/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'page-ordenes',
  templateUrl: 'ordenes.html',
})
export class OrdenesPage {
	myForm: FormGroup;
	filtro : any;
	pendientes : any[];
	ordenesFiltro : any[];
	tramite : any[];
	proceso : any[];
	cerrado : any[];
	dislpayTramite: boolean;
	dislpayCerrado: boolean;
	dislpayPendiente: boolean;
	dislpayProceso: boolean;
	

	constructor(public navCtrl: NavController, 
				public navParams: NavParams, 
				public viewCtrl: ViewController,
				public loadingCtrl: LoadingController, 
				public toastCtrl: ToastController, 
				public api : ApiProvider,
                public formBuilder: FormBuilder) {
		this.dislpayCerrado = this.dislpayPendiente = this.dislpayProceso = this.dislpayProceso = false;
    	this.myForm = this.createMyForm();
	}

	private createMyForm(){
	    return this.formBuilder.group({
	      filtro: ['', Validators.required],
	    });
	}


	doRefresh(refresher){
		this.cargaDatos();	      
		refresher.complete();
	}

	doSearch(){
		this.filtro = this.myForm.value.filtro;
		if(this.filtro != ""){
			this.cargaDatos();
		}
	}

	cargaDatos(){
		let loading = this.loadingCtrl.create({
	    	spinner: 'bubbles',
      		content: 'Buscando ordenes de servicio.'
		});		
		loading.present();
		/*empleamos el uso del provider Api para realizar la peticiones http
		este metodo nos retornara una conexion http con respuesta de la ruta especificada*/
		//let seq = this.api.get('ordenes/consultar/all');
		let seq = this.api.get('ordenes/consultar/all/filtro/'+this.filtro);
		seq.map(res => res.json())
		    	.subscribe(data => {
		    		this.ordenesFiltro = data.arrReults;
		      		this.pendientes = data.arrReults.pendiente;
		      		this.dislpayPendiente = (data.arrReults.pendiente.length > 0)? true : false;

		      		this.tramite = data.arrReults.tramite;
		      		this.dislpayTramite = (data.arrReults.tramite.length > 0)? true : false;

		      		this.proceso = data.arrReults.proceso;
		      		this.dislpayProceso = (data.arrReults.proceso.length > 0)? true : false;

		      		this.cerrado = data.arrReults.cerrado;
		      		this.dislpayCerrado = (data.arrReults.cerrado.length > 0)? true : false;

		      		loading.dismiss();
		    	},err => {
		        	console.error('ERROR ordenes:', err);
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

	dismiss() {
    	this.viewCtrl.dismiss();
	}

}
