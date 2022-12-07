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

  constructor(
    private firestore: AngularFirestore,
  ) {  }

  public getStudents():Observable<firebase.firestore.QuerySnapshot<Student>>{
    const col = this.firestore.collection<Student>('students');
    return col.get()
  }

  public removeStudent(id: string){
    // this.students.splice(pos, 1);
    // return this.students;
    return this.firestore.collection<Student>('students').doc(id).delete();
  }
  public getStudentByControlNumber(id: string): Observable<firebase.firestore.DocumentSnapshot<Student>> {
    return this.firestore.collection<Student>('students').doc(id).get()
  }

  public newStudent(student: Student) {
    return this.firestore.collection<Student>('students').add(student)
  }

}
