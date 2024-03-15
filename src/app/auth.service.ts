import { Injectable } from '@angular/core';
import {
  Auth,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { Firestore, collection, doc, setDoc } from '@angular/fire/firestore';
import { Users } from '../interfaces/user';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth, private firestore: Firestore) {}

  async register({ email, password, name, surname }: any) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      const user = userCredential.user;
      await setDoc(doc(collection(this.firestore, 'users'), user.uid), {
        email: email,
        name: name,
        surname: surname,
      });
    } catch (error) {
      console.log(error);
    }
  }
  login(user: Users) {
    return signInWithEmailAndPassword(this.auth, user.email!, user.password!);
  }
  logout() {
    return signOut(this.auth);
  }

  setToken(token: string, value: any) {
    return localStorage.setItem('token', value);
  }
  getToken(token: string) {
    return localStorage.getItem('token');
  }
  setUid(uid: string, value: any) {
    return localStorage.setItem('uid', value);
  }
  getUid(uid: string) {
    return localStorage.getItem('uid');
  }
}
