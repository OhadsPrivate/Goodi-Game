import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RecordsDialogComponent } from './records-dialog/records-dialog.component';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { SnackbarComponent } from './snackbar/snackbar.component';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit, OnDestroy{
  constructor(private UserService : UserService,
              private dialog : MatDialog,
              private snackBar : MatSnackBar){}

  private notificationsInterval : any;

  openSnackBar(job_id : string){
    this.snackBar.openFromComponent(SnackbarComponent, {
      data : { job_id : job_id },
      duration : 10 * 1000,
      panelClass : ['snackbar-custom'],
      verticalPosition: this.UserService.verticalNotificationPosition
    });
  }

  checkForCompletedJobNotification(){
    this.UserService.checkForCompletedJobNotification().subscribe((res : any) => {
      if(res["job_id"])
      {
        this.openSnackBar(res["job_id"]);
      }
    }, (error) => {
      this.UserService.cantReachServerError();
    });
  }

  ngOnInit(): void {
    this.notificationsInterval = setInterval(() => this.checkForCompletedJobNotification(), 1000);
  }

  openRecordsDialog(){
    this.dialog.open(RecordsDialogComponent);
  }

  ngOnDestroy(): void {
    clearInterval(this.notificationsInterval);
    this.dialog.closeAll();
    this.snackBar.dismiss();
  }
}
