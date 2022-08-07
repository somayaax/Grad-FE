// import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
// import { AuthService } from "./auth.service";

// export class MyInterceptor implements HttpInterceptor {
//     constructor(private authService: AuthService) { }

//     intercept(req: HttpRequest<any>, next: HttpHandler) {
//         const authToken = this.authService.getToken();
//         req = req.clone({
//             setHeaders: {
//                 Authorization: "Bearer " + authToken
//             }
//         });
//         return next.handle(req);
//     }
// }