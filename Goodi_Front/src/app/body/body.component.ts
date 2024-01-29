import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BodyComponent implements OnInit, OnDestroy{
  constructor(private UserService : UserService,
              private ref : ChangeDetectorRef){}

  public onLoad : boolean = true;
  public loggedIn : boolean = false;
  public inGame : boolean = false;

  private inGame$ : any;
  private error$ : any;
  
  ngOnInit(): void {
    this.UserService.amILoggedIn().subscribe((res : any) => {
      if(res["Logged_In"] == "true")
      {
        this.loggedIn = true;
        this.UserService.username = res["Username"];
      }
      else {
        this.loggedIn = false;
      }
    },(error) => {
      setTimeout(() => {
        this.onLoad = false;
        this.ref.detectChanges();
        this.UserService.cantReachServerError();
      }, 500);
    },() => {
      setTimeout(() => {
        this.onLoad = false;
        this.ref.detectChanges();
      }, 500);
    });

    this.inGame$ = this.UserService.inGame$.subscribe((inGame : boolean) => {
      this.inGame = inGame;
      this.ref.detectChanges();
    });

    this.error$ = this.UserService.error$.subscribe((error : string) => {
      this.loggedIn = false;
      this.ref.detectChanges();
    });
  }
  ngOnDestroy(): void {
    this.inGame$.unsubscribe();
    this.error$.unsubscribe();
  }
}
