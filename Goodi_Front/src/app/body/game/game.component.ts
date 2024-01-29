import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { cube } from './cube';
import { ConfettiService } from 'src/app/services/confetti.service';

const MINIMUM_TURNS = 10;

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class GameComponent implements OnInit{ 

  constructor( private UserService : UserService,
               private ref : ChangeDetectorRef,
               private ConfettiService : ConfettiService ){}

  readonly MINIMUM_TURNS = MINIMUM_TURNS;

  public disabledButtons : boolean = true;

  public currentDice : cube[] = [];
  public currentTurnIndex = this.UserService.currentTurnIndex;
  
  async ngOnInit(): Promise<void> {
    this.UserService.initGame();
    if(!this.UserService.isDemoMode)
    {
      await this.loadSavedGame();
    }
    this.startGame();
  }

  loadSavedGame() : Promise<void>{
    return new Promise<void>((resolve) => {
      this.UserService.loadCurrentGameResults().subscribe((turns : any[]) => {
      turns.forEach((turn : any) => {
        this.UserService.currentDice = turn["cubes"].map((value : number) => new cube(value));
        this.UserService.myLastTurns.push(this.UserService.currentDice);
        this.UserService.currentTurnIndex += 1;
        this.UserService.turnsChanged$.next(true);
      })
      },(error) => {
        this.UserService.cantReachServerError();
      },() => {
        resolve();
      });
    });
  }

  cubesAreReady(){
    this.UserService.diceChanged$.next(true);
    this.currentDice = this.UserService.currentDice;
    this.currentTurnIndex = this.UserService.currentTurnIndex;
    this.ref.detectChanges();
    
    setTimeout(() => {
      this.UserService.myLastTurns.push(this.UserService.currentDice.map(cube => ({...cube})));
      this.UserService.turnsChanged$.next(true);
      this.disabledButtons = false;
      this.ref.detectChanges();
    }, 1000);
  }

  rollTheDiceOnClientSide()
  {
    this.UserService.currentTurnIndex += 1;
    this.UserService.currentDice.forEach((cube : cube) => {
      cube.value = Math.floor(Math.random() * 6) + 1;
    });
    this.cubesAreReady();
  }
  
  rollTheDiceOnServerSide(){
    this.UserService.rollTheDiceOnServerSide().subscribe((res : any) => {
      this.UserService.currentTurnIndex += 1;
      this.UserService.currentDice.forEach((cube : cube, index) => {
        cube.value = res["cubes"][index];
      });
      this.cubesAreReady();
    },(error) => {
      this.UserService.cantReachServerError();
    });
  }

  rollTheDice() {
    this.disabledButtons = true;
    this.ref.detectChanges();
    if(this.UserService.isDemoMode)
    {
      this.rollTheDiceOnClientSide();
    }
    else
    {
      this.rollTheDiceOnServerSide();
    }
  }

  startGame(){
    this.UserService.startGame$.next(true);
    this.currentDice = this.UserService.currentDice;
    this.ref.detectChanges();
    setTimeout(() => {
      this.rollTheDice();
    }, 50);
  }

  calculateWinner() : Promise<void>{
    return new Promise((resolve) => {
      this.UserService.finishGame().subscribe((res : any) => {
        if(res["Luckiest"] == "true")
        {
          this.ConfettiService.startConfetti(3);
        }
        else
        {
          alert(":(");
        }
      },(error) => {
        this.UserService.cantReachServerError();
      },() => {
        resolve();
      });
    });
  }

  async finishGame(){
    this.disabledButtons = true;
    this.ref.detectChanges();
    if(!this.UserService.isDemoMode)
    {
      await this.calculateWinner();
    }
    this.UserService.initGame();
    this.startGame();
  }
}
