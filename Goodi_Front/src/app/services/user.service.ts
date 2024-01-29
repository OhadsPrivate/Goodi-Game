import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { cube } from '../body/game/cube';
import { MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

const NUMBER_OF_DICE = 6;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private ApiService : ApiService) { }

  public username : string = "";

  public inGame$ : Subject<boolean> = new BehaviorSubject<boolean>(false);
  public startGame$ : Subject<boolean> = new BehaviorSubject<boolean>(false);

  public isDemoMode : boolean = false;

  public currentDice : cube[] = [];
  public diceChanged$ : Subject<boolean> = new BehaviorSubject<boolean>(false);

  public currentTurnIndex : number = 0;

  public myLastTurns : cube[][] = [];
  public turnsChanged$ : Subject<boolean> = new BehaviorSubject<boolean>(false);

  public error$ : Subject<string> = new BehaviorSubject<string>("");

  public notificationSeen$ : Subject<boolean> = new BehaviorSubject<boolean>(false);
  public verticalNotificationPosition : MatSnackBarVerticalPosition = 'top';

  cantReachServerError(){
    this.username = "";
    this.inGame$.next(false);
    this.error$.next("Can't reach the server");
  }

  amILoggedIn()
  {
    return this.ApiService.amILoggedIn();
  }

  login(username : string, password : string, recaptcahToken : string)
  {
    return this.ApiService.login(username,password,recaptcahToken);
  }

  logout()
  {
    return this.ApiService.logout();
  }

  initDemoMode(){
    this.username = "guest";
    this.isDemoMode = true;
  }

  initCurrentDice()
  {
    this.currentDice = Array.from({ length : NUMBER_OF_DICE}, () => new cube());
    this.diceChanged$.next(true);
  }

  initGame(){
    this.initCurrentDice();
    this.myLastTurns = [];
    this.turnsChanged$.next(true);
    this.currentTurnIndex = 0;
  }

  loadCurrentGameResults()
  {
    return this.ApiService.loadCurrentGameResults();
  }

  rollTheDiceOnServerSide() {
    return this.ApiService.rollTheDice();
  }

  finishGame() {
    return this.ApiService.finishGame();
  }

  insertJob(username : string) {
    return this.ApiService.insertJob(username);
  }

  checkForCompletedJobNotification() {
    return this.ApiService.checkForCompletedJobNotification();
  }

  watchJob(job_id : string) {
    return this.ApiService.watchJob(job_id);
  }

  dismissJob(job_id : string) {
    return this.ApiService.dismissJob(job_id);
  }
}
