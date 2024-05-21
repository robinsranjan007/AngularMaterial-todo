export interface formData{
    id?:string
    tasknumber:number,
    assignedTo:string,
    assignedBy:string,
    assignedOn:string,
    priority:string,
    taskDescription:string
}

export interface priorityList {
    value:string
     priority:string
  }

  export interface firebaseresponse{
    [key:string]:formData
  }