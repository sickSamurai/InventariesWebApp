import { Component, EventEmitter, Output } from '@angular/core'
import { DailyReportsService } from 'src/app/services/daily-report.service'
import { ProductsService } from 'src/app/services/products.service'

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent {
  @Output() menuClicked = new EventEmitter()

  updateReport() {
    this.reportsService.getDailyReport().subscribe()
  }

  setupProductCreation() {
    this.productsService.setMode("creation")
  }

  constructor(private reportsService: DailyReportsService, private productsService: ProductsService) {}
}
