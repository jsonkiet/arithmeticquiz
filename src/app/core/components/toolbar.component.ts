import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material';
import { User, Roles } from './../../auth/models/user.model';

@Component({
  selector: 'app-toolbar',
  template: `
    <mat-toolbar>
      <div>
        <button mat-icon-button routerLink="/home"><mat-icon>home</mat-icon> </button>
        <button *ngIf="loggedIn && isInRole(userInfo.roles,['admin'])" mat-icon-button routerLink="/admin"><mat-icon>lock_outline</mat-icon> </button>
        <button *ngIf="loggedIn && isInRole(userInfo.roles,['student'])" mat-icon-button [routerLink]="['/reports',userInfo.uid]"><mat-icon>list</mat-icon> </button>
        <button *ngIf="loggedIn && isInRole(userInfo.roles,['student'])" mat-icon-button routerLink="/math"><mat-icon>create</mat-icon></button>
      </div>
      <div>
        <button *ngIf="!loggedIn" color="secondary" mat-button routerLink="/login" >Login</button>
        <span *ngIf="loggedIn">Hi {{userInfo.givenName}}</span>
        <button *ngIf="loggedIn" routerLink="/logout" color="secondary" mat-button routerLink="/logout" >Logout</button>
      </div>
    </mat-toolbar>
  `,
  styles: [`
    mat-toolbar {
      margin-top: 0px;
      display: flex;
      height: 35px;
      justify-content: space-between;
    }
  `]
})
export class ToolbarComponent implements OnInit {
  @Input() userInfo: User | null = null;
  @Input() loggedIn: boolean = false;
  constructor() { }

  ngOnInit() {
  }
  isInRole(roles: Roles, isInRoles: string[]): boolean {
    for (const role of Object.keys(roles)) {
      if (roles[role]) {
        for (let i = 0; i < isInRoles.length; i++) {
          if (role.toLocaleLowerCase() === isInRoles[i].toLocaleLowerCase())
            return true;
        }
      }
    }
    return false;
  }
}
