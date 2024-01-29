import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const SERVER_ADDRESS = "http://goodigame.com:5000";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }
  public amILoggedIn() : Observable<any>
  {
    return this.http.get<any>(SERVER_ADDRESS + "/am_i_logged_in",
                             {withCredentials: true});
  }
  public login(username : string, password : string, recaptcahToken : string) : Observable<any>
  {
    return this.http.post<any>(SERVER_ADDRESS + "/login",{
                                username : username,
                                password : password,
                                recaptchaToken : recaptcahToken
                              },{withCredentials: true});
  }
  public logout() : Observable<any> {
    return this.http.get<string>(SERVER_ADDRESS + "/logout",{
                                 withCredentials: true});
  }
  public loadCurrentGameResults() : Observable<any>
  {
    return this.http.get<any[]>(SERVER_ADDRESS + "/load_current_game_results",{
                                withCredentials : true});
  }
  public rollTheDice() : Observable<any>
  {
    return this.http.get<any>(SERVER_ADDRESS + "/roll_the_dice",{
                              withCredentials: true});
  }
  public finishGame() : Observable<any>
  {
    return this.http.get(SERVER_ADDRESS + "/finish_game", {
                         withCredentials: true});
  }
  public insertJob(username : string) : Observable<any>
  {
    return this.http.post(SERVER_ADDRESS + "/insert_job",{
                            username : username
                          }, { withCredentials: true });
  }
  public checkForCompletedJobNotification() : Observable<any>
  {
    return this.http.get(SERVER_ADDRESS + "/check_for_completed_job_notification", {
                         withCredentials: true});
  }
  public watchJob(job_id : string) : Observable<any>
  {
    return this.http.post(SERVER_ADDRESS + "/watch_job",{
                          job_id : job_id
                          },{ withCredentials: true });
  }
  public dismissJob(job_id : string) : Observable<any>
  {
    return this.http.post(SERVER_ADDRESS + "/dismiss_job",{
                          job_id : job_id
                          },{ withCredentials: true });
  }
}
