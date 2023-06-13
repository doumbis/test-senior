import { Injectable } from '@angular/core';
import { http } from './httpConstant';

@Injectable({
  providedIn: 'root'
})
export class HttpclientService {

  constructor() { }

  Get(path: string){
    return http.get(path);
  }

  Post(path: string, data: any){
    return http.post(path, data);
  }

  writeErrors(errors: any, data: any){
    const keys = Object.keys(errors);
    for(let i = 0; i < keys.length; i++){
      let key = keys[i];
      if(data[key] == undefined){
        errors[key] = undefined;
      }else{
        errors[key] = data[key];
      }
    }
    return errors;
  }
}
