import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {enrollmentModel} from './Enrollment.model';
import {activateModel} from './pages/dashboard/Activate.model';


@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  
  data= new enrollmentModel(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
  

  constructor(private http:HttpClient) { }
//count of inactive account
  getinactiveCount(){
    return this.http.get("http://localhost:2000/inactivecount")
  }
//count of active account
  getactiveCount(){
    return this.http.get("http://localhost:2000/activecount")
  }
//count of paid users.
  getpaidCount(){
    return this.http.get("http://localhost:2000/paymentcount")
  }
//data of inactive users.
getInactiveUsers(){
  return this.http.get("http://localhost:2000/inactive")
}

//data of paid users.
getPaidUsers(){
  return this.http.get("http://localhost:2000/payment")
}

//data of total users.
getTotalusers(){
  return this.http.get("http://localhost:2000/totalusers")
}

//updating the details of user
updateEnrollment(data:any)
{
  console.log(data);
  return this.http.post("http://localhost:2000/update",{"Data":data})
  .subscribe(data =>{console.log(data)})
}

//activate user
ActivateUser(data:any)
{
  console.log("activate");
  console.log(data);
  return this.http.post("http://localhost:2000/activate",{"Data":data})
  .subscribe(data =>{console.log(data)})
}

//search user
SearchUser(activeData:any)
{
  //console.log(activeData.regid);
  return this.http.get("http://localhost:2000/"+activeData.regid)
  
}

//delete user
DeleteUser(deleteData:any)
{
  console.log(deleteData.regid);
  return this.http.delete("http://localhost:2000/delete/"+deleteData.regid)
}

//sent notification
sendNotification(data:any){
  console.log("send mail");
  console.log(data);
  return this.http.post("http://localhost:2000/mailer",{"Data":data})
  .subscribe(data =>{console.log(data)})
}

DeactivateUser(data:any)
{
  console.log("deactivate");
  console.log(data);
  return this.http.post("http://localhost:2000/deactivate",{"Data":data})
  .subscribe(data =>{console.log(data)})
}

}
