import { Router } from '@angular/router';
import { AuthClientService } from './../../services/auth-client.service';
import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email:string;
  password:string;
  constructor(private authClient:AuthClientService
    ,private router:Router,
    private flashMessage:FlashMessagesService
    ) { }

  ngOnInit() {
  }
  onRegister(){
    this.authClient.onRegister(this.email,this.password)
    .then(register=>{
    
        this.flashMessage.show('Congratulation you are logged',
                  {cssClass:'alert-success',timeout:5000})
         this.router.navigate(['/'])
      
    }).catch(error=>{
      this.flashMessage.show(error.message,
                  {cssClass:'alert-success',timeout:5000})
    })
  }

}
