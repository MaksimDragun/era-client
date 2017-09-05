import {AuthenticationService} from '../../core/auth/authentication.service';
import {Directive, ElementRef, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[appHasRoles]'
})
export class HasRolesDirective implements OnInit {

  @Input() appHasRoles: string[];

  constructor(private element: ElementRef, private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.authenticationService.getUserDetails()
      .then(userDetails => {
        this.element.nativeElement.disabled
          = !this.authenticationService.hasPermissions(userDetails.authorities, this.appHasRoles);
      })
      .catch(error => this.element.nativeElement.disabled = true);
  }
}
