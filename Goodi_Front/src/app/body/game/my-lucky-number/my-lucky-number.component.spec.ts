import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyLuckyNumberComponent } from './my-lucky-number.component';

describe('MyLuckyNumberComponent', () => {
  let component: MyLuckyNumberComponent;
  let fixture: ComponentFixture<MyLuckyNumberComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyLuckyNumberComponent]
    });
    fixture = TestBed.createComponent(MyLuckyNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
