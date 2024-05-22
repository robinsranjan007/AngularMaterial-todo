import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { FormsComponent } from './forms/forms.component';
import { formData } from 'src/app/modal';
import { HttpServicesService } from 'src/app/services/http-services.service';
import { ErrorService } from 'src/app/services/error.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private httpservice: HttpServicesService,
    public errorService: ErrorService,
    private _errorSnackBar: MatSnackBar
  ) {}

  @ViewChild('formsdetails') formsdetails!: TemplateRef<any>;

  formData: formData[] = [];
  httpErrorMessages: string = '';
  loadSpinner: boolean = false;
  singleDetails!: formData;

  ngOnInit(): void {
    this.getFormData();
  }

  

  postFormData(val: formData) {
    this.loadSpinner = true;
    this.httpservice.postData(val).subscribe({
      next: () => {
        setTimeout(() => {
          this.loadSpinner = false;
          this._errorSnackBar.open('Successfully created', 'close', {
            duration: 2000,
            panelClass: ['custom-snackbar'],
          });
        }, 5000);

        this.getFormData();
      },
      error: (err: string) => {
        this.loadSpinner = false;
        this.snackbar(err);
      },
    });
  }

  getFormData() {
    this.loadSpinner = true;
    this.httpservice.getData().subscribe({
      next: (data) => {
        setTimeout(() => {
          this.formData = data;
          this.loadSpinner = false;
        }, 2000);
      },
      error: (err) => {
        this.loadSpinner = false;
        this.snackbar(err);
      },
    });
  }

  getFormDetails(id: string | undefined) {
    this.httpservice.getDetails(id).subscribe({
      next: (data) => {
        console.log(data);
        this.singleDetails = data;
        console.log(this.singleDetails, 'this is the details');
        this.openDetailsDialog();
      },
      error:(err)=>
      {
        this.snackbar(err)
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(FormsComponent, {
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.postFormData(data);
      }
    });
  }


  openDetailsDialog() {
    this.dialog.open(this.formsdetails);
  }

  snackbar(err: string) {
    this.httpErrorMessages = err;
    this._errorSnackBar.open(this.httpErrorMessages, 'Close', {
      duration: 5000,
      panelClass: ['custom-snackbar'],
    });
  }
}
