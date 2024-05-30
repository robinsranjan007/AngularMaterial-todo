import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
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
  @ViewChild('deleteModal') deleteModal!: TemplateRef<any>;

  formData: formData[] = []; // all the data I am getting from get method is stored in this array of formdata
  loadSpinner: boolean = false;
  singleDetails!: formData; // this is an object just for chosen id details
  dialogRef!: MatDialogRef<any>;
  updatedData!:formData|undefined

  ngOnInit(): void {
    this.getFormData();
  }

  postFormData(val: formData) {
    this.loadSpinner = true;
    this.httpservice.postData(val).subscribe({
      next: () => {
        this.loadSpinner = false;
          this._errorSnackBar.open('Successfully created', 'close', {
            duration: 2000,
            panelClass: ['custom-snackbar'],
          });

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
        this.loadSpinner = false;
          this.formData = data;
      },
      error: (err) => {
        this.loadSpinner = false;
        this.snackbar(err);
      },
    });
  }

  getFormDetails(id: string | undefined) {
    this.loadSpinner=true;
    this.httpservice.getDetails(id).subscribe({
      next: (data) => {
        this.loadSpinner=false;
        console.log(data);
        this.singleDetails = data;
        console.log(this.singleDetails, 'this is the details');
        this.openDetailsDialog();
      },
      error: (err) => {
        this.loadSpinner=false
        this.snackbar(err);
      },
    });
  }

  deleteCard(id: string | undefined) {
    this.loadSpinner=true;
    this.httpservice.deleteDetails(id).subscribe({
      next: (data) => {
        this.loadSpinner=false;
        let message = `The details with id no: ${id} is deleted`;
        this.snackbar(message);
        this.getFormData();
      },
      error: (err) => {
        this.loadSpinner=false;
        let message = 'Failed to delete something is wrong';
        this.snackbar(message);
      },
    });
  }


updateForm(res:formData,id:string|undefined)
{
  this.loadSpinner=true;
  this.httpservice.updateForm(id,res).subscribe(
    {
      next:(val: formData)=>{
        this.loadSpinner=false;
        console.log(val,'success');
        this.getFormData();
        
      },
      error:(err)=>{
        const message ="something went wrong while updating message";
        this.snackbar(message);
        this.loadSpinner=false;
      }
    }
  )
}


  deleteAll() {
  this.loadSpinner=true;
    this.httpservice.deleteAllData().subscribe({
      next: (response) => {
        this.dialogRef.close();
        this.loadSpinner=false
        this.getFormData()
      },
      error: (err) => {
        let message = 'something went wrong cannot be deleted';
        this.dialogRef.close();
        this.snackbar(message);
        this.loadSpinner=false;
      },
    });

   
  }


 

  cancelDelete()
  {
    this.dialogRef.close()
  }


  openDeleteAllModal() {
    console.log('this is the modal');
    this.dialogRef = this.dialog.open(this.deleteModal, {
      disableClose: true,
    });
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(FormsComponent, {
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.postFormData(data);
        console.log('submit is clicked');
        
      }
    });
  }

  OpenupdateForm(id:string|undefined)
  { 
    this.updatedData =this.formData.find((val)=>val.id===id)
  const dialogRef=  this.dialog.open(FormsComponent,{
      disableClose:true,
      data:{
        newData :this.updatedData,
        setHeading:true
      }
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        console.log('Update is clicked',data);
        this.updateForm(data,id)
      }
    });
  }


  openDetailsDialog(): void {
    this.dialogRef = this.dialog.open(this.formsdetails, {
    disableClose: true,
    });
  }

  snackbar(str: string): void {
    this._errorSnackBar.open(str, 'Close', {
      duration: 5000,
      panelClass: ['custom-snackbar'],
    });
  }

  closeDetailForm() {
    {
      this.dialogRef.close();
      console.log('I am also being called');
    }
  }



}
