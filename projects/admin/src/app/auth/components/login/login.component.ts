import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  selectedLang: string = "en";
  langs = [
    { value: 'ar', viewValue: 'Arabic' },
    { value: 'en', viewValue: 'English' },
  ];
  constructor(public translate: TranslateService) {
    this.selectedLang = localStorage.getItem("currentLang") || "en";
    this.changeLanguageSelect(this.selectedLang);
    this.translate.setDefaultLang(this.selectedLang);

    this.translate.use(this.selectedLang);


  }

  ngOnInit(): void {
  }
  selectChange(selectLang: any) {
    document.documentElement.dir = selectLang.value == "ar" ? "rtl" : "ltr";
    document.documentElement.lang = selectLang.value;
    this.translate.use(selectLang.value);
    localStorage.setItem("currentLang", selectLang.value);
    this.changeLanguageSelect(selectLang.value)
  }
  changeLanguageSelect(lang: string) {
    if (lang === "ar") {
      this.langs = [
        { value: 'ar', viewValue: 'عربي' },
        { value: 'en', viewValue: 'انجليزي' },
      ]
    } else {
      this.langs = [
        { value: 'ar', viewValue: 'Arabic' },
        { value: 'en', viewValue: 'English' },
      ];
    }
  }
}
