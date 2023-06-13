import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpclientService } from '../httpclient.service';
import { HttpStatusCode } from 'axios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

 
  credentialError = false;
  isLoading = false;
  
  checkoutForm = this.form.group({
    username: '',
    password: ''
  });

  errors = {
    username: undefined,
    password: undefined
  }

  constructor(
    private form: FormBuilder,
    private httpClient: HttpclientService,
    private router: Router
  ) {}

  onSubmit(): void{
    this.errors = this.httpClient.writeErrors(this.errors, {});
    this.isLoading = true;
    this.httpClient.Post('auth/login', this.checkoutForm.value)
    .then(res => {
      localStorage.setItem("token", res.data.access_token);
      this.isLoading = false;
      this.router.navigate(['']);

    })
    .catch(err => {
      this.isLoading = false;
      if(err.response == null){

      }else{
        if(err.response.status == HttpStatusCode.Unauthorized){
          this.credentialError = true;
        }else if(err.response.status == HttpStatusCode.BadRequest){
          this.errors = this.httpClient.writeErrors(this.errors, err.response.data);
        }
      }
      
    })
  }
}
