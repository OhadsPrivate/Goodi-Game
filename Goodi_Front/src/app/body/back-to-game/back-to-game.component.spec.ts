import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackToGameComponent } from './back-to-game.component';

describe('BackToGameComponent', () => {
  let component: BackToGameComponent;
  let fixture: ComponentFixture<BackToGameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BackToGameComponent]
    });
    fixture = TestBed.createComponent(BackToGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
