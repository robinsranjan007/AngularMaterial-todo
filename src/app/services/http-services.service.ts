import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Authresponse, User, firebaseresponse, formData } from '../modal';
import { Subject, catchError, map, tap } from 'rxjs';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class HttpServicesService {
  constructor(private http: HttpClient, private errorhandle: ErrorService) {}

  user= new Subject<User>()

  postData(data: formData) {
    return this.http
      .post<formData>(
        'https://angular-material-1bedb-default-rtdb.firebaseio.com/task.json',
        data
      )
      .pipe(catchError(this.errorhandle.handleError));
  }

  getData() {
    return this.http
      .get<firebaseresponse>(
        'https://angular-material-1bedb-default-rtdb.firebaseio.com/task.json'
      )
      .pipe(
        map((response: firebaseresponse) => {
          let arr = [];
          for (let key in response) {
            if (response.hasOwnProperty(key)) {
              arr.push({ ...response[key], id: key });
            }
          }
          return arr;
        }),
        catchError(this.errorhandle.handleError)
      );
  }

  getDetails(id: string | undefined) {
    return this.http
      .get<formData>(
        `https://angular-material-1bedb-default-rtdb.firebaseio.com/task/${id}.json`
      )
      .pipe(
        map((val) => {
          const data: formData = { ...val, id: id };

          return data;
        }),
        catchError(this.errorhandle.handleError)
      );
  }

deleteDetails(id:string|undefined)
{
  return this.http.delete<formData>(`https://angular-material-1bedb-default-rtdb.firebaseio.com/task/${id}.json`).pipe(
    catchError(this.errorhandle.handleError)
  )
}

deleteAllData()
{
 return this.http.delete<formData>(`https://angular-material-1bedb-default-rtdb.firebaseio.com/task/.json`).pipe(
  catchError(this.errorhandle.handleError)
 )
}


updateForm(id:string|undefined,data:formData)
{
return this.http.put<formData>(`https://angular-material-1bedb-default-rtdb.firebaseio.com/task/${id}.json`,data).pipe(
  catchError(this.errorhandle.handleError)
)
}

// REGISTRATION AND LOGIN CODES BELOW


signup(email:string,password:string)
{
  const signUp ={email:email,password:password,returnSecureToken:true}
  const url="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDymFhUq56BtHIOxL4sTJILHThKxdAIH20"
  return this.http.post<Authresponse>(url,signUp).pipe(
    catchError(this.errorhandle.handleAuthError),
    tap((res)=>{

    this.handleNewuser(res)

    })
  )
}


login(email:string,password:string)
{
const login ={email:email,password:password,returnSecureToken:true}
const url ="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDymFhUq56BtHIOxL4sTJILHThKxdAIH20"
return this.http.post<Authresponse>(url,login).pipe(
  catchError(this.errorhandle.handleAuthError),
)
}



handleNewuser(res:Authresponse)
{
  const expiresInTs= new Date().getTime() + Number(res.expiresIn)*1000
  const expires=new Date(expiresInTs); 
const newUser:User={
email: res.email,
id: res.email,
_token: res.idToken,
expiresIn: expires
}

console.log((newUser),'i am the new user');
this.user.next(newUser)
}

}