import { ComponentFixture, TestBed, async, fakeAsync, tick } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';



describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: (http: HttpClient) => new TranslateHttpLoader(http, 'assets/i18n/', '.json'),
            deps: [HttpClient]
          }
        }),
        HttpClientModule
      ],
      declarations: [
        LoginComponent
      ]
    })
      .compileComponents();
  }));
  beforeEach(() => {

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });
  it('#selectChange() check attr HTML and currentLang inside localStorage', () => {
    component.selectChange({ value: "ar" })
    expect(document.documentElement.dir).toEqual("rtl");
    expect(localStorage.getItem("currentLang")).toEqual("ar");

    component.selectChange({ value: "en" })
    expect(document.documentElement.dir).toEqual("ltr");


  });
  it('#changeLanguageSelect() check on property selectedLang', () => {
    component.changeLanguageSelect("ar");
    expect(component.langs).toEqual([
      { value: 'ar', viewValue: 'عربي' },
      { value: 'en', viewValue: 'انجليزي' },
    ])
    component.changeLanguageSelect("en")
    expect(component.langs).toEqual([
      { value: 'ar', viewValue: 'Arabic' },
      { value: 'en', viewValue: 'English' },
    ])

  });
});

