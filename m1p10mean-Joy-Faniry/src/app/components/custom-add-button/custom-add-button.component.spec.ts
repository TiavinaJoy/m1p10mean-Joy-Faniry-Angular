import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomAddButtonComponent } from './custom-add-button.component';

describe('CustomAddButtonComponent', () => {
  let component: CustomAddButtonComponent;
  let fixture: ComponentFixture<CustomAddButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomAddButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomAddButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
