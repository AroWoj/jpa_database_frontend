import { HttpEvent, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { LoadingService } from '../services/loading.service';
import { inject } from '@angular/core';
import { catchError, Observable, map, of } from 'rxjs';


export const spinnerInterceptor: HttpInterceptorFn = (req, next): Observable<HttpEvent<any>> => {

  const _loading = inject(LoadingService);

  _loading.setLoading(true, req.url);

  return next(req)
    .pipe(catchError((err) => {
      _loading.setLoading(false, req.url);
      console.log('Error in spinner interceptor', err);
      return of(err);
    }))
    .pipe(map<HttpEvent<any>, any>((evt: HttpEvent<any>) => {
      if (evt instanceof HttpResponse) {
        _loading.setLoading(false, req.url);
      }
      console.log('Event in spinner interceptor', req.url);
      return evt;
    }));;
};
