import { Component, OnInit } from '@angular/core';
import {EnrollmentService} from 'src/app/enrollment.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {updateModel} from './update.model';
import {activateModel} from './Activate.model';
import {deleteModel} from './Delete.model';
import {mailModel} from './mail.model';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

// counts:[{
//   inactive:''
// }]

mailData= new mailModel(null,null);
deleteData= new deleteModel(null,null);
activeData= new activateModel(null);
update = new updateModel(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);

inactive='';
active='';
paid='';
total='';
report='';

Users:[{
  regid:'',
  firstname:'',
  lastname:'',
  email:'',
  phone:''
}];

Data:[{
  firstname:'',
  lastname:'',
  email:'',
  phone:'',
  address1:'',
  landmark:'',
  city:'',
  district:'',
  zip:'',
  qualification:'',
  yearofpassout:'',
  skillset:'',
  empstatus:'',
  techTraining:''
  year:'',
  course:'',
  regid:'',
  amount:'',
  image:''
}]

closeModal: string;

constructor(private enrollmentservice:EnrollmentService,private modalService: NgbModal){}

      triggerModal(content) {
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
          this.closeModal = `Closed with: ${res}`;
        }, (res) => {
          this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
        });
      }

      private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
          return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          return 'by clicking on a backdrop';
        } else {
          return  `with: ${reason}`;
        }
      }


  ngOnInit():void 
   {
          //to show count of active accounts
        this.enrollmentservice.getinactiveCount().subscribe((data)=>{
         // console.log(data);
          this.inactive=JSON.parse(JSON.stringify(data));
        }) 
        //to show count of inactive accounts
        this.enrollmentservice.getactiveCount().subscribe((data)=>{
         // console.log(data);
          this.active=JSON.parse(JSON.stringify(data));
        })
          //to show the count of paid users
        this.enrollmentservice.getpaidCount().subscribe((data)=>{
            // console.log(data);
            this.paid=JSON.parse(JSON.stringify(data));
          })
        //to show data of inactive users
        this.enrollmentservice.getInactiveUsers().subscribe((data)=>{
          // console.log(data);
          this.Users=JSON.parse(JSON.stringify(data));
        })
        // //to show data of paid users
        // this.enrollmentservice.getPaidUsers().subscribe((data)=>{
        //   // console.log(data);
        //   this.Data=JSON.parse(JSON.stringify(data));
        // })
        //to show count of total users
        this.enrollmentservice.getTotalusers().subscribe((data)=>{
          // console.log(data);
          this.total=JSON.parse(JSON.stringify(data));
        })
       
        
  
  }
//for updating user details
  updateEnrollment(){
    
    this.enrollmentservice.updateEnrollment(this.update);
    // console.log("Update successful");
   // console.log(this.update);
   window.location.reload();
    
  }

//for activating user
 activateUser(){

  this.enrollmentservice.ActivateUser(this.activeData);
  //console.log("Update successful");
  //console.log(this.activeData);
  window.location.reload();

 }

  //for searching user
    searchUser(){

    //console.log(this.activeData);
    this.enrollmentservice.SearchUser(this.activeData).subscribe((data)=>{
    this.Data=JSON.parse(JSON.stringify(data));
    //console.log(this.Data);
    })
  }

  //for deleting user
  deleteUser(){
        if(this.deleteData.regid==this.deleteData.regidtwo){
          console.log(this.deleteData);
          //console.log(this.deleteData);
          this.enrollmentservice.DeleteUser(this.deleteData).subscribe((data)=>{
          this.Data=JSON.parse(JSON.stringify(data));
          window.location.reload();
        })
     }
     else{
       alert("Entered Regid is not matching!!!")
     }
    }
  
    sendNotification(){
      this.enrollmentservice.sendNotification(this.mailData)
      console.log(this.mailData);
      //window.location.reload();
    }

    deactivateUser(){
              if(this.deleteData.regid==this.deleteData.regidtwo){
                console.log(this.deleteData);
                //console.log(this.deleteData);
                this.enrollmentservice.DeactivateUser(this.deleteData)
                window.location.reload();
              
          }
          else{
            alert("Entered Regid is not matching!!!")
          }
          
    }

    //generate report pf paid users
    generateReport(){
      this.enrollmentservice.getPaidUsers().subscribe((data)=>{
        this.report=JSON.parse(JSON.stringify(data));
    })
  }
 

}
