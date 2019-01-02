import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { NgForm } from '@angular/forms';
import { NullAstVisitor } from '@angular/compiler';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  // tslint:disable-next-line:typedef-whitespace
  // this also where define plugins function is declared inorder to add corresponding import
  constructor(private service: EmployeeService,
    private firestore: AngularFirestore,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm(); // calling the function below
  }

  // the forms previously has not been initialized, therefore there is an error inthe console browser
  // this line of codes will initialized the defined employee forms

  resetForm(form?: NgForm) { // adding thte required input from as well from js
    if (form != null) {
      form.resetForm();
    }

    this.service.formData = {
      Id: null,
      FullName: '',
      Position: '',
      EmpCode: '',
      Mobile: ''
    };
  }

   onSubmit(form: NgForm) {
     // this is where the plugins is used, after imported above
     // tslint:disable-next-line:prefer-const
     let data = Object.assign({}, form.value); // copy of the data from the froms object into a new copy called data var
     delete data.Id; // deleteting id inorder not to submit twice, however the copy of the data that is deleted
     if (form.value.Id == null) { // this how it implements update on the same submit button
       this.firestore.collection('employees').add(data);
     } else {
       // tslint:disable-next-line:max-line-length
       this.firestore.doc('employees/' + form.value.Id).update(data); // however if we not delete the ID, the data.id will be submitted twice
     }
     this.resetForm(form); // Resetting forms into original state, and ready to input next batch
     this.toastr.success('Submitted successfully', 'EMP. Register');
   }

}
