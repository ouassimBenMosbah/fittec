import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { first, tap } from 'rxjs/operators';
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
    this.apiService
      .getToken(this.form.value)
      .pipe(
        tap(() => {
          this.login.emit();
        }),
        first()
      )
      .subscribe();
  }
}
