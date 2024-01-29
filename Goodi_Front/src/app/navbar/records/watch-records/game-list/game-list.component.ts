import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { game } from '../game';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent {

  constructor(private UserService : UserService,
              private ref : ChangeDetectorRef){}

  @Input() public username : string = "";
  @Input() games : game[] = [];

  ngOnInit(): void {
    this.username = this.UserService.username == this.username ? 'My' : this.username + "'s";
  }
}
