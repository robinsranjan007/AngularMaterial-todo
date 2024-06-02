import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpServicesService } from 'src/app/services/http-services.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit ,OnDestroy{
  dashboard:boolean=false;
userSubject!:Subscription


  constructor(private httpservice:HttpServicesService) { }


  ngOnInit(): void {
 this.userSubject=   this.httpservice.user.subscribe((val)=>{
      this.dashboard=val?true:false;
     })
  }


  ngOnDestroy():void{
this.userSubject.unsubscribe()
  }

}
