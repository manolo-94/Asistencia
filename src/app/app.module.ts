import { NgModule } from '@angular/core';
import { IonicStorageModule } from '@ionic/storage';

import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TablinksPageModule } from './pages/tablinks/tablinks.module';

import { SQLite } from '@ionic-native/sqlite/ngx'

import { Network } from '@ionic-native/network/ngx';
import { ComponentsModule } from './components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { InterceptorService } from './interceptors/interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    HttpClientModule,
    
    TablinksPageModule,
    ComponentsModule,
    
  ],
  providers: [
    CallNumber,
    AndroidPermissions,
    SQLite, 
    Network,
    { provide: RouteReuseStrategy, 
      useClass: IonicRouteStrategy 
    },
    {
      provide:HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
