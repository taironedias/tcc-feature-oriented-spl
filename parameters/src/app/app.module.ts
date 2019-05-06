import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpModule } from '@angular/http';
import { ConfigService, ACCESS_BASE, ConfigFactory, LEVEL_BASE } from './services/config';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ConfigService,
    { provide: 'CONFIG.JSON', useValue: './assets/config.json' },
    { provide: 'BASE-ACCESS-VARIABLE', useValue: 'ACCESS' },
    { provide: ACCESS_BASE, useFactory: ConfigFactory, deps: [ConfigService, 'CONFIG.JSON', 'BASE-ACCESS-VARIABLE'] },
    { provide: 'BASE-LEVEL-VARIABLE', useValue: 'LEVEL' },
    { provide: LEVEL_BASE, useFactory: ConfigFactory, deps: [ConfigService, 'CONFIG.JSON', 'BASE-LEVEL-VARIABLE'] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
