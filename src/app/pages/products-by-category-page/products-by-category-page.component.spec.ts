import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsByCategoryPageComponent } from './products-by-category-page.component';

describe('ProductsByCategoryPageComponent', () => {
  let component: ProductsByCategoryPageComponent;
  let fixture: ComponentFixture<ProductsByCategoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsByCategoryPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsByCategoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
