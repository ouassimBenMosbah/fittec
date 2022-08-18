import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EMPTY } from 'rxjs';
import { catchError, first, tap } from 'rxjs/operators';
import { ApiService } from 'src/app/api/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @Output() login = new EventEmitter<void>();

  public form: FormGroup = new FormGroup({
    phone: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(8)
    ]),
    password: new FormControl<string>('', [Validators.required])
  });

  constructor(private apiService: ApiService) {}

  public submit(): void {
    const formattedPhoneNumber = this.getFormattedPhoneNumber(
      this.form.get('phone')?.value
    );
    this.apiService
      .getToken({ ...this.form.value, phone: formattedPhoneNumber })
      .pipe(
        tap(() => {
          this.login.emit();
        }),
        catchError((err) => {
          alert(err);
          return EMPTY;
        }),
        first()
      )
      .subscribe();
  }

  private getFormattedPhoneNumber(phone?: string): string {
    if (!phone) {
      return '';
    }
    let formattedPhoneNumber = phone.replace(/\s/g, '');
    if (formattedPhoneNumber.startsWith('06')) {
      return formattedPhoneNumber.replace('06', '+336');
    }
    return formattedPhoneNumber;
  }
}
