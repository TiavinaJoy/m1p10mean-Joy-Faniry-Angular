import { NgModule } from '@angular/core';
import { PathLocationStrategy, LocationStrategy, CommonModule, DatePipe } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { HttpClientModule } from '@angular/common/http';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './demo/components/AuthPage/login/login.component';
import { RegisterComponent } from './demo/components/AuthPage/register/register.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { GestionHoraireComponent } from './demo/components/pages/calendrier/gestion_horaire/gestionHoraire.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RatingModule } from 'primeng/rating';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { FileUploadModule } from 'primeng/fileupload';
import { ResizableColumn, TableModule } from 'primeng/table';
import { EmployeComponent } from './demo/components/pages/crud/employe/employe.component';
import { ServiceComponent } from './demo/components/pages/crud/service/service.component';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { DashboardComponent } from './demo/components/pages/dashboard/dashboard.component';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { ProfilComponent } from './demo/components/pages/profil/profil.component';
import { ImageModule } from 'primeng/image';
import { GalleriaModule } from 'primeng/galleria';
import { CarouselModule } from 'primeng/carousel';
import { VitrineComponent } from './demo/components/pages/vitrine/vitrine.component';
import { RdvEmpComponent } from './demo/components/pages/calendrier/liste_rdv/rdv-emp.component';
import {  ListboxModule } from 'primeng/listbox';
import { ListeRdvClientComponent } from './demo/components/pages/calendrier/liste-rdv-client/liste-rdv-client.component';
import { LocalStorageService, NgxWebstorageModule } from 'ngx-webstorage';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { PaginatorModule } from 'primeng/paginator';
import { BadgeModule } from 'primeng/badge';
import { MultiSelectModule } from 'primeng/multiselect';
import { DragDropModule } from 'primeng/dragdrop';
import { AccessRoutingModule } from './demo/components/AuthPage/access/access-routing.module';
import { AccessComponent } from './demo/components/AuthPage/access/access.component';
import { CommissionComponent } from './demo/components/pages/crud/commission/commission/commission.component';
import { MessageService } from 'primeng/api';
import { DepenseComponent } from './demo/components/pages/depense/depense/depense.component';
@NgModule({
    declarations: [
        AppComponent, 
        NotfoundComponent,
        LoginComponent,
        RegisterComponent,
        GestionHoraireComponent,
        EmployeComponent,
        ServiceComponent,
        DashboardComponent,
        ProfilComponent,
        VitrineComponent,
        RdvEmpComponent,
        ListeRdvClientComponent,
        AccessComponent,
        CommissionComponent,
        DepenseComponent
    ],
    imports: [
        CommonModule,
        AppRoutingModule, 
        AppLayoutModule,
        HttpClientModule,
        /*Login and registration */
        CardModule,
        InputTextModule,
        ReactiveFormsModule,
        ButtonModule,
        /*Calendrier */
        FullCalendarModule,
		DialogModule,
		CalendarModule,
        FormsModule,
        /*Crud employe et service*/
        TableModule,
        FileUploadModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        RatingModule,
        InputTextareaModule,
        DropdownModule,
        RadioButtonModule,
        InputNumberModule,
        PaginatorModule,
        BadgeModule,
        MultiSelectModule,
        DragDropModule,
        /*Dashboard */
        ChartModule,
        MenuModule,
        /*Profil */
        CheckboxModule,
        PasswordModule,
        /*Vitrine */
		ImageModule,
		GalleriaModule,
		CarouselModule,
        ListboxModule,
        InputNumberModule,
        NgxWebstorageModule.forRoot({}),
        /*Login */
        ProgressSpinnerModule,
        AccessRoutingModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        CountryService,
        CustomerService,
        EventService,
        IconService,
        NodeService,
        PhotoService,
        ProductService,
        LocalStorageService,
        DatePipe,
        MessageService
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
