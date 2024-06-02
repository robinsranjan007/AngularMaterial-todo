import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor() {}

  handleError(err: HttpErrorResponse) {
    console.log(err);

    let errMsg = '';
    if (!err.error || !err.error.error) {
      errMsg = 'somehting went wrong please try again later';
    } else if (err.error || err.error.error) {
      errMsg = err.error.error;
    } else {
      errMsg = 'Something Went wrong pls try again later';
    }
    return throwError(() => new Error(errMsg));
  }

  handleAuthError(err: HttpErrorResponse) {
    let errMsg = 'An unknown error occurred';
    
    if (err.error) {
        if (err.error.error && err.error.error.message) {
            errMsg = err.error.error.message;
             
        } else if (err.error.error) {
            errMsg = err.error.error;
            
        } else if (typeof err.error === 'string') {
            errMsg = err.error;
            
        } else {
            errMsg = 'An unknown error occurred';
            
        }
    } else {
        errMsg = 'Please try again later';
        
    }

   
    return throwError(() => new Error(errMsg));
}

}
