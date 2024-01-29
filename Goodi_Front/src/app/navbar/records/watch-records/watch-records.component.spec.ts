import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchRecordsComponent } from './watch-records.component';

describe('WatchRecordsComponent', () => {
  let component: WatchRecordsComponent;
  let fixture: ComponentFixture<WatchRecordsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WatchRecordsComponent]
    });
    fixture = TestBed.createComponent(WatchRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
