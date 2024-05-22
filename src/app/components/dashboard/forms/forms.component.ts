import { Component,  Inject, OnInit, } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators ,NgForm,FormGroupDirective} from '@angular/forms';
import { formData, priorityList } from 'src/app/modal';
import {ErrorStateMatcher} from '@angular/material/core';
import { MatDialogRef ,MAT_DIALOG_DATA} from '@angular/material/dialog';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css'],
})
export class FormsComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<FormsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: formData
  ) {}

  matcher = new MyErrorStateMatcher(); //error message using angular material


  ngOnInit(): void {
    this.getform();
  }

  priorityList: priorityList[] = [
    {
      value: '1',
      priority: 'Low',
    },
    {
      value: '2',
      priority: 'Medium',
    },
    {
      value: '3',
      priority: 'High',
    },
  ];

  Reactiveform: FormGroup = new FormGroup({});

  getform() {
    this.Reactiveform = new FormGroup({
      tasknumber: new FormControl(null, [Validators.required]),
      assignedTo: new FormControl(null, [Validators.required]),
      assignedBy: new FormControl(null, [Validators.required]),
      assignedOn: new FormControl(null, [Validators.required]),
      priority: new FormControl(null, [Validators.required]),
      taskDescription: new FormControl(null, [Validators.required]),
    });
  }

  submit() {   
    this.dialogRef.close(this.Reactiveform.value as formData);
  }

  closeForm()
  {
    this.dialogRef.close(null)
  }
}
