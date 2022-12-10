import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { User } from '../model/User';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  loading = false;
  submitted = false;
  returnUrl?: string;
  error = '';
  registerData!: User; 
  registerButtonText!:string;
  clicked = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService
  ) { 
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) { 
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.registerButtonText="Register";
  }

  submit(f:any){
    this.clicked = true;
    console.log(f.value)
    this.registerButtonText="Registering ...";
    this.registerData = f.value
    this.authenticationService.register(this.registerData)
      .pipe(first())
      .subscribe(
        res=>{
          this.clicked = false;
          this.registerButtonText="Register";
          console.log(res)
          if(res.status==201){
            Swal.fire("Done",res.message, 'success');
            this.router.navigateByUrl('/login');
          }
          else{
            Swal.fire("Error",res.message, 'error');
          }
          console.log(res)
        },
        error=>{
          this.clicked = false;
          this.registerButtonText="Register";
          console.log(error)
          Swal.fire("Done",error, 'error');
        }
      )
    // window.location.reload();
  }


}