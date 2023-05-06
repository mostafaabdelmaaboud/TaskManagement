import { Component, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public translate = inject(TranslateService)
  currentLang: string = "en"
  constructor() {
    this.currentLang = localStorage.getItem("currentLang") || "en";
    this.translate.use(this.currentLang);
    this.translate.setDefaultLang(this.currentLang);
    document.documentElement.lang = localStorage.getItem("currentLang") || "ltr"
    if (localStorage.getItem("currentLang")) {
      document.documentElement.dir = localStorage.getItem("currentLang") == "ar" ? "rtl" : "ltr";
    } else {
      document.documentElement.dir = "ltr";
    }
  }
}
