import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController, LoadingController, ViewController } from 'ionic-angular';
import { PopoverObservacionPage } from '../popover-observacion/popover-observacion';
import { PopoverEventosPage } from '../popover-eventos/popover-eventos';
import { HomePage } from '../home/home';
import { ApiProvider } from '../../providers/api/api';

@Component({
  selector: 'page-detalle-orden',
  templateUrl: 'detalle-orden.html',
})
export class DetalleOrdenPage {
	selectedItem: any;
	loading : any;

	constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
				public popoverCtrl: PopoverController, public loadingCtrl: LoadingController, public api : ApiProvider) {
		this.selectedItem = navParams.get('item');
	}

	ngOnInit(){
		this.loading = this.loadingCtrl.create({
		    spinner: 'bubbles',
		      content: 'Cargando detalle de la orden.'
		});
		this.cargaOrden();
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad DetalleOrdenPage');
		this.loading.dismiss();
	}


	presentPopover(myEvent) {
		let popover = this.popoverCtrl.create(PopoverObservacionPage, {
			idOrden: this.selectedItem.nidorden,
			estatusOrden: this.selectedItem.cestatus
		},{ enableBackdropDismiss : false });
		popover.present({
		});
		popover.onDidDismiss((popoverData) => {
			this.selectedItem.cestatus = popoverData;
			//this.dismiss();
			//this.navCtrl.setRoot(HomePage);
		});
	}

	popoverEventosShow(myEvent) {
		let popover = this.popoverCtrl.create(PopoverEventosPage, {
		  idOrden: this.selectedItem.nidorden
		},{ });
		popover.present({
		});
	}

	cargaOrden(){
		let nidOrden = this.selectedItem.nidorden;
		let seq = this.api.get('ordenes/consultar/'+nidOrden);

		seq.map(res => res.json())
		    .subscribe(data =>{
				this.selectedItem = data.arrReults[0];
			},
			error =>{
				console.log(error);
			});
	}

	dismiss() {
    	this.viewCtrl.dismiss();
	}

}
