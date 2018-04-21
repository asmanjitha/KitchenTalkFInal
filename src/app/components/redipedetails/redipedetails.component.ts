import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { RecipedataService } from '../../service/recipedata.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-redipedetails',
  templateUrl: './redipedetails.component.html',
  styleUrls: ['./redipedetails.component.css']
})
export class RedipedetailsComponent implements OnInit {

  id: String;
  recipe: any;
  users: String[];
  comments: String[];
  user: any;
  count:any;
  rating:any;
  temprate:any;

  constructor(
    private recipedata: RecipedataService,
    private authservice:AuthService,
    private acrouter: ActivatedRoute
  ) {
    this.id = acrouter.snapshot.params['_id'];
    recipedata.searchById({id:this.id}).subscribe(res=> {
      this.recipe = res.recipe;
      this.comments = res.recipe.comments;
      this.users = Object.keys(this.comments);
      this.rating = res.recipe.rating;
      this.count = res.recipe.count;
      this.temprate = 0;
    } );

    this.user = JSON.parse(localStorage.getItem("user"));
  }

  ngOnInit() {
    this.authservice.getProfile().subscribe(res =>{
      this.user = res.user;
      document.getElementById("ratediv").style.display = "none";
    },err => {
      document.getElementById("rate").style.display = "none";
      document.getElementById("comment").style.display = "none";
      return false;
    });

  }

  showComment(){
    document.getElementById("commentdiv").style.display = "block";
    //(<HTMLInputElement>document.getElementById("myemail")).select();
  }

  saveComment() {
    alert(this.count);
    document.getElementById("commentdiv").style.display = "none";
    if(this.recipe.comments==null){
      alert("no comments");
      this.recipe.comments = {};
      this.users = [];
      this.recipe.comments[this.user.username] = ((<HTMLInputElement>document.getElementById("mycomment")).value);
      this.users.push(this.user.username);
      this.recipedata.saveComment(this.recipe).subscribe(res=>{
        if (res.state){
          alert("data updated");
        }else{
          alert("data not updated");
        }
      });
    }else{
      this.recipe.comments[this.user.username] = ((<HTMLInputElement>document.getElementById("mycomment")).value);
      this.users.push(this.user.username);
      this.recipedata.saveComment(this.recipe).subscribe(res=>{
        if (res.state){
          alert("data updated");
        }else{
          alert("data not updated");
        }
      });
    }

  }

  closeComment(){
    document.getElementById("commentdiv").style.display = "none";
    (<HTMLInputElement>document.getElementById("mycomment")).value = "";
  }

  showRate(){
    document.getElementById("ratediv").style.display = "block";
  }

  saveRate() {
    document.getElementById("ratediv").style.display = "none";
    this.temprate = Number((<HTMLInputElement>document.getElementById("myrate")).value);
    this.recipe.rating = (this.rating*this.count + this.temprate)/(this.count + 1);
    this.rating = this.recipe.rating;
    this.count =+ 1 ;
    this.recipe.count = this.count;
    this.recipedata.saveRate(this.recipe).subscribe(res=>{
      if (res.state){
        alert("data updated");
      }else{
        alert("data not updated");
      }
    });


  }

  closeRate(){
    document.getElementById("ratediv").style.display = "none";
    (<HTMLInputElement>document.getElementById("myrate")).value = "";
  }

}
