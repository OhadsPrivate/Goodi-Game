import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordsDialogComponent } from './records-dialog.component';

describe('RecordsDialogComponent', () => {
  let component: RecordsDialogComponent;
  let fixture: ComponentFixture<RecordsDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecordsDialogComponent]
    });
    fixture = TestBed.createComponent(RecordsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
