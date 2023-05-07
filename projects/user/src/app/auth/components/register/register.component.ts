import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthState } from '../../store/state/login.state';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  isLoading = false;
  isSubmited = false;
  @ViewChild('dangerTpl') danger!: ElementRef;

  @Select(AuthState.loginIsLoading) stateisLogin$!: Observable<boolean>;
  selectedLang: string = "en";
  registerForm!: FormGroup;

  public translate = inject(TranslateService);
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private toastr = inject(ToastrService);
  private router = inject(Router);
  langs = [
    { value: 'ar', viewValue: this.translate.instant("login.arabic") },
    { value: 'en', viewValue: this.translate.instant("login.english") },
  ];
  constructor() {
    this.selectedLang = localStorage.getItem("currentLang") || "en";
    this.translate.setDefaultLang(this.selectedLang);
    this.translate.use(this.selectedLang);
    this.createForm()
  }
  createForm() {
    this.registerForm = this.fb.group(
      {
        username: ["", [
          Validators.required
        ]],
        email: ["", [
          Validators.required,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
        ]],
        passwords: this.fb.group(
          {
            password: ['', [Validators.required]],
            confirm_password: ['', [Validators.required]],
          }, { validators: this.MustMatch('password', 'confirm_password') }
        ),
        role: ["user"]
      }
    )
  }
  get f() {
    return this.registerForm.controls;
  }
  MustMatch(controlName: string, matchingControlName: string) {
    return (group: AbstractControl) => {
      const control = group.get(controlName);
      const matchingControl = group.get(matchingControlName);
      debugger;
      if (!control || !matchingControl) {
        return null;
      }

      // return if another validator has already found an error on the matchingControl
      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return null;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
      return null;
    }
  }
  passwords(pass: string) {
    return this.registerForm.get(['passwords', pass]);
  }
  ngOnInit(): void {
    this.stateisLogin$.subscribe(load => {
      this.isLoading = load;
    })
    this.translate.onLangChange.subscribe((lang) => {
      console.log("lang", lang.translations.login.english);
      this.langs[0].viewValue = lang.translations.login.arabic;
      this.langs[1].viewValue = lang.translations.login.english;

    })
  }
  formGet(fonrmControl: string) {
    return this.registerForm.get(fonrmControl);
  }
  selectChange(selectLang: any) {
    document.documentElement.dir = selectLang.value == "ar" ? "rtl" : "ltr";
    document.documentElement.lang = selectLang.value;
    this.translate.use(selectLang.value);
    localStorage.setItem("currentLang", selectLang.value);
  }
  passwordConfirming(c: FormGroup): any {

    // if (c.get('password').value !== c.get('confirm_password').value) {
    //   return { invalid: true };
    // }
    return { invalid: false };

  }
  register() {
    debugger;
    this.isSubmited = true;

    if (this.registerForm.valid && !this.isLoading) {
      // this.store.dispatch(new Login(this.loginForm.value)).subscribe(
      //   res => {
      //     this.loginForm.reset();
      //     this.toastr.success('Valid Email', 'Success', {
      //       timeOut: 2000
      //     });
      //     localStorage.setItem("token", res.auth.token);
      //     this.router.navigate(["/dashboard"])
      //   },
      //   err => {
      //     // this.error.handleError(err);
      //   }
      // );
    }
  }

}