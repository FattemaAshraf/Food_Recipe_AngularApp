import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenService } from '../services/authen.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { RequestResetPasswordComponent } from '../request-reset-password/request-reset-password.component';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent {
  loginForm = new FormGroup({
    email: new FormControl(null, [
      Validators.required,
      Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}'),
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$'),
    ]),
  });

  constructor(
    private _authService: AuthenService,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {}

  onSubmit(data: FormGroup) {
    console.log(data.value);
    this._authService.onLogin(data.value).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err: any) => {
        console.log(err);
        this.toastr.error('Try Agin', 'Toastr sad!');
      },
      complete: () => {
        this.toastr.success('Hello world!', 'Toastr fun!');
      },
    });
   }
  openDialog(): void {
    const dialogRef = this.dialog.open(RequestResetPasswordComponent, {
      data: {},
      width:'50%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.onRequestReset(result); //called fun to pass data
    });
  }

  onRequestReset(data:string){
    console.log(data);
    // let finalResult = {
    //   email : data
    // }
    this._authService.onRequestResetPassword(data).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err: any) => {
        console.log(err);
        this.toastr.error('Try Agin', 'Toastr sad!');
      },
      complete: () => {
        this.toastr.success('Hello world!', 'Toastr fun!');
      },
    });
  }
}
