import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { AuthenService } from '../services/authen.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {
  hide = true;
  hideConfirm = true;
  userEmail = localStorage.getItem('email');

  resetForm = new FormGroup(
    {
      email: new FormControl(this.userEmail, [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}'),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$'),
      ]),
      confirmPassword: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$'),
      ]),
      seed: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
      ]),
    },
    {
      validators: this.passwordMatchValidator,
    }
  );
  constructor(
    private _authService: AuthenService,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {}

  passwordMatchValidator(control: AbstractControl) {
    return control.value.password === control.value.confirmPassword
      ? null
      : { mismatch: true };
  }
  onSubmit(data: FormGroup) {
    console.log(data.value);
    this._authService.onResetPassword(data.value).subscribe({
      next: (res: any) => {
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
