import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-authentication-container',
  templateUrl: './authentication-container.component.html',
  styleUrls: ['./authentication-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthenticationContainerComponent implements OnInit {
  @Output() authChange: EventEmitter<boolean> = new EventEmitter();

  public isLoggedIn!: boolean;

  constructor(
    private authenticationService: AuthenticationService,
    private cdr: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.setIsLoggedIn();
  }

  public onLogout(): void {
    this.setIsLoggedIn();
  }

  public onLogin(): void {
    this.setIsLoggedIn();
  }

  private setIsLoggedIn() {
    this.isLoggedIn = this.authenticationService.isLoggedIn();
    this.authChange.emit(this.isLoggedIn);
    this.cdr.markForCheck();
  }
}
