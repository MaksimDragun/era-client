import {UserDetails} from './_models/user-details';
import {AuthenticationService} from './_services/authentication.service';
import {MenuService, MenuItem} from './_services/menu.service';
import {Component, OnInit} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';

@Component({
  moduleId: module.id,
  templateUrl: 'main.component.html'
})
export class MainComponent implements OnInit {

  userDetails: UserDetails;
  mainMenu: MenuItem[];
  currentMenu: MenuItem;
  currentUrl: string;

  constructor(
    private authenticationService: AuthenticationService,
    private menuService: MenuService,
    private router: Router) {}

  ngOnInit() {
    this.authenticationService.getUserDetails()
      .then((userDetails: UserDetails) => {
        this.userDetails = userDetails;
        this.mainMenu = this.menuService.getMainMenu();
      });
    this.onNavigationChange();
  }

  logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  isMenuActive(url: string): boolean {
    return this.currentUrl && this.currentUrl.startsWith(url);
  }

  onNavigationChange(): void {
    this.router.events.subscribe((navigation: any) => {
      if (navigation instanceof NavigationEnd) {
        const nav: NavigationEnd = navigation as NavigationEnd;
        this.currentUrl = nav.urlAfterRedirects || nav.url;
        this.currentMenu = this.findMainMenuItem(this.currentUrl);
        this.currentUrl = this.currentMenu ? this.currentUrl : '/';
      }
    });
  }

  findMainMenuItem(url: string): MenuItem {
    for (const item of this.mainMenu) {
      if (url.startsWith(item.action)) {
        return item;
      }
    }
  }
}

