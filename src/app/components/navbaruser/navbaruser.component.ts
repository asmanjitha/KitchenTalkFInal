import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-navbaruser',
  templateUrl: './navbaruser.component.html',
  styleUrls: ['./navbaruser.component.css']
})
export class NavbaruserComponent implements OnInit {
  user:any;
  name:String;
  address:String;
  constructor(
    private router: Router,
    private authservice:AuthService,

  ) { }

  ngOnInit() {
    this.authservice.getProfile().subscribe(res =>{
      this.user = res.user;
      this.name = "My Profile".toString();
      this.address = '/profile';
      document.getElementById("login").style.display = "block";
      if(res.user.isadmin){
        document.getElementById("profile").style.display = "none";
      }
    },err => {
      console.log(err);
      this.name = 'Login / Sign Up';
      this.address = '/login';
      document.getElementById("login").style.display = "none";
      return false;
    });


  }

  logout(){
    localStorage.clear();
    alert("You are logged out");
    location.reload();
    this.router.navigate(['/home']);
  }
}
