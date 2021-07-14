import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfiloComponent, Dialog, DialogCred } from './profilo/profilo.component';
import { GestioneOrdineComponent } from './gestione-ordine/gestione-ordine.component';
import { GestioneBozzeComponent } from './gestione-bozze/gestione-bozze.component';
import { CreaOrdineComponent } from './crea-ordine/crea-ordine.component';
import { FormSemiespansoComponent } from './crea-ordine/form-semiespanso/form-semiespanso.component';
import { FormDibondComponent } from './crea-ordine/form-dibond/form-dibond.component';
import { FormCartaComponent } from './crea-ordine/form-carta/form-carta.component';
import { FormAdesivoComponent } from './crea-ordine/form-adesivo/form-adesivo.component';
import { FormBannerComponent } from './crea-ordine/form-banner/form-banner.component';
import { FormColorprintComponent } from './crea-ordine/form-colorprint/form-colorprint.component';
import { FormPrespaziatoComponent } from './crea-ordine/form-prespaziato/form-prespaziato.component';
import { FormPlexComponent } from './crea-ordine/form-plex/form-plex.component';
import { FormBigliettodavisitaComponent } from './crea-ordine/form-bigliettodavisita/form-bigliettodavisita.component';
import { FormVolantinoComponent } from './crea-ordine/form-volantino/form-volantino.component';
import { FormManifestoComponent } from './crea-ordine/form-manifesto/form-manifesto.component';
import { FormLocandinaComponent } from './crea-ordine/form-locandina/form-locandina.component';
import { CameraInputComponent } from './crea-ordine/camera-input/camera-input.component';
import { RiepilogoOrdineComponent } from './crea-ordine/riepilogo-ordine/riepilogo-ordine.component';
import { ElencoOrdiniComponent } from './gestione-ordine/elenco-ordini/elenco-ordini.component';
import { ItemOrdineComponent, DialogInsertBozza, DialogModificaArticolo } from './gestione-ordine/item-ordine/item-ordine.component';
import { GuardGuard } from '../service/guard.guard';
import { ElencoOrdiniBozzaComponent } from './gestione-bozze/elenco-ordini/elenco-ordini.component';
import { ItemOrdineBozzaComponent, DialogConfirmComponent } from './gestione-bozze/item-ordine/item-ordine.component';
import { DialogComponent } from './gestione-bozze/item-ordine/item-ordine.component';
import { OrdiniCompletiComponent } from './ordini-completi/ordini-completi.component';
import { ElencoOrdiniCompletiComponent } from './ordini-completi/elenco-ordini-completi/elenco-ordini-completi.component';
import { ItemOrdiniCompletiComponent } from './ordini-completi/item-ordini-completi/item-ordini-completi.component';
import { DashComponent } from './dash/dash.component';
import { NotificheComponent, NotificheDrawComponent } from './dash/notifiche/notifiche.component';
import { StatisticheComponent } from './dash/statistiche/statistiche.component';
import { ClientiComponent } from './dash/clienti/clienti.component';
import { OrdiniComponent } from './dash/ordini/ordini.component';


const routes: Routes = [
  { path: 'dashboard/:id', component: DashComponent, canActivate: [GuardGuard] },
  { path: 'profilo/:id', component: ProfiloComponent, canActivate: [GuardGuard] },
  { path: 'crea ordine/:id', component: CreaOrdineComponent, canActivate: [GuardGuard]},
  {
    path: 'gestione ordini/:id', component: GestioneOrdineComponent, canActivate: [GuardGuard], children: [
    {path: '', redirectTo: 'list', pathMatch: 'full'},
    { path: 'list', component: ElencoOrdiniComponent},
    { path: 'item/:id/:index', component: ItemOrdineComponent}
  ] },
  { path: 'gestione bozze/:id', component: GestioneBozzeComponent, canActivate: [GuardGuard], children: [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: ElencoOrdiniBozzaComponent},
    { path: 'element/:id/:index', component: ItemOrdineBozzaComponent}
  ] },
  {
    path: 'ordini confermati/:id', component: OrdiniCompletiComponent, canActivate: [GuardGuard], children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ElencoOrdiniCompletiComponent },
      { path: 'item/:id/:index', component: ItemOrdiniCompletiComponent }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

export const COMPONENTS = [
  CameraInputComponent,
  DashComponent,
  ProfiloComponent,
  GestioneOrdineComponent,
  GestioneBozzeComponent,
  CreaOrdineComponent,
  Dialog, DialogCred,
  FormSemiespansoComponent, FormDibondComponent,
  FormCartaComponent, FormAdesivoComponent,
  FormBannerComponent, FormColorprintComponent,
  FormPrespaziatoComponent, FormPlexComponent,
  FormBigliettodavisitaComponent, FormVolantinoComponent,
  FormManifestoComponent, FormLocandinaComponent,
  RiepilogoOrdineComponent,
  ElencoOrdiniComponent, ItemOrdineComponent,
  ElencoOrdiniBozzaComponent, ItemOrdineBozzaComponent, DialogComponent,
  OrdiniCompletiComponent, ElencoOrdiniCompletiComponent, ItemOrdiniCompletiComponent,
  DialogInsertBozza, DialogConfirmComponent, DialogModificaArticolo,
  NotificheComponent, StatisticheComponent, ClientiComponent, OrdiniComponent,NotificheDrawComponent
];
