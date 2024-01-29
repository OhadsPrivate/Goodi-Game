import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { cube } from '../cube';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-my-lucky-number',
  templateUrl: './my-lucky-number.component.html',
  styleUrls: ['./my-lucky-number.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyLuckyNumberComponent implements OnInit, OnDestroy{
  constructor(private UserService : UserService,
              private ref : ChangeDetectorRef){}
    
  public chart : any;
  private chartData : number[] = [0,0,0,0,0,0];

  private startGame$ : any;
  private turnsChanged$ : any;
  
  createChart(){
    this.chart = new Chart("chart", {
      type : 'bar',
      data : {
        labels: ['1','2','3','4','5','6'],
        datasets: [{
          label : "Luck",
          data: this.chartData,
          backgroundColor: '#f25f5c'
        }]
      },
      options: {
        aspectRatio:1.5,
        maintainAspectRatio: false
      }
    });
  }
  
  ngOnInit(): void {
    this.createChart();
    this.startGame$ = this.UserService.startGame$.subscribe((newGameStarted : boolean) => {
      if(this.UserService.currentTurnIndex == 0)
      {
        this.chartData.forEach((cube : number, index) => {
          this.chartData[index] = 0;
        });
      }
    });
    this.turnsChanged$ = this.UserService.turnsChanged$.subscribe((changed : boolean) => {
      this.UserService.currentDice.forEach((cube : cube) => {
        this.chartData[cube.value - 1] += 1;
      });
      this.chart.update();
      this.ref.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.startGame$.unsubscribe();
    this.turnsChanged$.unsubscribe();
  }
}
