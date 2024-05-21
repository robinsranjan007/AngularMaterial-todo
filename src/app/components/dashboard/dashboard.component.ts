import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { FormsComponent } from './forms/forms.component';
import { formData } from 'src/app/modal';
import { HttpServicesService } from 'src/app/services/http-services.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public dialog: MatDialog,private httpservice:HttpServicesService) {}

  formData:formData[]=[];

  ngOnInit(): void {
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
        next:(val)=>{
          console.log(val,'this is the val being posted');
          
        },
        error:(err:HttpErrorResponse)=>{
          console.log(err);
          // this is where we are writing businuess logic
          
        }
      }
    )
  }

}
