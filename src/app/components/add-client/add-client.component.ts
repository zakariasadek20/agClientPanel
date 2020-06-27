import { AuthClientService } from './../../services/auth-client.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { ClientService } from './../../services/client.service';
import { Client } from './../../models/client';
import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {


  client:Client={
    firstName:'',
    lastName:'',
    email:'',
    phone:null,
    balance:0,
    user:''
  }
  
  constructor(private clientservices:ClientService,
              private route:Router,
              private flashMessage:FlashMessagesService,
              private authClientService:AuthClientService) { }

  ngOnInit() {
    this.authClientService.getAuth().subscribe(
      userData=>{
        this.client.user=userData.uid
      }
    )
  }
  onSubmit(){
    this.clientservices.addClient(this.client);
    this.flashMessage.show('Client added Succesfly',
    {cssClass:"alert alert-primary",timeout:5000})
    return this.route.navigate(['/'])
  }
}
