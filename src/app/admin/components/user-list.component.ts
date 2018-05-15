import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { User } from '../../auth/models/user.model';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { SpinnerService } from '../../core/services/spinner.service';

@Component({
  selector: 'app-user-list',
  template: `
    <app-spinner *ngIf="spinner.isLoading()|async"> </app-spinner>
    <app-user-details *ngFor="let user of (users)" [user]="user">
    </app-user-details>
  `,
  styles: [`
    :host {
      display: flex-row;
      text-align: center;
    }
  `]
})
export class UserListComponent implements OnInit {

  constructor(private db: AngularFireDatabase, public spinner: SpinnerService) { }

  users: User[];
  ngOnInit() {
    this.spinner.show();
    this.db.list<User>('/users/').valueChanges().subscribe(
      (res) => {
        this.users = res;
        this.spinner.off();
      },
      (error) =>{this.spinner.off() ;console.log(error) }
        
    )
  }
}