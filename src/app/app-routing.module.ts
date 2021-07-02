import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInPageComponent } from './sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { PasswordResetPageComponent } from './password-reset-page/password-reset-page.component';
import { DiaryPageComponent } from './diary-page/diary-page.component';
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
const routes: Routes = [
  { path: '', component: SignInPageComponent },
  { path: 'signup', component: SignUpPageComponent },
  { path: 'passwordreset', component: PasswordResetPageComponent },
  {
    path: 'diary',
    component: DiaryPageComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  { path: '**', component: SignInPageComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
