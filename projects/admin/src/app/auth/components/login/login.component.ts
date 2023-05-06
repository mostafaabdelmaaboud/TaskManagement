import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService, TranslateStore } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { AuthState } from '../../store/state/login.state';
import { Observable } from 'rxjs';
import { Login } from '../../store/actions/login.actions';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { HandleErrorService } from '../../../services/handle-error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLoading = false;

  @ViewChild('dangerTpl') danger!: ElementRef;

  @Select(AuthState.loginIsLoading) stateisLogin$!: Observable<boolean>;
  selectedLang: string = "en";
  loginForm!: FormGroup;
<<<<<<< HEAD

=======
  langs = [
    { value: 'ar', viewValue: 'Arabic' },
    { value: 'en', viewValue: 'English' },
  ];
>>>>>>> 1d7c48d0e3be976f4a475297d7a898e5d4c2c6bd
  public translate = inject(TranslateService);
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private toastr = inject(ToastrService);
  private router = inject(Router);
<<<<<<< HEAD
  langs = [
    { value: 'ar', viewValue: this.translate.instant("login.arabic") },
    { value: 'en', viewValue: this.translate.instant("login.english") },
  ];
  constructor(private error: HandleErrorService, translate: TranslateService) {
    this.selectedLang = localStorage.getItem("currentLang") || "en";
=======
  constructor(private error: HandleErrorService) {
    this.selectedLang = localStorage.getItem("currentLang") || "en";
    this.changeLanguageSelect(this.selectedLang);
>>>>>>> 1d7c48d0e3be976f4a475297d7a898e5d4c2c6bd
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

<<<<<<< HEAD
    this.translate.onLangChange.subscribe((lang) => {
      console.log("lang", lang.translations.login.english);
      this.langs[0].viewValue = lang.translations.login.arabic;
      this.langs[1].viewValue = lang.translations.login.english;

    })
=======


>>>>>>> 1d7c48d0e3be976f4a475297d7a898e5d4c2c6bd
  }
  formGet(fonrmControl: string) {
    return this.loginForm.get(fonrmControl);
  }
  selectChange(selectLang: any) {
    document.documentElement.dir = selectLang.value == "ar" ? "rtl" : "ltr";
    document.documentElement.lang = selectLang.value;
    this.translate.use(selectLang.value);
    localStorage.setItem("currentLang", selectLang.value);
<<<<<<< HEAD
  }

=======
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
>>>>>>> 1d7c48d0e3be976f4a475297d7a898e5d4c2c6bd
  login() {
    if (this.loginForm.valid && !this.isLoading) {
      this.store.dispatch(new Login(this.loginForm.value)).subscribe(
        res => {
          this.loginForm.reset();
          this.toastr.success('Valid Email', 'Success', {
            timeOut: 2000
          });
          localStorage.setItem("token", res.auth.token);
          this.router.navigate(["/dashboard"])
        },
        err => {
          // this.error.handleError(err);
        }
      );
    }
  }
}
