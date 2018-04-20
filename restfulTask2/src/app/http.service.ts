import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) { }

  getChores(){
  return this._http.get('/chores')
  }

  addChore(newchore){
  console.log("this is the New Chore", newchore)
  return this._http.post('/chores', newchore)
  }

  findChore(id){
   console.log(id)
   	return this._http.get('/chores/'+id)
   }
}
