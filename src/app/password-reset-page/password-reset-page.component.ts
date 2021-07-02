import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-password-reset-page',
  templateUrl: './password-reset-page.component.html',
  styleUrls: ['./password-reset-page.component.scss'],
})
export class PasswordResetPageComponent implements OnInit {
  user: User = <User>{};
  constructor(public afAuth: AngularFireAuth) {}
  ngOnInit() {}
  async sendPasswordResetEmail(pwResetForm: NgForm) {
    if (pwResetForm.invalid) {
      return;
    }
    try {
      await this.afAuth.sendPasswordResetEmail(this.user.email);
      alert('Password reset email sent');
    } catch (error) {
      alert(error.message);
    }
  }
}
