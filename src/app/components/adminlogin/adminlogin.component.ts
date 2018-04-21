import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {

  email: String;
  password: String;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  LoginData() {
    const user = {
      email: this.email,
      password: this.password
    };

    this.authService.loginAdmin(user).subscribe((res: any) => {
      if(res.state){
        this.authService.saveData(res.token, res.userData);
        alert("You are logged in");
        location.reload();
        this.router.navigate(['/admin']);
      }else{
        alert("logging in failed");
        this.router.navigate(['/adminlogin']);
      }
    });
  }




}
