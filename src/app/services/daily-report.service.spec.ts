import { TestBed } from '@angular/core/testing'

import { DailyReportsService } from './daily-report.service'

describe("DailyReportService", () => {
  let service: DailyReportsService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(DailyReportsService)
  })

  it("should be created", () => {
    expect(service).toBeTruthy()
  })
})
