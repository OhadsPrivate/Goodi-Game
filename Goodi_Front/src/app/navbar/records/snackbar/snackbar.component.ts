import { Component, Inject, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { WatchRecordsComponent } from '../watch-records/watch-records.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit{
  constructor(@Inject(MAT_SNACK_BAR_DATA) private data : any,
              private dialog : MatDialog,
              private UserService : UserService){}
              
  public snackBarRef = inject(MatSnackBarRef);
  public job_id = "";

  ngOnInit(): void {
    this.job_id = this.data.job_id;
  }

  public dismiss(){
    this.UserService.notificationSeen$.next(true);
    this.UserService.dismissJob(this.job_id).subscribe((res : any) => {
      this.snackBarRef.dismissWithAction();
    },(error => {
      this.UserService.cantReachServerError();
    }));
  }

  public watchRecords(){
    this.UserService.notificationSeen$.next(true);
    this.snackBarRef.dismissWithAction();
    this.dialog.open(WatchRecordsComponent,{data : {job_id : this.job_id}});
  }
}
