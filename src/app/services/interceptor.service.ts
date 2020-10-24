import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  constructor() { }

  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  intercept(req: HttpRequest<any>, next: HttpHandler): any {
    console.log('paso por el interceptor');
    console.log(req);

    // const headers = new  HttpHeaders({
    //   // tslint:disable-next-line: max-line-length
    // tslint:disable-next-line: max-line-length
    //   'token-usuario': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MDhiNzNhMjA4MWI4NTRiODFmZmEwYjRhOGRiYjZhMSIsInN1YiI6IjVkZjE1NjcwYTI4NGViMDAxMzU4NWYyNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pz-W200RaXXJEHx61VfdMiJ_ENvAl08y-N5_iYU5JfY'
    // });

    // const cloneReq = req.clone({
    //   headers
    // });

    // console.log(cloneReq);
    // return next.handle(req); // Deja pasar todo
    return next.handle(req).pipe(
      catchError(this.manejarErr)
    ); // Deja pasar todo
  }

  manejarErr(err: HttpErrorResponse){
    console.log('ERROR EN EL SERVIDOR');
    console.warn(err);
    return throwError('ERROR PERSONALIZADO');
   }
}
