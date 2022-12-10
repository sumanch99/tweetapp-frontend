import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ForgotPassword } from '../model/Forgotpassword';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {

  loading = false;
  submitted = false;
  error = false;
  forgot!: ForgotPassword;
  forgotPasswordButtonText!: string;
  clicked = false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService) {
      // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/login']);
      }
     }

  ngOnInit(): void {
    this.forgotPasswordButtonText = "Change Password";
  }

  submit(f: any) {
    console.log(f);
    this.clicked = true;
    this.forgotPasswordButtonText = "Submitting...";
    this.forgot = f.value
    this.authenticationService.forgotPassword(this.forgot)
      .pipe()
      .subscribe(
        res => {
          this.forgotPasswordButtonText = "Change Password";
          this.clicked = false;
          console.log("response is" + res)
          if (res.status == 200 && res.data != null) {
            Swal.fire('Done!', res.message, 'success');
            this.router.navigate(['/login']);

          }
          else {
            this.forgotPasswordButtonText = "Change Password";
            console.log(res);
            Swal.fire('Error !!', res, 'error');
          }
          console.log(res)
        },
        error => {
          Swal.fire('Error !!', error, 'error');
          this.forgotPasswordButtonText = "Change Password";
          console.log(error)
          this.clicked = false;
        }
      )
  }

}
