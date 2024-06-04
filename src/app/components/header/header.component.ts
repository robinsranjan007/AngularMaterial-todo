import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpServicesService } from 'src/app/services/http-services.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit ,OnDestroy{
  isloggedIn:boolean=false;
  userSubject!:Subscription


  constructor(private httpservice:HttpServicesService,private router:Router) { }


  ngOnInit(): void {
      this.userSubject= this.httpservice.user.subscribe((val)=>{
      this.isloggedIn=val?true:false;
      console.log(val,'this is inseid ethe header');  
     })
  }

  OnLogout()
  {
    this.httpservice.logout()
    this.isloggedIn=false;
  }
  ngOnDestroy():void{
this.userSubject.unsubscribe()
  }

}
