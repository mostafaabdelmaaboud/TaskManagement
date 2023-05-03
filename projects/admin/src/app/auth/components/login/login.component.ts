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
  langs = [
    { value: 'ar', viewValue: 'Arabic' },
    { value: 'en', viewValue: 'English' },
  ];
  public translate = inject(TranslateService);
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private toastr = inject(ToastrService);
  private router = inject(Router);
  constructor(private error: HandleErrorService) {
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
          this.error.handleError(err);
        }
      );
    }
  }
}
