import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit, OnDestroy{
  constructor(private UserService : UserService,
              private ref : ChangeDetectorRef){}

  public inGame : boolean = false;
  public isDemoMode : boolean = false;
  
  private inGame$ : any;
  
  ngOnInit(): void {
    this.inGame$ = this.UserService.inGame$.subscribe((inGame : boolean) => {
      this.inGame = inGame;
      this.isDemoMode = this.UserService.isDemoMode;
      this.ref.detectChanges();
    });
  }

  logout() {
    this.UserService.username = "";
    if(this.UserService.isDemoMode)
    {
      this.UserService.isDemoMode = false;
      this.UserService.inGame$.next(false);
    }
    else
    {
      this.UserService.logout().subscribe(res => {
        window.location.reload();
      },(error) => {
        this.UserService.cantReachServerError();
      });
    }
  }
  
  ngOnDestroy(): void {
    this.inGame$.unsubscribe();
  }
}
