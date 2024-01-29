import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-back-to-game',
  templateUrl: './back-to-game.component.html',
  styleUrls: ['./back-to-game.component.scss']
})
export class BackToGameComponent implements OnInit{
  constructor(private UserService : UserService,
              private ref : ChangeDetectorRef){}

  public username : string = "";
  public disabledButtons : boolean = false;

  ngOnInit(): void {
    this.username = this.UserService.username;
  }
  rollTheDice(){
    this.UserService.inGame$.next(true);
  }
  startOver(){
    this.disabledButtons = true;
    this.ref.detectChanges();
    this.UserService.finishGame().subscribe((res : any) => {
    },(error) => {
      this.UserService.cantReachServerError();
    },() => {
      this.UserService.inGame$.next(true);
    });
  }
  logout(){
    this.disabledButtons = true;
    this.ref.detectChanges();
    this.UserService.logout().subscribe(res => {
      window.location.reload();
    },(error) => {
      this.UserService.cantReachServerError();
    });
  }
}
