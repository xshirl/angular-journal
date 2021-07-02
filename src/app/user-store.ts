import { observable, action } from 'mobx-angular';
class UserStore {
  @observable user;
  @action setUser(user) {
    this.user = user;
  }
}
export const userStore = new UserStore();
