import { FormsComponent } from './pages/forms/forms.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { HomeComponent } from './pages/home/home.component';
import { Routes } from '@angular/router';
export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'contacts', component: ContactsComponent },
    { path: 'forms', component: FormsComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
];
