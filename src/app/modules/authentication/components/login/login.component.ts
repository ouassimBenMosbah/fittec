import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Output
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EMPTY, of } from 'rxjs';
import { catchError, first, tap } from 'rxjs/operators';
import { ApiService } from 'src/app/api/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  @Output() login = new EventEmitter<void>();

  public form: FormGroup = new FormGroup({
    phone: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(10)
    ]),
    password: new FormControl<string>('', [Validators.required])
  });

  public errorMessage?: string;

  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) {}

  public submit(): void {
    const formattedPhoneNumber = this.getFormattedPhoneNumber(
      this.form.get('phone')?.value
    );
    this.apiService
      .getToken({ ...this.form.value, phone: formattedPhoneNumber })
      .pipe(
        tap(() => {
          this.login.emit();
          this.errorMessage = undefined;
        }),
        catchError((err) => {
          this.errorMessage = err;
          return of(undefined);
        }),
        first()
      )
      .subscribe(() => {
        this.cdr.markForCheck();
      });
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
