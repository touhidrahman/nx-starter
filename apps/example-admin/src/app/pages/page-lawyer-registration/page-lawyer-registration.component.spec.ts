import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageLawyerRegistrationComponent } from './page-lawyer-registration.component';

describe('PageLawyerRegistrationComponent', () => {
  let component: PageLawyerRegistrationComponent;
  let fixture: ComponentFixture<PageLawyerRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageLawyerRegistrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageLawyerRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
