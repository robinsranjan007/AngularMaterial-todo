import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firebaseresponse, formData } from '../modal';
import { catchError, map } from 'rxjs';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class HttpServicesService {

  constructor(private http:HttpClient,private errorhandle:ErrorService) { }

  postData(data:formData)
  {
   return this.http.post<formData>('https://angular-material-1bedb-default-rtdb.firebaseio.com/task.json',data).pipe(
    catchError(this.errorhandle.handleError)
   )
  }

  getData()
  {
    return this.http.get<firebaseresponse>('https://angular-material-1bedb-default-rtdb.firebaseio.com/task.json').pipe(
    map((response:firebaseresponse)=>{
    let arr=[];
      for(let key in response)
        {
          if(response.hasOwnProperty(key)){
            arr.push({...response[key],id:key})
          }
        }
        return arr;
    }),
    catchError(this.errorhandle.handleError)
    )
  }





}
