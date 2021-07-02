import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss'],
})
export class SignUpPageComponent implements OnInit {
  user: User = <User>{};
  msg: string;
  constructor(public afAuth: AngularFireAuth) {}
  ngOnInit() {}
  async signUp(signUpForm: NgForm) {
    if (signUpForm.invalid) {
      return;
    }
    try {
      await this.afAuth.createUserWithEmailAndPassword(
        this.user.email,
        this.user.password
      );
      alert('Sign up successful.');
    } catch (error) {
      alert(error.message);
    }
  }
}
