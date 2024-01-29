import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SummaryComponent implements OnInit, OnDestroy{
  constructor(private UserService : UserService,
              private ref : ChangeDetectorRef){}

  public username = "";
  public currentTurnIndex = this.UserService.currentTurnIndex;

  private diceChanged$ : any;

  ngOnInit(): void {
    this.username = this.UserService.username;
    this.diceChanged$ = this.UserService.diceChanged$.subscribe((changed : boolean) => {
      this.currentTurnIndex = this.UserService.currentTurnIndex;
      this.ref.detectChanges();
    })
  }

  ngOnDestroy(): void {
    this.diceChanged$.unsubscribe();
  }
}
