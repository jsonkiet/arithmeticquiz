import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  template: `
  <div class="loading-indicator">
    <mat-progress-spinner mode="indeterminate" color="accent"></mat-progress-spinner>
  </div>
  `,
  styles: [`
      /* Absolute Center Spinner */
      .loading-indicator {
        position: fixed;
        z-index: 999;
        height: 2em;
        width: 2em;
        overflow: show;
        margin: auto;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
      }
      
      /* Transparent Overlay */
      .loading-indicator:before {
        content: '';
        display: block;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.3);
      }
  `]
})
export class SpinnerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}
