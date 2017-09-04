import {Title} from '@angular/platform-browser';

import {UserDetails} from './_models/user-details';
import {AuthenticationService} from './core/auth/authentication.service';
import {MenuItem} from './core/menu/menu-item';
import {MenuService} from './core/menu/menu.service';
import {TitleService} from './core/services/title.service';
import {Component, OnInit} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';

declare let $: any;

@Component({
  moduleId: module.id,
  templateUrl: 'main.component.html'
})
export class MainComponent implements OnInit {

  screenTitle: string;

  userDetails: UserDetails;
  mainMenu: MenuItem[];
  currentMenu: MenuItem;
  currentUrl: string;

  constructor(
    private authenticationService: AuthenticationService,
    private menuService: MenuService,
    private router: Router,
    private title: Title,
    private titleService: TitleService) {}

  ngOnInit() {
    $('.datepicker').datepicker({language: 'ru'});
    this.setTitleChangeListener();
    this.authenticationService.getUserDetails()
      .then((userDetails: UserDetails) => {
        this.userDetails = userDetails;
        this.mainMenu = this.menuService.getMainMenu();
      });
    this.onNavigationChange();
    this.titleService.setTitleKey('main.main-page');
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
        if (this.currentUrl === '/') {
          this.titleService.setTitleKey('main.main-page');
        }
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

  setTitleChangeListener(): void {
    this.titleService.source.subscribe((title: string) => {
      this.screenTitle = title;
      this.title.setTitle(title);
    });
  }
}

