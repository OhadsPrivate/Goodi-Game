import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

 const _LOGIN_INPUT_REGEX = new RegExp(/^[a-zA-Z\u0590-\u05fe0-9'&\s.@"]{4,16}$/i);
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, OnDestroy{

  constructor(private UserService : UserService,
              private ref : ChangeDetectorRef){}

  public username : string = "";
  public password : string = "";
  private recaptcahToken : string = "";
  public loading : boolean = false;
  public error : string = "";
  
  private error$ : any;

  ngOnInit(): void {
    this.error$ = this.UserService.error$.subscribe((error : string) => {
      this.error = error;
      this.loading = false;
      this.ref.detectChanges();
    });
  }

  clearError(){
    this.error = "";
    this.loading = false;
    this.ref.detectChanges();
  }

  login(){
    this.loading = true;
    this.ref.detectChanges();
    if(!_LOGIN_INPUT_REGEX.test(this.username) || !_LOGIN_INPUT_REGEX.test(this.password))
    {
      this.UserService.error$.next("Username or password are illegal.");
      return;
    }
    this.UserService.login(this.username,this.password,this.recaptcahToken).subscribe((res : any) => {
      if(res["Logged_In"] == "true")
      {
        this.UserService.inGame$.next(true);
      }
      else{
        this.UserService.error$.next("Username or password are incorrect.");
      }
    },(error) => {
      this.UserService.cantReachServerError();
    });
  }

  startDemoMode(){
    this.UserService.initDemoMode();
    this.UserService.inGame$.next(true);
  }

  ngOnDestroy(): void {
    this.error$.unsubscribe();
  }
}
