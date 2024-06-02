export interface formData{
    id?:string
    tasknumber:number,
    assignedTo:string,
    assignedBy:string,
    assignedOn:string,
    priority:string,
    taskDescription:string,
    setHeading?: boolean,
    newData:any
}

export interface updateDate{
 
  newData:formData
}


export interface priorityList {
    value:string
     priority:string
  }

  export interface firebaseresponse{
    [key:string]:formData
  }

  export interface tansferData{
    
      formData: formData,
      formHeading:string
 
  }

  

  export interface Authresponse{
    idToken:string,
    email:string,
    refreshToken:string,
    expiresIn:string,
    localId:string,
    registered?:boolean,
  }


  export interface User{
    email:string,
    id:string,
    _token:string,
    expiresIn:Date
  }