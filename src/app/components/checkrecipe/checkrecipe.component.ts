import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { RecipedataService } from '../../service/recipedata.service';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkrecipe',
  templateUrl: './checkrecipe.component.html',
  styleUrls: ['./checkrecipe.component.css']
})
export class CheckrecipeComponent implements OnInit {

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
    recipedata.searchByIdTemp({id:this.id}).subscribe(res=> {
      this.recipe = res.recipe;
      this.recipe._id = this.id;
    } );
  }

  ngOnInit() {
    this.authservice.getAdminProfile().subscribe(res => {
      this.user = res.admin;
      this.id = res.admin._id;
    }, err => {
      this.router.navigate(['/login']);
      return false;
    });
  }

  acceptRecipe(){
    this.recipedata.saveRecipe(this.recipe).subscribe(res=>{
      if (res.state){
        alert("You accept the recipe,\n data updated");
      }else{
        alert("Datanot updated, try again");
      }
    });
    this.recipedata.deleteTemp(this.recipe).subscribe(res=>{
      if (res.state){
        this.router.navigate(['/admin']);
      }else{
        alert("Data not updated, try again");
      }
    });
  }

  declineRecipe(){
    this.recipedata.deleteTemp(this.recipe).subscribe(res=>{
      if (res.state){
        alert("You decline the recipe \n data updated");
        this.router.navigate(['/admin']);
      }else{
        alert("Data not updated, try again");
      }
    });
  }

}
