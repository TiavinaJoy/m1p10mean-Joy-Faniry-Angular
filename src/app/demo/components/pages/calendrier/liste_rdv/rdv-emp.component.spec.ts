import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdvEmpComponent } from './rdv-emp.component';

describe('RdvEmpComponent', () => {
  let component: RdvEmpComponent;
  let fixture: ComponentFixture<RdvEmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RdvEmpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RdvEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
