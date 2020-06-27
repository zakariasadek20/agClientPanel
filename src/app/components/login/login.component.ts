import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthClientService } from './../../services/auth-client.service';
import { Component, OnInit } from '@angular/core';
import { auth } from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:string;
  password:string;
  constructor(private authService:AuthClientService,
            private flashmessages:FlashMessagesService,
            private router:Router) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(
      auth=>{
        if(auth){
         return this.router.navigate(['/'])
        }
      }
    )

  }
 
  onLogin(){
    this.authService.login(this.email,this.password)
    .then(auth=>{
      if(auth){
        this.flashmessages.show('you are logged successufully '
        ,{cssClass:'alert-success',timeout:5000})
        this.router.navigate(['/']);
      }
      
    }).catch(error=>{
      this.flashmessages.show(error.message
      ,{cssClass:'alert-danger',timeout:10000})
    });
    
  }
  onLoginWithGoogle(){
    this.authService.loginWithGoogle().then(auth=>{
      if(auth){
        this.flashmessages.show('you are logged successfully',{cssClass:'alert-success',timeout:5000})
        this.router.navigate(['/']);
      }
    }).catch(error=>{
      this.flashmessages.show(error.message,{cssCLass:'alert-danger',timeout:10000})
    })
    
   
  }
}
