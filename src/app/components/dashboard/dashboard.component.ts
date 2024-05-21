import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { FormsComponent } from './forms/forms.component';
import { formData } from 'src/app/modal';
import { HttpServicesService } from 'src/app/services/http-services.service';
import { ErrorService } from 'src/app/services/error.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Action } from 'rxjs/internal/scheduler/Action';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public dialog: MatDialog,private httpservice:HttpServicesService,public errorService:ErrorService,private _errorSnackBar:MatSnackBar) {}

  formData:formData[]=[];
  httpErrorMessages:string='';

  ngOnInit(): void {
    this.getFormData()
  }



  openDialog(): void {
    const dialogRef = this.dialog.open(FormsComponent, {
       disableClose:true
    });
    dialogRef.afterClosed().subscribe(data=>{
       if(data)
        {
          this.formData.push(data) 
          this.postFormData(data)
          
        }
    })
  }



  postFormData(val:formData)
  {
    this.httpservice.postData(val).subscribe(
      {
        next:()=>{
          this._errorSnackBar.open('Successfully created','close',{
            duration:3000,
            panelClass:['custom-snackbar'],
          })
          this.getFormData()
        },
        error:(err)=>{
          this.httpErrorMessages=err;
          this._errorSnackBar.open(this.httpErrorMessages,'Close',{
            duration:3000,
            panelClass:['custom-snackbar'],
            
          })
        }
      }
    )
  }

getFormData( )
{
  this.httpservice.getData().subscribe({
    
    next:(data)=>{
        console.log(data,'this is the data');
        this.formData=data;
    }
  }
   
  )
}


}
