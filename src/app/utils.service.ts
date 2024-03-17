import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  getDoc,
  getFirestore,
} from '@angular/fire/firestore';
import { Users } from '../interfaces/user';
import { User } from '@angular/fire/auth';
@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor(firestore: Firestore) {}

  async getDoc(path: string) {
    return (await getDoc(doc(getFirestore(), path))).data();
  }
  setName(name: string) {
    return localStorage.setItem('name', name);
  }
  async getUserName(uid: string): Promise<string> {
    const userRef = doc(getFirestore(), 'users', uid); // 'users' es la colección donde se almacenan los usuarios
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const userData: { name: string } = userDoc.data() as { name: string };
      return userData.name; // Suponiendo que el campo se llama 'name'
    } else {
      throw new Error('User document not found');
    }
  }
  async getUser(uid: string): Promise<Users> {
    const userRef = doc(getFirestore(), 'users', uid);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const userData = userDoc.data() as Users;
      return userData;
    } else {
      throw new Error('Usuario no encontrado');
    }
  }
}
