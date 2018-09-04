import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';
import { Recipe } from '../recipes/recipe.model';
import { map } from 'rxjs/operators';
@Injectable()
export class DataStorageService {	
	constructor(private http: Http, 
				private recipeServices: RecipeService,
				private authService: AuthService) {}

	storeRecipes(){
		const token = this.authService.getToken();
		return this.http.put('https://ng-recipe-book-d20f4.firebaseio.com/recipes.json?auth=' + token, this.recipeServices.getRecipes());

	}

	fetchRecipes(){
		const token = this.authService.getToken();

		this.http.get('https://ng-recipe-book-d20f4.firebaseio.com/recipes.json?auth=' + token)
		.pipe(map(
			(response: Response) => {
				const recipes: Recipe[] = response.json();
				for(let recipe of recipes){
					if(!recipe['ingredients']){
						console.log(recipe);
						recipe['ingredients'] = [];
					}
				}	
				return recipes;
			}
		))
		.subscribe(
			(recipes: Recipe[]) => {
				this.recipeServices.setRecipes(recipes);
				console.log(recipes);
			}
		);


	}

}