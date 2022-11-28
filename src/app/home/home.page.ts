import { AlertController } from '@ionic/angular';
import { Component } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Student } from '../models/student';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public students: Student[] = [];

  constructor(
    private studentService: StudentService,
    private alertController: AlertController,
    private router: Router
  ) {
    //this.students = this.studentService.getStudents();
    this.studentService.getStudents().subscribe((res) => {
      res.docs.forEach((student) => {
        const data = student.data();
        data.id = student.id;
        this.students.push(data);
      });
    });
  }

  public async removeStudent(pos: number) {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      subHeader: '¿Estás seguro que deseas eliminar?',
      message: 'Esto es una confirmación',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'Aceptar',
          role: 'confirm',
          handler: () => {
            this.students = this.studentService.removeStudent(pos);
          },
        },
      ],
    });

    await alert.present();
  }

  public getStudentByControlNumber(id: string): void {
    console.log(id);
    this.router.navigate(['/', 'view-student', id]);
  }

  public goToNewStudent(): void {
    this.router.navigate(['/new-student']);
  }
}
