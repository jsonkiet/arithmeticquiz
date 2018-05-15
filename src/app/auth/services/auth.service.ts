import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { AngularFireDatabase } from 'angularfire2/database';
import  'rxjs/add/operator/take';
import { take } from 'rxjs/operators';

@Injectable()
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private router: Router, private db : AngularFireDatabase) { }

    /*
  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider)
      .then(value => {
        console.log('Sucess', value),
          console.log('The given name is ' + value.additionalUserInfo.profile.given_name),
          this.router.navigateByUrl('/profile');
      })
      .catch(error => {
        console.log('Something went wrong: ', error);
      });
  }
  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider);
  }
  */
  private updateUser(authData) {
    const userData = new User(authData);
    const ref = this.db.object('users/' + authData.uid);
//    ref.take(1)
//      ref.subscribe(user => {
    ref.valueChanges().subscribe( (user : any) => {
        if (!user.roles) {
          ref.update(userData)
        }
    })

  }
}
