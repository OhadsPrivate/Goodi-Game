import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { cube } from '../cube';

@Component({
  selector: 'app-my-last-turns',
  templateUrl: './my-last-turns.component.html',
  styleUrls: ['./my-last-turns.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyLastTurnsComponent implements OnInit, OnDestroy{
  constructor(private UserService : UserService,
              private ref : ChangeDetectorRef){}

  public myLastTurns : cube[][] = [];

  private turnsChanged$ : any;

  ngOnInit(): void {
    this.turnsChanged$ = this.UserService.turnsChanged$.subscribe((changed : boolean) => {
      this.myLastTurns = this.UserService.myLastTurns;
      this.ref.detectChanges();
    });
  }
  ngOnDestroy(): void {
    this.turnsChanged$.unsubscribe();
  }
}
