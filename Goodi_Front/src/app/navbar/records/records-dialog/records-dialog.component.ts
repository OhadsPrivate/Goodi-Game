import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-records-dialog',
  templateUrl: './records-dialog.component.html',
  styleUrls: ['./records-dialog.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class RecordsDialogComponent implements OnInit, OnDestroy{

  constructor(private UserService : UserService,
              private ref : ChangeDetectorRef,
              private snackBar : MatSnackBar){}

  public radioOption : string = "ME";
  public otherUser : string = "";
  public jobInfo : any = {status : "", msg : ""};

  private notificationSeen$ : any;
  
  clearError(){
    this.jobInfo = {status : "", msg : ""};
    this.ref.detectChanges();
  }

  ngOnInit(): void {
    this.notificationSeen$ = this.UserService.notificationSeen$.subscribe((seen : boolean) => {
      this.clearError();
    });
  }

  public insertJob(){
    this.clearError();
    this.UserService.insertJob(this.radioOption == "ME" ? "ME" : this.otherUser).subscribe((res : any) => {
      if(res["job"]["status"] == "PENDING")
      {
        this.jobInfo.status = "PENDING";
        this.jobInfo.msg = "Your last request is still in progress";
      }
      else if(res["job"]["status"] == "UNSEEN")
      {
        this.jobInfo.status = "UNSEEN";
        this.jobInfo.msg = "Your last request is still waiting for you";
        this.snackBar.openFromComponent(SnackbarComponent, {
          data : { job_id : res["job"]["job_id"] },
          duration : 10 * 1000,
          panelClass : ['snackbar-custom'],
          verticalPosition: this.UserService.verticalNotificationPosition
        });
      }
      else if(res["job"]["status"] == "USER_NOT_EXISTS")
      {
        console.log(res);
        this.jobInfo.status = "USER_NOT_EXISTS";
        this.jobInfo.msg = "The user doesn't exists";
      }
      else if(res["job"]["status"] == "SENT")
      {
        this.jobInfo.status = "SENT";
        this.jobInfo.msg = "Your request has been successfully sent, you will be notified when the results are ready.";
      }
    },(error) => {
      this.UserService.cantReachServerError();
    },() => {
      this.ref.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.notificationSeen$.unsubscribe();
  }
}
