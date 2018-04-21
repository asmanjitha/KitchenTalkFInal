import { Component, OnInit } from '@angular/core';
import { RecipedataService } from '../../service/recipedata.service';
import {AuthService} from "../../service/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-addrecipe',
  templateUrl: './addrecipe.component.html',
  styleUrls: ['./addrecipe.component.css']
})
export class AddrecipeComponent implements OnInit {

  name: String;
  ingredients: String[];
  ingredient: String;
  heal: String;
  description: String;
  health: String[];
  occasions: String[];
  occasion: String;
  recipe: Object;
  method: String;
  img: String;
  author:String;
  date:String;
  user:any;
  comments:Object;
  username:String;

  constructor(
    private recipedata: RecipedataService,
    private authservice: AuthService,
    private router: Router
  ) {
    this.ingredients = [];
    this.health = [];
    this.occasions = [];

  }

  ngOnInit() {
    this.authservice.getProfile().subscribe(res =>{
      this.user = res.user;
      this.username = res.user.username;
    },err => {
      this.router.navigate(['/home']);
      return false;
    });
    this.date = this.getDate();

  }

  addIngredients(){
    this.ingredients.push(this.ingredient);
    console.log(this.ingredients);
    this.ingredient = "";
  }
  addHealth(){
    this.health.push(this.heal);
    console.log(this.health);
    this.heal = "";
  }
  addOccasions(){
    this.occasions.push(this.occasion);
    console.log(this.occasions);
    this.occasion = "";
  }
  saveRecipe(){
    this.recipe = {
      name:this.name,
      ingredients:this.ingredients,
      img:this.img,
      description:this.description,
      method:this.method,
      health:this.health,
      occasion:this.occasions,
      rating:0.0,
      count:0,
      author:this.user.username,
      date: this.date,
      comments:this.comments,
    };
    this.recipedata.saveTempRecipe(this.recipe).subscribe(res=>{
      if (res.state){
        alert("data saved");
        this.router.navigate(['/profile'])
      }else{
        console.log(res);
      }
    });
  }

  getDate(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    return (dd + '.' + mm + '.' + yyyy);
  }

}
