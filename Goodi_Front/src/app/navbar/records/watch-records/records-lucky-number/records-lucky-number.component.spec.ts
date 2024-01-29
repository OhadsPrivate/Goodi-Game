import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordsLuckyNumberComponent } from './records-lucky-number.component';

describe('RecordsLuckyNumberComponent', () => {
  let component: RecordsLuckyNumberComponent;
  let fixture: ComponentFixture<RecordsLuckyNumberComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecordsLuckyNumberComponent]
    });
    fixture = TestBed.createComponent(RecordsLuckyNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
