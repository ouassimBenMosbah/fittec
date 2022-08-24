import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { mapTo, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public isLoggedIn = false;
  public selectedIndex = 0;

  constructor(private route: ActivatedRoute, private router: Router) {}

  public ngOnInit(): void {
    const selectedTabIndex = location.search.replace('?tabIndex=', '');
    if (selectedTabIndex.length === 1) {
      this.selectedIndex = +selectedTabIndex;
    }
  }

  public onAuthChange(isLoggedIn: boolean): void {
    this.isLoggedIn = isLoggedIn;
  }

  public onSelectedIndexChange(index: number): void {
    this.selectedIndex = index;
    this.router.navigate(['.'], {
      relativeTo: this.route,
      queryParams: { tabIndex: index }
    });
  }
}
