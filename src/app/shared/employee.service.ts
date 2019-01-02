import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  // tslint:disable-next-line:typedef-whitespace
  formData: Employee;

  constructor(private firestore: AngularFirestore) { }

  getEmployees() {
   return this.firestore.collection('employees').snapshotChanges(); // what is the dif between valuechanges function?
   // this needs to be return someting, cant be void
  }
}
