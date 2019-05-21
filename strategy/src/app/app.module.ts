import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { QuestionDataService } from './services/question-data.service';
import { ConfigSubjectService } from './services/config-subject.service';
import { HttpClientModule } from '@angular/common/http';
import { AccessStrategyToken } from './access/token';
import { AccessWithKeyService } from './access/access-with-key.service';
import { AccessWithLoginService } from './access/access-with-login.service';
import { LoginTeacherService } from './login/login-teacher.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    QuestionDataService,
    ConfigSubjectService,
    { provide: AccessStrategyToken, useClass: AccessWithKeyService, multi: true },
    { provide: AccessStrategyToken, useClass: AccessWithLoginService, multi: true },
    { provide: AccessStrategyToken, useClass: LoginTeacherService, multi: true },
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
