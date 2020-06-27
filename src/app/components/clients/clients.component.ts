import { AuthClientService } from './../../services/auth-client.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from './../../services/client.service';
import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients:Client[];
  Totals:number=0;
  searchClients:Client[];
  constructor(private clientsServices:ClientService,
    private route:ActivatedRoute,
    private router :Router,
    private flashmessages:FlashMessagesService
    ,private authClientServices:AuthClientService ) { }

  ngOnInit() {
    this.authClientServices.getAuth().subscribe(
      auth=>{

        this.clientsServices.getClients(auth.uid).subscribe(
          clients=>{
            this.searchClients=this.clients=clients;
           // console.log(clients);
            this.Totals+=this.getTotal();
          }
        )

      }
    )
    
  }
  getTotal(){
    // this.clients.forEach(element => {
    //   this.Totals+=element.balance
    // });
    return this.clients.reduce((total,client)=>{
      return total + parseFloat(client.balance.toString());
    },0)
  }

  deleteContact(id:string)
  {
    // if(confirm("Are you sure to delete this client?")){
    //   this.clientsServices.deleteClient(id);
    //   this.flashmessages.show("client deleted",{cssClass:'alert-danger',timeout:4000});
    //   this.router.navigate(['/'])
    // }
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        /////code
        this.clientsServices.deleteClient(id);
        this.flashmessages.show("client deleted",{cssClass:'alert-danger',timeout:4000});
        this.router.navigate(['/'])
        //////
        Swal.fire({
          title: 'deleted',
          text: 'This client is deleted',
          icon: 'success',
          timer:3000
        }
        )
      }
    })
   
  }
  search(query:string){
    this.searchClients=(query)? this.clients
    .filter(client=>client.firstName.toLowerCase().includes(query.toLowerCase())||client.lastName.toLowerCase().includes(query.toLowerCase())||client.email.toLowerCase().includes(query.toLowerCase()))
    :this.clients
    
  }
}
