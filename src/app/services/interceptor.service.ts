import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { API } from 'src/config/api';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor() { }

  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  intercept(req: HttpRequest<any>, next: HttpHandler): any {
    console.log('paso por el interceptor');
    console.log(req);

    const token: string = localStorage.getItem('token');
    let request = req;


    // TODO hacer esto con un switch

    if (request.url.includes(API.login)) {
      request = req.clone({
        setHeaders: {
          'x-token': `${ token }`
        }
      });
      return next.handle(request).pipe(
        catchError(this.manejarErr)
      ); // Deja pasar todo
    } else if (request.url.includes(API.create) && token) {
      console.log('user created');
      request = req.clone({
        setHeaders: {
          'x-token': `${ token }`
        }
      });
      return next.handle(request).pipe(
        catchError(this.manejarErr)
      );
    } else if (request.url.includes(API.update) && token) {
      console.log('user created');
      request = req.clone({
        setHeaders: {
          'x-token': `${ token }`
        }
      });
      return next.handle(request).pipe(
        catchError(this.manejarErr)
      );
    } else if (request.url.includes(API.delete) && token) {
      console.log('user created');
      request = req.clone({
        setHeaders: {
          'x-token': `${ token }`
        }
      });
      return next.handle(request).pipe(
        catchError(this.manejarErr)
      );
    } else if (request.url.includes(API.upload) && token) {
      console.log('user created');
      request = req.clone({
        setHeaders: {
          'x-token': `${ token }`
        }
      });
      return next.handle(request).pipe(
        catchError(this.manejarErr)
      );
    } else if (request.url.includes(API.user) && token) {
      // console.log('userrrrrrrrrrrrrrrr');
      // console.log('userrrrrrrrrrrrrrrr ACA');
      request = req.clone({
        setHeaders: {
          'x-token': `${ token }`
        }
      });
      return next.handle(request).pipe(
        catchError(this.manejarErr)
      );
    }

  }

  manejarErr(err: HttpErrorResponse){
    console.log('ERROR EN EL SERVIDOR', err);
    console.warn(err);
    return throwError(err);
   }

   async handle(req: HttpRequest<any>, next: HttpHandler){
    try {
      console.log('ERROR EN EL SERVIDOR');
      const token: string = localStorage.getItem('token');
      let request = req;
      if (req.url.includes(API.login) || token) {
        request = req.clone({
          setHeaders: {
            'x-token': `${ token }`
          }
        });
        return next.handle(request).pipe(
          catchError(this.manejarErr)
        ); // Deja pasar todo
      }
    } catch (error) {

    }
   }
}
