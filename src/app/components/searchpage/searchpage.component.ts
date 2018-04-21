import { Component, OnInit } from '@angular/core';
import { RecipedataService } from '../../service/recipedata.service';
import {getType} from "@angular/core/src/errors";
import {Time} from "@angular/common";


@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.component.html',
  styleUrls: ['./searchpage.component.css']
})
export class SearchpageComponent implements OnInit {

  searchcategory: String;
  keyword: String;
  msg: String;
  lis: Object[];

  constructor(
    private recipedata: RecipedataService,
  ) { }

  ngOnInit() {
  }

  recipeSearch(){
    var t = performance.now();
    const recipe = {
      searchcategory: this.searchcategory,
      keyword: this.keyword
    };
    var data: Object;
    switch(this.searchcategory) {
      case "Ingredients": {
        data = {ingredients:[recipe.keyword]};
        this.recipedata.searchBiIngredients(data).subscribe(res => {
          this.lis = res.recipe;
          if (this.lis.length == 0){
            this.msg = "No Available recipes for your search";
          }else{
            this.msg = "We found "+this.lis.length+" recipes containing "+recipe.keyword;
          }
        });
        break;
      }
      case "Occasions": {
        data = {occasion:[recipe.keyword]};
        this.recipedata.searchBiOccasions(data).subscribe(res => {
          this.lis = res.recipe;
          if (this.lis.length == 0){
            this.msg = "No Available recipes for your search";
          }else{
            this.msg = "We found "+this.lis.length+" recipes for "+recipe.keyword;
          }
        });
        break;
      }
      case "Health Conditions": {
        data = {health:[recipe.keyword]};
        this.recipedata.searchBiHealth(data).subscribe(res => {
          this.lis = res.recipe;
          if (this.lis.length == 0){
            this.msg = "No Available recipes for your search";
          }else{
            this.msg = "We found "+this.lis.length+" recipes good for "+recipe.keyword;
          }
        });
        break;
      }
      default: {
        data = {ingredients:[recipe.keyword]};
        this.recipedata.searchBiIngredients(data).subscribe(res => {
          this.lis = res.recipe;
          if (this.lis.length == 0){
            this.msg = "No Available recipes for your search";
          }else{
            this.msg = "We found "+this.lis.length+" recipes containing "+recipe.keyword;
          }
        });
        break;
      }
    }
    console.log(performance.now()-t);
  }


}
