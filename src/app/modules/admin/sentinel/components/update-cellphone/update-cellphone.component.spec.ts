import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCellphoneComponent } from './update-cellphone.component';

describe('UpdateCellphoneComponent', () => {
  let component: UpdateCellphoneComponent;
  let fixture: ComponentFixture<UpdateCellphoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCellphoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCellphoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
