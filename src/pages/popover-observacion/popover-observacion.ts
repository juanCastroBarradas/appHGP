import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, ViewController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { Storage } from '@ionic/storage';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@Component({
  selector: 'page-popover-observacion',
  templateUrl: 'popover-observacion.html',
})
export class PopoverObservacionPage {
	nidOrden : any;
	nidtecnico: number;
	ctecnico: string;
	estatusOrden : any;
	observacion: string;
	active : boolean;

	constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, 
				public toastCtrl: ToastController, public viewCtrl: ViewController, public api : ApiProvider, public storage: Storage, 
				public barcodeScanner: BarcodeScanner) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad MyPopOverPage');
	}

	ngOnInit() {
		if (this.navParams.data) {
			this.nidOrden = this.navParams.data.idOrden;
			this.estatusOrden = this.navParams.data.estatusOrden;
		}
		this.storage.get('dataUser').then((val) => {
			this.ctecnico = val.name;
			this.nidtecnico = val.iduser;
		});    
	}

	registraObservacion(cstatus : String){  

		if(this.observacion=='' || this.observacion==null){
			this.active = true;
		}else{
			this.active = false;

			this.barcodeScanner.scan().then((barcodeData)=>{
				let text = "success!! \ntexto: "+barcodeData.text+"\n"+
										"formato: "+barcodeData.format;
				alert(text);

				let loading = this.loadingCtrl.create({
					spinner: 'bubbles',
					content: 'Gurdando Observacion.'
				});
				loading.present();

				let seq = this.api.post('ordenes/detalle/'+this.nidOrden+'/capturar', {observacion : this.observacion, nidtecnico : this.nidtecnico, ctecnico : this.ctecnico, ccstatus : cstatus});
				seq.map(res => res.json())
					.subscribe(data =>{
						loading.dismiss();

						let toast = this.toastCtrl.create({
							message: data.arrReults,
							duration: 3000,
							 position: 'bottom'
						});
						toast.present();
						this.close(true);
						this.estatusOrden = cstatus;
					},
					error =>{
						loading.dismiss();
						console.log(error);
						let toast = this.toastCtrl.create({
							message: 'Servidor inaccesible',
							duration: 3000
						});
						toast.present();
					});
				this.observacion='';

			},(err)=>{
				alert("¡Lector QR no accesible!");
			});
		}

	}

	close(modifica : boolean) {
		let data = { estatus : this.estatusOrden, modifica: modifica }
		this.viewCtrl.dismiss(data);
	}

}
