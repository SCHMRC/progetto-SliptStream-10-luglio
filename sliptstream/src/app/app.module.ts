import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeModule } from './home/home.module';
import { UserModule } from './user/user.module';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { InterceptorInterceptor } from './service/interceptor.interceptor';
import { environment } from './../environments/environment';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';





@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    UserModule,
    MaterialFileInputModule,
    AuthModule,
    HttpClientModule,
    HomeModule,
    MaterialModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserAnimationsModule
  ],
  providers: [
    AngularFireAuth,
    AngularFireDatabase,
    {
      provide: HTTP_INTERCEPTORS, /*cosa striamo fornendo?*/
      useClass: InterceptorInterceptor, /*quale classe della web app lo fornisce?*/
      multi: true /*è un array di interceptor?*/
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
