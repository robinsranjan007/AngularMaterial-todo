import { Component, OnInit } from '@angular/core';
import { HttpServicesService } from './services/http-services.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'todo';
  constructor(private httpservice:HttpServicesService)
  {

  }

  ngOnInit(): void {
     this.httpservice.autoLogin()
  }
}
