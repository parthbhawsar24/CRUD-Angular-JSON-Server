import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MatDialogRef,  MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-add-edit-employee',
  templateUrl: './add-edit-employee.component.html',
  styleUrls: ['./add-edit-employee.component.css']
})
export class AddEditEmployeeComponent implements OnInit {
  EmpForm: FormGroup;
  

 constructor(private fb: FormBuilder, private empSvc: EmployeeService,
  private MatDialogRef: MatDialogRef<AddEditEmployeeComponent>, 
  @Inject(MAT_DIALOG_DATA) public data: any,
  private corsvc: CoreService
  ){
  this.EmpForm = this.fb.group({
    FirstName:['', Validators.required],
    LastName: ['', Validators.required],
    Email: ['', [Validators.required, Validators.email]],
    MobileNo:  ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]] ,
    Dob: ['', Validators.required],
    Education: ['', Validators.required],
    Gender: ['', Validators.required],
  })
 }

 ngOnInit(): void {
  this.EmpForm.patchValue(this.data);
}
 
onFormSubmit() {
  if (this.EmpForm.valid) {
    if (this.data) {
      this.empSvc
        .updateEmployee(this.data.id, this.EmpForm.value)
        .subscribe({
          next: (val: any) => {
            this.corsvc.openSnackBar('Employee detail updated!');
            this.MatDialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
    } else {
      this.empSvc.AddEmployee(this.EmpForm.value).subscribe({
        next: (val: any) => {
          this.corsvc.openSnackBar('Employee added successfully');
          this.MatDialogRef.close(true);
        },
        error: (err: any) => {
          console.error(err);
        },
      });
    }
  }
}
}
