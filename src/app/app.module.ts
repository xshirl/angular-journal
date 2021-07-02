import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { SignInPageComponent } from './sign-in-page/sign-in-page.component';
import { PasswordResetPageComponent } from './password-reset-page/password-reset-page.component';
import { DiaryPageComponent } from './diary-page/diary-page.component';
import { FormsModule } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { DiaryFormComponent } from './diary-form/diary-form.component';
import { ModalModule } from 'ngx-bootstrap/modal';
@NgModule({
  declarations: [
    AppComponent,
    SignUpPageComponent,
    SignInPageComponent,
    PasswordResetPageComponent,
    DiaryPageComponent,
    DiaryFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    ModalModule.forRoot(),
  ],
  providers: [AngularFireAuth, AngularFirestore, AngularFireAuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
