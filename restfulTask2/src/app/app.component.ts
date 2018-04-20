import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  newChore: any;
  editChore= [];
  chores= [];

constructor(
	private _httpService: HttpService,
	private _route: ActivatedRoute,
	private _router: Router){
  
  }


ngOnInit(){
  this.newChore = {title: "New Title", description: "New Description"};
  this.getChoresFromService()
  
  }

goHome(){
	this._router.navigate(['/home']);
}

onSubmit(){
	console.log("this is the new task", this.newChore)
	let Observable = this._httpService.addChore(this.newChore);
  	Observable.subscribe(data => {
  		console.log ("got Our Task!", data)
  		this.newChore = { title: "New Chore Title", description: "New Chore Description"}

  	})
}

  getChoresFromService(){
  let observable = this._httpService.getChores()
  observable.subscribe( data => {
  console.log("gotOur Data", data)
  this.chores = data['data'];
  })
  }

editButtonClicked(id){
	console.log(id)
}

}



