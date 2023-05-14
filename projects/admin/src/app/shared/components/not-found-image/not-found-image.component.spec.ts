import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFoundImageComponent } from './not-found-image.component';

describe('NotFoundImageComponent', () => {
  let component: NotFoundImageComponent;
  let fixture: ComponentFixture<NotFoundImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ NotFoundImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotFoundImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
