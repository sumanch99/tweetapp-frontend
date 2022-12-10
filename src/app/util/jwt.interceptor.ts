import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { AuthService } from '../service/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to api url
        const currentUser = this.authenticationService.currentUserValue;
        const isLoggedIn = currentUser && currentUser.token;
        // console.log(this.authenticationService.token)
        const isApiUrl = request.url.startsWith(environment.apiUrl);
        // console.log("In interseptor")
        if (localStorage.getItem('currentUser') != null) {
            request = request.clone({
                setHeaders: {
                    'Content-Type': 'application/json',
                    'x-auth-token': `Bearer ${this.authenticationService.token}`
                }
            });
        }
        console.log(request)

        return next.handle(request);
    }
}