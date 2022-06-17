import { Component, EventEmitter, Output } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {
  @Output() logout = new EventEmitter<void>();
  constructor(private authenticationService: AuthenticationService) {}

  public onClick(): void {
    this.authenticationService.logout();
    this.logout.emit();
  }
}
