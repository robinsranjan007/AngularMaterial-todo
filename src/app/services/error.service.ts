import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }
  

handleError(err:HttpErrorResponse)
{
  let errMsg=''
if(!err.error||!err.error.error)
  {
   errMsg="somehting went wrong please try again later" 
  }
  else
  {
    errMsg='Unknow error';
  }
  return throwError(()=>errMsg) 
  
}


}
