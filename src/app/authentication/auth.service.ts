import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from './auth-response.model';
import { BehaviorSubject, Subject, catchError, tap, throwError } from 'rxjs';
import { User } from './user.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  api_key = environment.api_key;
  user = new BehaviorSubject<User|null>(null);

  constructor(private http : HttpClient) { }

  register(email : string, password : string){
    return this.http.post<AuthResponse>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + this.api_key, {
      email : email,
      password : password,
      returnSecureToken : true
    }).pipe(
      tap(response => {
        this.handleUser(response.email, response.localId, response.idToken, response.expiresIn);
      }),
      catchError(this.handleError)
    );
  }

  login(email : string, password : string){
    return this.http.post<AuthResponse>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + this.api_key, {
      email : email,
      password : password,
      returnSecureToken : true
    }).pipe(
      tap(response => {
        this.handleUser(response.email, response.localId, response.idToken, response.expiresIn);
      }),
      catchError(this.handleError)
    );;
  }

  autoLogin(){
    if(localStorage.getItem("user") == null)
      return ;

    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const loadedUser = new User(user.email, user.id, user._token, new Date(user._tokenExpirationDate));

    if(loadedUser.token)
      this.user.next(loadedUser);
  }

  logout(){
    this.user.next(null);
    localStorage.removeItem("user");
  }

  private handleError(err : HttpErrorResponse){
    let message = "Hata oluştu !";

    if(err.error.error){
      switch(err.error.error.message){

        case "EMAIL_EXISTS":
          message = "Mail zaten kullanılıyor başka bir mail ile kayıt deneyin !"
          break;

        case "TOO_MANY_ATTEMPTS_TRY_LATER":
          message = "Çok fazla deneme yaptığınız için bir süre beklemeniz gerekiyor :/"
          break;

        case "EMAIL_NOT_FOUND":
          message = "Bu mail adresiyle alakalı kayıt bulunamadı !"
          break;

        case "INVALID_PASSWORD":
          message = "Parolanız yanlış kontrol edip tekrar deneyin !"
          break;

        case "INVALID_LOGIN_CREDENTIALS":
          message = "Giriş için kullandığınız bilgiler yanlış , kontrol edip tekrar deneyin !";
          break;

        }
    }

    return throwError (() => message);
  }

  private handleUser(email : string, localId : string, idToken : string, expiresIn : string){
    const expirationDate = new Date(new Date().getTime() + (+expiresIn * 1000)) // + stringin önüne gelirse number tipine dönüştürür.

    const user = new User(
      email,
      localId,
      idToken,
      expirationDate
    );

      console.log(user);

    this.user.next(user);

    localStorage.setItem("user", JSON.stringify(user));
  }

}
