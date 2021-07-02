import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { userStore } from './user-store';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  store = userStore;
  constructor(public afAuth: AngularFireAuth, private router: Router) {
    this.afAuth.user.subscribe((user) => {
      this.store.setUser(user);
    });
  }
  async logOut() {
    await this.afAuth.signOut();
    this.router.navigate(['']);
  }
}
