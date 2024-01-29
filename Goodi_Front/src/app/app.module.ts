import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from "@angular/common/http"
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgChartjsModule } from 'ng-chartjs';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { GameComponent } from './body/game/game.component';
import { CubeComponent } from './body/game/cube/cube.component';
import { LoginComponent } from './body/login/login.component';
import { SummaryComponent } from './body/game/summary/summary.component';
import { FooterComponent } from './footer/footer.component';
import { BodyComponent } from './body/body.component';
import { MyLastTurnsComponent } from './body/game/my-last-turns/my-last-turns.component';
import { MyLuckyNumberComponent } from './body/game/my-lucky-number/my-lucky-number.component';
import { RecordsDialogComponent } from './navbar/records/records-dialog/records-dialog.component';
import { BackToGameComponent } from './body/back-to-game/back-to-game.component';
import { LoadingComponent } from './body/loading/loading.component';
import { ReversePipe } from './body/game/my-last-turns/reverse.pipe';
import { RecordsComponent } from './navbar/records/records.component';
import { SnackbarComponent } from './navbar/records/snackbar/snackbar.component';
import { WatchRecordsComponent } from './navbar/records/watch-records/watch-records.component';
import { RecordsLuckyNumberComponent } from './navbar/records/watch-records/records-lucky-number/records-lucky-number.component';
import { GameListComponent } from './navbar/records/watch-records/game-list/game-list.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    GameComponent,
    CubeComponent,
    LoginComponent,
    SummaryComponent,
    FooterComponent,
    BodyComponent,
    MyLastTurnsComponent,
    MyLuckyNumberComponent,
    RecordsDialogComponent,
    BackToGameComponent,
    LoadingComponent,
    ReversePipe,
    RecordsComponent,
    SnackbarComponent,
    WatchRecordsComponent,
    RecordsLuckyNumberComponent,
    GameListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    NgChartjsModule,
    MatIconModule,
    MatDialogModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
