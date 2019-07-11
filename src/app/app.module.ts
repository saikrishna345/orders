import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { Routes , RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { OrdersComponent } from './orders/orders.component';
import { SiteLayoutComponent } from '../app/layout/site-layout/site-layout.component';
import { AppLayoutComponent } from '../app/layout/app-layout/app-layout.component';
import {HeaderComponent} from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';
import { RegisterComponent } from './register/register.component';
import { RegisterService } from './register/register.service';
import {LoginService} from './login/login.service';
import {OrdersService} from './orders/orders.service';
import { NewOrdersComponent } from './new-orders/new-orders.component';
import { EditOrderComponent } from './edit-order/edit-order.component';
import {NotificationService} from './notification.service';
const routes: Routes = [
{
  path: '',
  component: AppLayoutComponent,
  children: [
{
  path: '',
  component: RegisterComponent,
},
{
  path: 'orders',
  component: OrdersComponent
},
{
  path: 'login',
  component: LoginComponent
}  ]
}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OrdersComponent,
    SiteLayoutComponent,
    AppLayoutComponent,
    HeaderComponent,
    RegisterComponent,
    NewOrdersComponent,
    EditOrderComponent,
  ],
  imports: [
   BrowserModule,
   MatAutocompleteModule,
   MatBadgeModule,
   MatBottomSheetModule,
   MatButtonModule,
   MatButtonToggleModule,
   MatCardModule,
   MatCheckboxModule,
   MatChipsModule,
   MatDatepickerModule,
   MatDialogModule,
   MatDividerModule,
   MatExpansionModule,
   MatGridListModule,
   MatIconModule,
   MatInputModule,
   FormsModule,
   HttpClientModule,
   ReactiveFormsModule,
   MatListModule,
   MatMenuModule,
   MatNativeDateModule,
   MatPaginatorModule,
   MatProgressBarModule,
   MatProgressSpinnerModule,
   MatRadioModule,
   MatRippleModule,
   MatSelectModule,
   MatSidenavModule,
   MatSliderModule,
   MatSlideToggleModule,
   MatSnackBarModule,
   MatSortModule,
   MatStepperModule,
   MatTableModule,
   MatTabsModule,
   MatToolbarModule,
   MatTooltipModule,
   MatTreeModule,
   RouterModule.forRoot(routes),
   BrowserAnimationsModule,
  ],
  providers: [RegisterService,
    LoginService,
    OrdersService,
    NotificationService
    ],
  bootstrap: [AppComponent],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [NewOrdersComponent, EditOrderComponent]
})
export class AppModule { }
