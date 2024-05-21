import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { formData } from '../modal';

@Injectable({
  providedIn: 'root'
})
export class HttpServicesService {

  constructor(private http:HttpClient) { }

  postData(data:formData)
  {
   return this.http.post<formData>('https://angular-material-1bedb-default-rtdb.firebaseio.com/',data)
  }





}
