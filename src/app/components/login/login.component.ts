import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { HttpServicesService } from 'src/app/services/http-services.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Authresponse, User } from 'src/app/modal';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private httpservice: HttpServicesService,
    private _snackBar: MatSnackBar,
    private router: Router,
    
  ) {}

  matcher = new MyErrorStateMatcher(); //this is for error displaying on the form
  loginForm: FormGroup = new FormGroup({});
  formTitle: boolean = false;
  loader: boolean = false;
  observs!: Observable<Authresponse>;

  ngOnInit(): void {
    this.getloginForm();
  }

  getloginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  ExistingMember() {
    this.formTitle = !this.formTitle;
  }

  signupandLogin() {
    const { email, password } = this.loginForm.value;
    if (this.formTitle) {
      console.log(email, password, 'this is the credentials');
      this.loader = true;

      this.observs = this.httpservice.signup(email, password);
    } else {
      this.observs = this.httpservice.login(email, password);
    }
    this.observs.subscribe({
      next: (val) => {
        console.log(val);
        this.loader = false;
        this._snackBar.open('Signed Up', 'Success!!!', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.loader = false;
        this._snackBar.open(err, 'Error!!!', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        this.loginForm.reset();
      },
    });
  }
}
