import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthClientService } from './../../services/auth-client.service';
import { Component, OnInit } from '@angular/core';
import { audit } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isloggedIn:boolean=false
  userLoggedIn:string;
  constructor(private authService:AuthClientService
            ,private flashmessages:FlashMessagesService
            ,private router:Router) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(Auth=>{
      if(Auth){
        this.isloggedIn=true;
        this.userLoggedIn=Auth.email;
      }else{
        this.isloggedIn=false;
      }
    })
  }
  logout(){
    this.authService.logout()
    ///this.flashmessages.show('',{})
    this.isloggedIn=false
    return this.router.navigate(['/login'])
  }

}
