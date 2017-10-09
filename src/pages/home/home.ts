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
  filtro : any;
	ordenTramite : any;
	ordenProceso : any;
	ordenPendiente: any;
  doSearch : boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
  	this.ordenTramite = OrdenTramitePage;
  	this.ordenProceso = OrdenProcesoPage;
  	this.ordenPendiente = OrdenPendientePage;
    this.doSearch = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  modalUserShow() {
    let contactModal = this.modalCtrl.create(UserPage);
       contactModal.present();
  }

  modalShowBusqueda() {
    if(this.filtro != "" && this.filtro != null){
      let contactModal = this.modalCtrl.create(OrdenesPage,{
        filtro : this.filtro
      });
      contactModal.present();
      this.filtro = "";
      this.showSearch();
    }
  }

  showSearch(){
    this.doSearch = (this.doSearch == true)? false : true;
  }

}
