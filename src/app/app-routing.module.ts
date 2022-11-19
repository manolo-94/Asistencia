import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    /* redirectTo: 'login', */
    redirectTo: 'personas',
    pathMatch: 'full'
  },
  /* {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'formrender',
    loadChildren: () => import('./pages/formrender/formrender.module').then( m => m.FormrenderPageModule)
  },
  {
    path: 'formbuilder',
    loadChildren: () => import('./pages/formbuilder/formbuilder.module').then( m => m.FormbuilderPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'encuestas',
    loadChildren: () => import('./pages/encuestas/encuestas.module').then( m => m.EncuestasPageModule)
  }, */
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    /* path: 'tablinks', */
    path: 'tablinks',
    loadChildren: () => import('./pages/tablinks/tablinks.module').then( m => m.TablinksPageModule)
  },
  
  // {
  //   path: 'incidencias',
  //   loadChildren: () => import('./pages/incidencias/incidencias.module').then( m => m.IncidenciasPageModule)
  // },
  // {
  //   path: 'resultados',
  //   loadChildren: () => import('./pages/resultados/resultados.module').then( m => m.ResultadosPageModule)
  // },
  // {
  //   path: 'promovidos',
  //   loadChildren: () => import('./pages/promovidos/promovidos.module').then( m => m.PromovidosPageModule)
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
