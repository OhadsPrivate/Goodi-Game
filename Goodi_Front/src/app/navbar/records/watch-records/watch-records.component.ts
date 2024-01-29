import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { game } from './game';

@Component({
  selector: 'app-watch-records',
  templateUrl: './watch-records.component.html',
  styleUrls: ['./watch-records.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class WatchRecordsComponent implements OnInit{
  constructor(@Inject(MAT_DIALOG_DATA) private data : any,
              private UserService : UserService,
              private ref : ChangeDetectorRef,
              private dialogRef : MatDialogRef<WatchRecordsComponent>){}

  public target : string = "";
  public games : game[] = null as any;

  ngOnInit(): void {
    this.UserService.watchJob(this.data.job_id).subscribe((res : any) => {
      if(res["job"])
      {
        this.target = res["job"]["target"] ;
        this.games = res["job"]["games"];
        this.ref.detectChanges();
      }
      else
      {
        this.dialogRef.close();
      }
    }, (error => {
      this.UserService.cantReachServerError();
    }));
  }
}
