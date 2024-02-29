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
import { AuthGuard } from './demo/guard/auth.guard';
import { AccessComponent } from './demo/components/AuthPage/access/access.component';
import { CommissionComponent } from './demo/components/pages/crud/commission/commission/commission.component';
import { DepenseComponent } from './demo/components/pages/depense/depense/depense.component';
import { OffreSpecialeComponent } from './demo/components/pages/crud/offre/offre-speciale/offre-speciale.component';

@NgModule({ 
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: LoginComponent
            },
            {
                path: 'register', component: RegisterComponent,
            },
            {
                path:'pages', component: AppLayoutComponent,
                children: [
                    { path: 'dashboard',component: DashboardComponent, data: { requiredRole: 'manager' }, canActivate: [AuthGuard]},
                    { path: 'depense',component: DepenseComponent, data: { requiredRole: 'manager' }, canActivate: [AuthGuard]},
                    { path: 'services', component:ServiceComponent, data: { requiredRole: 'manager' }, canActivate: [AuthGuard]},
                    { path: 'offres', component:OffreSpecialeComponent, data: { requiredRole: 'manager' }, canActivate: [AuthGuard]},
                    { path: 'employes', component: EmployeComponent, data: { requiredRole: 'manager' }, canActivate: [AuthGuard] },
                    { path: 'rdv/:servId', loadChildren: () => import('./demo/components/pages//prise_rdv/rdvClient.module').then(m => m.RdvClientModule), data: { requiredRole: 'client' } , canActivate: [AuthGuard]},
                    { path: 'profil',component: ProfilComponent, data: { requiredRole: 'employe' }, canActivate: [AuthGuard]},
                    { path: 'rendezVous/client',component: ListeRdvClientComponent, data: { requiredRole: 'client' }, canActivate: [AuthGuard]},
                    { path: 'vitrine',  component: VitrineComponent, data: { requiredRole: 'client' }, canActivate: [AuthGuard]},
                    { path: 'horaire',  component: GestionHoraireComponent, data: { requiredRole: 'employe' } , canActivate: [AuthGuard]},
                    { path: 'commission',  component: CommissionComponent, data: { requiredRole: 'employe' } , canActivate: [AuthGuard]},
                    { path: 'employe/rdv',  component: RdvEmpComponent, data: { requiredRole: 'employe' }, canActivate: [AuthGuard] },
                ]
            },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
            { path: 'denied' ,component: AccessComponent}
        ],
        { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})

export class AppRoutingModule {
}
