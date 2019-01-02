import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/shared/employee.model';
import { EmployeeService } from 'src/app/shared/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  list: Employee[];
  constructor(private service: EmployeeService) { }

  ngOnInit() {
    this.service.getEmployees().subscribe(actionArray => {
      this.list = actionArray.map(item => {
        return {
          Id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Employee;
      });
    });
  }

  onEdit(emp: Employee) {
    // this.service.formData = emp; // this adding the data into the forms
    this.service.formData = Object.assign({}, emp); // this actually what we need todo, copy of the object
  }

}
