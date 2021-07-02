import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss'],
})
export class SignInPageComponent implements OnInit {
  user: User = <User>{};
  msg: string;
  constructor(public afAuth: AngularFireAuth, public router: Router) {}
  ngOnInit() {}
  async signIn(signInForm: NgForm) {
    this.msg = null;
    if (signInForm.invalid) {
      return;
    }
    try {
      await this.afAuth.signInWithEmailAndPassword(
        this.user.email,
        this.user.password
      );
      this.router.navigate(['diary']);
    } catch (error) {
      alert(error.message);
    }
  }
}
