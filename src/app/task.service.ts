import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  Firestore,
  addDoc,
  collection,
  getFirestore,
  collectionData,
  query,
  updateDoc,
  doc,
} from '@angular/fire/firestore';
import { Task } from '../interfaces/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private auth: Auth, private firestore: Firestore) {}
  async addTask(path: string, data: any) {
    return addDoc(collection(getFirestore(), path), data);
  }

  getTasks(path: string, collectionQuery?: any) {
    // Ponemos '?' en query? por que a veces no necesitamos query
    const ref = collection(getFirestore(), path);
    return collectionData(query(ref, collectionQuery), { idField: 'id' });
  }
  async updateTask(path: string, newData: any) {
    const ref = doc(getFirestore(), path);
    return await updateDoc(ref, newData);
  }
}
