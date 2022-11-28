import { AngularFirestore } from '@angular/fire/compat/firestore'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Student } from "../models/student";
import firebase from 'firebase/compat/app';

//import {map} from 'rjxs/operators/@angular';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private students: Student[];

  constructor(
    private firestore: AngularFirestore,
  ) {
    this.students = [
      {
        controlnumber: "02400391",
        age: 38,
        career: "ISC",
        curp: "AOVI840917HNTRZS09",
        email: "iarjona@ittepic.edu.mx",
        name: "Israel Arjona Vizcaíno",
        nip: 717,
        photo: 'https://picsum.photos/600/?random=1'
      },
      {
        controlnumber: "12400391",
        age: 28,
        career: "IM",
        curp: "AOCI840917HNTRZS09",
        email: "iarjona2@ittepic.edu.mx",
        name: "Israel Arjona Castañeda",
        nip: 818,
        photo: 'https://picsum.photos/600/?random=2'
      },
      {
        controlnumber: "22400391",
        age: 18,
        career: "IC",
        curp: "OOCI840917HNTRZS09",
        email: "iarjona3@ittepic.edu.mx",
        name: "Israel Arjona Méndez",
        nip: 919,
        photo: 'https://picsum.photos/600/?random=3'
      }
    ];
  }

  public getStudents():Observable<firebase.firestore.QuerySnapshot<Student>>{
    const col = this.firestore.collection<Student>('students');
    return col.get()
  }

  public removeStudent(pos: number): Student[]{
    this.students.splice(pos, 1);
    return this.students;
  }
//Puej no se puede por campo xD
  public getStudentByControlNumber(id: string): Observable<firebase.firestore.DocumentSnapshot<Student>> {
    return this.firestore.collection<Student>('students').doc(id).get()
  }

  public newStudent(student: Student) {
    return this.firestore.collection<Student>('students').add(student)
  }

}
