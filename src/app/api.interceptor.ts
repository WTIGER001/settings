import { Injectable } from "@angular/core";
import { HttpRequest, HttpInterceptor, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from 'rxjs/Observable'

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Apply the headers
        req = req.clone({
            setHeaders: {
                'ApiToken': '234567890'
            }
        });

        // return next.handle(req)
        return next.handle(req).pipe(
            // do( (x , err) => {
            //     // Handle this err
            //     console.error(`Error performing request, status code = ${err.status}`);
            // })
            // catch(err =>  {
            //     console.error(`Error performing request, status code = ${err.status}`);

            // })
        );
    }
}