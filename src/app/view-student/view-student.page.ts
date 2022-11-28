import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Student } from '../models/student';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.page.html',
  styleUrls: ['./view-student.page.scss'],
})
export class ViewStudentPage implements OnInit {
  public student: Student = {
    age: 0,
    career: '',
    controlnumber: '',
    curp: '',
    email: '',
    name: '',
    nip: 0,
    photo: '',
  };

  constructor(
    private studentService: StudentService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.studentService
        .getStudentByControlNumber(params.id)
        .subscribe((doc) => {
          this.student = doc.data();
        });
    });
  }
}
