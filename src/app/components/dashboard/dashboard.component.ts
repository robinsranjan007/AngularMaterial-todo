import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { FormsComponent } from './forms/forms.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public dialogRef: MatDialog) {}

  ngOnInit(): void {
  }



  openDialog()
  {
    this.dialogRef.open(FormsComponent)
  }

}
