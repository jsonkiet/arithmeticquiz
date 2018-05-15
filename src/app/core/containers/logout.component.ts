import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthLogout } from '../../auth/actions/auth.actions';
import { Location } from '@angular/common';

@Component({
    selector: 'app-logout',
    template: `
        <mat-card>
            <mat-card-title>Are you sure you want to logout?</mat-card-title>
            <mat-card-content>
                <button color="primary" mat-raised-button (click)="logout()">Logout</button>
                <button color="primary" mat-raised-button (click)="goBack()">Back</button>
            </mat-card-content>
        </mat-card>
    `,
    styles: [`
        :host {
            display: flex;
            justify-content: center;
        }
        mat-card-content {
            display: flex;
            justify-content: center;
        }
        button {
            margin-right: 20px;
        }
    `]
})
export class LogoutComponent implements OnInit {
    constructor(private store : Store<any>, private location : Location) { }

    ngOnInit(): void { }
    logout(){
        this.store.dispatch(new AuthLogout());
    }
    goBack() {
        this.location.back();
    }
}
