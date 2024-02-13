import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { LoginComponent } from './demo/components/AuthPage/login/login.component';
import { RegisterComponent } from './demo/components/AuthPage/register/register.component';
import { GestionHoraireComponent } from './demo/components/pages/calendrier/gestion_horaire/gestionHoraire.component';
import { EmployeComponent } from './demo/components/pages/crud/employe/employe.component';
import { ServiceComponent } from './demo/components/pages/crud/service/service.component';
import { DashboardComponent } from './demo/components/pages/dashboard/dashboard.component';
import { ProfilComponent } from './demo/components/pages/profil/profil.component';
import { VitrineComponent } from './demo/components/pages/vitrine/vitrine.component';
import { RdvEmpComponent } from './demo/components/pages/calendrier/liste_rdv/rdv-emp.component';
import { ListeRdvClientComponent } from './demo/components/pages/calendrier/liste-rdv-client/liste-rdv-client.component';

@NgModule({ 
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: LoginComponent,
            },
            {
                path: 'register', component: RegisterComponent,
            },
            {
                path:'pages', component: AppLayoutComponent,
                children: [
                    { path: 'dashboard',component: DashboardComponent},
                    { path: 'services', component:ServiceComponent },
                    { path: 'employes', component: EmployeComponent },
                    { path: 'rdv',  loadChildren: () => import('./demo/components/pages//prise_rdv/rdvClient.module').then(m => m.RdvClientModule) },
                    { path: 'profil',component: ProfilComponent},
                    { path: 'rdv/client',component: ListeRdvClientComponent},
                    { path: 'vitrine',  component: VitrineComponent},
                    { path: 'horaire',  component: GestionHoraireComponent },
                    { path: 'rdv/emp',  component: RdvEmpComponent },
                ]
            },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ],
        { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
