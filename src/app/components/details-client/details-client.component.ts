import { Client } from 'src/app/models/client';
import { ClientService } from './../../services/client.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-details-client',
  templateUrl: './details-client.component.html',
  styleUrls: ['./details-client.component.css']
})
export class DetailsClientComponent implements OnInit {

  id:string='';
  client:Client={
    id:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:0,
    balance:0
  };
  showBalance:boolean=false;
  constructor(private clientService: ClientService,
            private route:ActivatedRoute,
            private router :Router,
            private flashmessages:FlashMessagesService) { }

  ngOnInit() {
    // this.route.paramMap.subscribe(params=>{
    //   this.id=params.get('id');
    // })
    this.id=this.route.snapshot.params['id'];
    this.getClient();
  }
  getClient(){
    this.clientService.getClient(this.id).subscribe(client=>{
        this.client=client;
        console.log(this.client);
        
    })
  }
  onSubmit(){
    this.client.id=this.id;
    this.clientService.updateClient(this.client);
    this.flashmessages.show("balance updated",{cssClass:'alert-warning',timeout:4000})
    this.showBalance=false;
  }
  deleteContact(id:string)
  {
    if(confirm("Are you sure to delete this client?")){
      this.clientService.deleteClient(id);
      this.flashmessages.show("client deleted",{cssClass:'alert-danger',timeout:4000});
      this.router.navigate(['/']);

    }
   
  }
}
