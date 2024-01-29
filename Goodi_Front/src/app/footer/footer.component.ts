import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class FooterComponent implements OnInit{
  constructor(private UserService : UserService,
              private ref : ChangeDetectorRef){}

  public inGame : boolean = false;

  ngOnInit(): void {
    this.UserService.inGame$.subscribe((inGame : boolean) => {
      this.inGame = inGame;
      this.ref.detectChanges();
    });
  }
}
