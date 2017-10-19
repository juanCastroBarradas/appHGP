import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { OrdenesPage } from '../ordenes/ordenes';
import { OrdenTramitePage } from '../orden-tramite/orden-tramite';
import { OrdenProcesoPage } from '../orden-proceso/orden-proceso';
import { OrdenPendientePage } from '../orden-pendiente/orden-pendiente';
import { UserPage } from '../user/user';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
	ordenTramite : any;
	ordenProceso : any;
	ordenPendiente: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public modalCtrl: ModalController) {
  	this.ordenTramite = OrdenTramitePage;
  	this.ordenProceso = OrdenProcesoPage;
  	this.ordenPendiente = OrdenPendientePage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  modalUserShow() {
    let contactModal = this.modalCtrl.create(UserPage);
       contactModal.present();
  }

  modalShowBusqueda() {
    let contactModal = this.modalCtrl.create(OrdenesPage,{
    });
    contactModal.present();
  }

}
