import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

@Component({
  selector: 'page-popover-eventos',
  templateUrl: 'popover-eventos.html',
})
export class PopoverEventosPage {
	nidOrden : any;
	eventos : any[];
	loading : any;

	constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, 
				public loadingCtrl: LoadingController, public toastCtrl: ToastController, public api : ApiProvider) {
	}

	ngOnInit() {
		if (this.navParams.data) {
			this.nidOrden = this.navParams.data.idOrden;
		}
		this.loading = this.loadingCtrl.create({
	    	spinner: 'bubbles',
      		content: 'Cargando orden.'
		});
		this.cargaEventos(); 
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad PopOverEventosPage');
		this.loading.dismiss();
	}

	close() {
		this.viewCtrl.dismiss();
	}

	cargaEventos(){
		this.loading.present();
		let seq = this.api.get('ordenes/detalle/'+this.nidOrden+'/consultar');
		seq.map(res => res.json())
			    .subscribe(data =>{
			    	this.eventos = data.arrReults;
				},
				error =>{
					console.log(error);
					let toast = this.toastCtrl.create({
						message: 'Error Access: Servidor inaccesible. no hay acceso a internet',
						duration: 3000
					});
					toast.present();
				});
	}

}
