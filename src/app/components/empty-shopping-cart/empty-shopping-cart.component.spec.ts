import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyShoppingCartComponent } from './empty-shopping-cart.component';

describe('EmptyShoppingCartComponent', () => {
  let component: EmptyShoppingCartComponent;
  let fixture: ComponentFixture<EmptyShoppingCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmptyShoppingCartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmptyShoppingCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
