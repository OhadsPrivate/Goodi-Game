import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { game } from '../game';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-records-lucky-number',
  templateUrl: './records-lucky-number.component.html',
  styleUrls: ['./records-lucky-number.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class RecordsLuckyNumberComponent implements OnInit{
  constructor(private UserService : UserService,
              private ref : ChangeDetectorRef){}
  
  @Input() public username : string = "";
  @Input() games : game[] = [];
  
  public chart : any;
  private chartData : number[] = [0,0,0,0,0,0];
  
  createChart(){
    this.chart = new Chart("recordsChart", {
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
  
  loadGames(){
    this.games.forEach((game : game) => {
      game.turns.forEach((turn : number[]) => {
        turn.forEach((cube : number) => {
          this.chartData[cube - 1] += 1;
        });
      });
    });
  }

  ngOnInit(): void {
    this.username = this.UserService.username == this.username ? 'My' : this.username + "'s";
    this.createChart();
    this.loadGames();
    this.chart.update();
    this.ref.detectChanges();
  }
}
