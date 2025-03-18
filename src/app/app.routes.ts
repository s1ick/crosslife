import { HomeComponent } from './pages/home/home.component';
import { AboutRegionsComponent } from './pages/about-regions/about-regions.component';
import { Routes } from '@angular/router';
export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'regions', component: AboutRegionsComponent },
    
    { path: '', redirectTo: '/home', pathMatch: 'full' }
];
