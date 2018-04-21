import { Component, OnInit } from '@angular/core'
import { ActivatedRoute} from '@angular/router';
import { RecipedataService } from '../../service/recipedata.service';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editrecipe',
  templateUrl: './editrecipe.component.html',
  styleUrls: ['./editrecipe.component.css']
})
export class EditrecipeComponent implements OnInit {

  recipe:any;
  id:String;
  user:any;

  constructor(
    private recipedata: RecipedataService,
    private acrouter: ActivatedRoute,
    private authservice:AuthService,
    private router: Router
  ) {
    this.id = acrouter.snapshot.params['_id'];
    recipedata.searchById({id:this.id}).subscribe(res=> {
      this.recipe = res.recipe;
    } );
  }

  ngOnInit() {
    this.authservice.getProfile().subscribe(res => {
      this.user = res.user;
      this.id = res.user._id;
    }, err => {
      this.router.navigate(['/login']);
      return false;
    });

    document.getElementById("imgdiv").style.display = "none";
    document.getElementById("namediv").style.display = "none";
    document.getElementById("descriptiondiv").style.display = "none";
    document.getElementById("ingredientsdiv").style.display = "none";
    document.getElementById("methoddiv").style.display = "none";
    document.getElementById("healthdiv").style.display = "none";
    document.getElementById("occasionsdiv").style.display = "none";
  }

  showName(){
    document.getElementById("namediv").style.display = "block";
    (<HTMLInputElement>document.getElementById("myname")).select();
  }

  editName() {
    document.getElementById("namediv").style.display = "none";
    this.recipe.name = (<HTMLInputElement>document.getElementById("myname")).value;
    this.recipedata.editRecipe(this.recipe).subscribe(res=>{
      if (res.state){
        alert("data updated");
      }else{
        console.log(res);
      }
    });
  }

  showImg(){
    document.getElementById("imgdiv").style.display = "block";
    (<HTMLInputElement>document.getElementById("myimg")).select();
  }

  editImg() {
    document.getElementById("imgdiv").style.display = "none";
    this.recipe.img = (<HTMLInputElement>document.getElementById("myimg")).value;
    this.recipedata.editRecipe(this.recipe).subscribe(res=>{
      if (res.state){
        alert("data updated");
      }else{
        console.log(res);
      }
    });
  }

  showDescription(){
    document.getElementById("descriptiondiv").style.display = "block";
    (<HTMLInputElement>document.getElementById("mydescription")).select();
  }

  editDescription() {
    document.getElementById("descriptiondiv").style.display = "none";
    this.recipe.description = (<HTMLInputElement>document.getElementById("mydescription")).value;
    this.recipedata.editRecipe(this.recipe).subscribe(res=>{
      if (res.state){
        alert("data updated");
      }else{
        console.log(res);
      }
    });
  }

  showMethod(){
    document.getElementById("methoddiv").style.display = "block";
    (<HTMLInputElement>document.getElementById("mydmethod")).select();
  }

  editMethod() {
    document.getElementById("methoddiv").style.display = "none";
    this.recipe.method = (<HTMLInputElement>document.getElementById("mymethod")).value;
    this.recipedata.editRecipe(this.recipe).subscribe(res=>{
      if (res.state){
        alert("data updated");
      }else{
        console.log(res);
      }
    });
  }

  showIngredients(){
    document.getElementById("ingredientsdiv").style.display = "block";
    (<HTMLInputElement>document.getElementById("myingredients")).select();
  }

  editIngredients() {
    document.getElementById("ingredientsdiv").style.display = "none";
    this.recipe.ingredients = (<HTMLInputElement>document.getElementById("myingredients")).value.split(",");
    this.recipedata.editRecipe(this.recipe).subscribe(res=>{
      if (res.state){
        alert("data updated");
      }else{
        console.log(res);
      }
    });
  }

  showOccasions(){
    document.getElementById("occasionsdiv").style.display = "block";
    (<HTMLInputElement>document.getElementById("myoccasions")).select();
  }

  editOccasions() {
    document.getElementById("occasionsdiv").style.display = "none";
    this.recipe.occasion = (<HTMLInputElement>document.getElementById("myoccasions")).value.split(",");
    this.recipedata.editRecipe(this.recipe).subscribe(res=>{
      if (res.state){
        alert("data updated");
      }else{
        console.log(res);
      }
    });
  }

  showHealth(){
    document.getElementById("healthdiv").style.display = "block";
    (<HTMLInputElement>document.getElementById("myhealth")).select();
  }

  editHealth() {
    document.getElementById("healthdiv").style.display = "none";
    this.recipe.health = (<HTMLInputElement>document.getElementById("myhealth")).value.split(",");
    this.recipedata.editRecipe(this.recipe).subscribe(res=>{
      if (res.state){
        alert("data updated");
      }else{
        console.log(res);
      }
    });
  }

}
