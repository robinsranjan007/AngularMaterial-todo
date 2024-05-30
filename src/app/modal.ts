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