import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DailyReportPageComponent } from './daily-report-page.component'

describe("DailyReportPagesComponent", () => {
  let component: DailyReportPageComponent
  let fixture: ComponentFixture<DailyReportPageComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DailyReportPageComponent]
    }).compileComponents()

    fixture = TestBed.createComponent(DailyReportPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
