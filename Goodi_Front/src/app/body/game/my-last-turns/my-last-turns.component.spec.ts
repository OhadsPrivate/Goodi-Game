import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyLastTurnsComponent } from './my-last-turns.component';

describe('MyLastTurnsComponent', () => {
  let component: MyLastTurnsComponent;
  let fixture: ComponentFixture<MyLastTurnsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyLastTurnsComponent]
    });
    fixture = TestBed.createComponent(MyLastTurnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
