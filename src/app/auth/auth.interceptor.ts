import { HttpInterceptorFn } from '@angular/common/http';



export const authInterceptor: HttpInterceptorFn = (req, next) => {
 const token = localStorage.getItem('token');
   console.log("Interceptor ", token);
   if (token) {
    const authReq = req.clone({
     setHeaders: {
      Authorization: `Bearer ${token}`
    }
   })
   return next(authReq);
   }
   
   return next(req)
};

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     const authToken = localStorage.getItem('token');
    
//     if (authToken) {
//       const clonedReq = req.clone({
//         setHeaders: {
//           Authorization: `Bearer ${authToken}`
//         }
//       });
//       return next.handle(clonedReq);
//     }
    
//     return next.handle(req);
//   }
// }