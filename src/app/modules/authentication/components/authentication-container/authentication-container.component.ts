import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-authentication-container',
  templateUrl: './authentication-container.component.html',
  styleUrls: ['./authentication-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthenticationContainerComponent implements OnInit {
  public isLoggedIn!: boolean;

  constructor(private authenticationService: AuthenticationService) {}

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
  }
}
