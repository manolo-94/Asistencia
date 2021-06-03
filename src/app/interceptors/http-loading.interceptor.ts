import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { LoadingController } from '@ionic/angular';
import { catchError, delay, map, retryWhen, take, tap } from 'rxjs/operators';

@Injectable()
export class HttpRequestInterceptor  implements HttpInterceptor{

    constructor(private loadingCtrl: LoadingController){ }

    intercept(request:HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        this.loadingCtrl.getTop().then(hasLoading => {
            if(!hasLoading){
                this.loadingCtrl.create({
                    spinner:'circular',
                    translucent:true
                }).then(loading => loading.present());
            }
        });

        return next.handle(request).pipe(
            retryWhen(err => {
                return err.pipe(
                    delay(1000),
                    take(3),
                    tap(() =>{
                        console.log('retry')
                    }),
                    map(error =>{
                        return error
                    })
                )
            })
        );
    }
}
