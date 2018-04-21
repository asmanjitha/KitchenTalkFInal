import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import {RecipedataService} from "../../service/recipedata.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  user: any;
  id: String;
  lis: Object[];
  msg: String;
  name: String;


  constructor(private authservice: AuthService,
              private recipedata: RecipedataService,
              private router: Router) {
  }


  ngOnInit() {
    this.authservice.getAdminProfile().subscribe(res => {
      this.user = res.admin;
      this.id = res.admin._id;
      this.name = res.admin.username;
      this.getNewRecipes();
    }, err => {
      this.router.navigate(['/login']);
      return false;
    });
  }

  getNewRecipes() {
    this.recipedata.searchAllTemp().subscribe(res => {
      this.lis = res.recipe;
      if (this.lis.length == 0) {
        this.msg = "You don't have any recipe to check";
        return true
      } else {
        this.msg = "You have " + this.lis.length + " recipes to check ";
        return true
      }
    });
    return true
  }
}
