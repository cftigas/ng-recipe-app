import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import 'firebase/auth';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loadedFeature = 'recipe';

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }

  ngOnInit(){
  	firebase.initializeApp({
  		apiKey: "AIzaSyBPGxasei31D7h34s7liARLVVIrFYgNwzg",
    	authDomain: "ng-recipe-book-d20f4.firebaseapp.com"
  	});
  }

}
