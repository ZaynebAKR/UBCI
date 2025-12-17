import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { UserProfileComponent } from './demo/components/auth/user-profile/user-profile.component';



@NgModule({
   
    
    imports: [
        RouterModule.forRoot([
              { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
            {
    path: 'auth',
    loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule)
  },

            {
                path: '', component: AppLayoutComponent,
                children: [
                    { path: 'dashboard', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UikitModule) },
                    { path: 'user-profile', component: UserProfileComponent },
                ],
            },

            { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
            { path: 'pages/notfound', component: NotfoundComponent },
            { path: '**', redirectTo: 'pages/notfound' },

        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
