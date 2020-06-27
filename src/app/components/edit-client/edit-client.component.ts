import { Component, OnInit } from '@angular/core';

import { Client } from 'src/app/models/client';
import { ClientService } from './../../services/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

id:string;
client:Client={balance:null
  ,email:'',
  firstName:'',
  lastName:''
  ,phone:null
};
  constructor(private clientService:ClientService,
          private route:ActivatedRoute,
          private flashMessage:FlashMessagesService,
          private router:Router

  ) { }

  ngOnInit() {
    this.id=this.route.snapshot.params['id'];
    this.clientService.getClient(this.id).subscribe(client=>{
      this.client=client;
    })
  }
  onSubmit(){
    this.client.id=this.id;
    this.clientService.updateClient(this.client);
    this.flashMessage.show("client updated",{cssClass:"",timeout:5000})
    //this.router.navigate(['/client/',this.id])
    this.router.navigate(['/'])
  }
  
}
