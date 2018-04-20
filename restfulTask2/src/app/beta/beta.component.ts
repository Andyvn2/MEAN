import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-beta',
  templateUrl: './beta.component.html',
  styleUrls: ['./beta.component.css']
})
export class BetaComponent implements OnInit {
	editChore = [];
	chores: any;
	Idee: number;
	editChores = [];
  constructor(
  	private _httpService: HttpService,
  	private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
  	this._route.params.subscribe((params: Params) => 
  		this.Idee = params['id']);
  	this.findChore()
  	console.log(this.editChore)
}
  findChore(){
  	let observable = this._httpService.findChore(this.Idee);
    	observable.subscribe( data => {
    	this.editChore = data['data'];
  		})
}
  editSubmit(){
  	console.log('edit Submitted')
  	this._router.navigate(['/']);
  }

}
