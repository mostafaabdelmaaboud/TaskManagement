import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService, TranslateStore } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { AuthState } from '../../store/state/login.state';
import { Observable } from 'rxjs';
import { Login } from '../../store/actions/login.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [TranslateStore]
})
export class LoginComponent implements OnInit {
  isLoading = false;

  @ViewChild('dangerTpl') danger!: ElementRef;
  @Select(AuthState.getAuthLogin) stateAuth$!: Observable<String | null>;
  @Select(AuthState.loginIsSuccess) stateisSuccess$!: Observable<boolean>;
  @Select(AuthState.loginIsError) stateisError$!: Observable<string | null>;
  @Select(AuthState.loginIsLoading) stateisLogin$!: Observable<boolean>;
  selectedLang: string = "en";
  loginForm!: FormGroup;
  langs = [
    { value: 'ar', viewValue: 'Arabic' },
    { value: 'en', viewValue: 'English' },
  ];
  public translate = inject(TranslateService);
  private fb = inject(FormBuilder);
  private store = inject(Store);

  constructor() {
    this.selectedLang = localStorage.getItem("currentLang") || "en";
    this.changeLanguageSelect(this.selectedLang);
    this.translate.setDefaultLang(this.selectedLang);
    this.translate.use(this.selectedLang);
    this.createForm()
  }
  createForm() {
    this.loginForm = this.fb.group(
      {
        email: ["", [
          Validators.required,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
        ]],
        password: ["", [
          Validators.required,
          // Validators.pattern("^[a-zA-Z]{2}[a-zA-Z0-9]{6,14}$")
          Validators.pattern("^[a-zA-Z0-9]{2}[a-zA-Z0-9]{6,14}$")
        ]],
        role: ["admin"]
      }
    )
  }
  get f() {
    return this.loginForm.controls;
  }
  ngOnInit(): void {
    this.stateisLogin$.subscribe(load => {
      this.isLoading = load;
    })
    this.stateAuth$.subscribe(token => {
      console.log("token", token)
    });
    this.stateisSuccess$.subscribe(sucess => {
      debugger;

      if (sucess) {
        this.loginForm.reset()
      }
    })
    this.stateisError$.subscribe(error => {
      if (error) {
      }
    })
  }
  formGet(fonrmControl: string) {
    return this.loginForm.get(fonrmControl);
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
  login() {
    debugger;
    if (this.loginForm.valid && !this.isLoading) {
      this.store.dispatch(new Login(this.loginForm.value)).subscribe(res => {
        console.log(res);
      })
    }
  }
}
