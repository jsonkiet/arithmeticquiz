import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
    <mat-card>
      <mat-card-title>
        404 Page Not Found
      </mat-card-title>
      <mat-card-content>
        <button mat-raised-button routerLink="/home" color="primary">Home</button>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    :host {
      text-align: center;
    }
  `]
})
export class NotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
