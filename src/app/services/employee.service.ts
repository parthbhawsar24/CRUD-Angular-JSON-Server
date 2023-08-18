import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  
  constructor(private http: HttpClient ) { }
  
  AddEmployee(data:any): Observable<any>{
    const url = 'http://localhost:3000/Employees';
    return this.http.post(url,data);
  }
  
  getEmployeeList(): Observable<any>{
    const url = 'http://localhost:3000/Employees';
    return this.http.get(url);
  }

  updateEmployee(id:number, data:any){
    const url = 'http://localhost:3000/Employees';
    return this.http.put(`${url}/${id}`,data);
  }

  deleteEmployee(id: number): Observable<any>{
    const url = 'http://localhost:3000/Employees';
    return this.http.delete(`${url}/${id}`);
  }
  }
