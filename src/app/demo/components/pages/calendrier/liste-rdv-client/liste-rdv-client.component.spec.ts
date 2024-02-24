import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeRdvClientComponent } from './liste-rdv-client.component';

describe('ListeRdvClientComponent', () => {
  let component: ListeRdvClientComponent;
  let fixture: ComponentFixture<ListeRdvClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeRdvClientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListeRdvClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
