import { Component, OnInit } from '@angular/core';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database'
import { map } from 'rxjs/operator/map';
import { QuizReport } from '../math/models/quiz-report.model';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-quiz-list',
  template: `
    <mat-table [dataSource]="quizReports$|async">
      <ng-container matColumnDef="takenDate">
        <mat-header-cell *matHeaderCellDef>Date</mat-header-cell>
        <mat-cell *matCellDef="let element">{{element.takenDate | date:'short'}}</mat-cell>
      </ng-container>
      <ng-container matColumnDef="score">
        <mat-header-cell *matHeaderCellDef>Score</mat-header-cell>
        <mat-cell *matCellDef="let element">{{element.score}}%</mat-cell>
      </ng-container>

      <mat-header-row *matHeaderRowDef="displayColumns"> </mat-header-row>
      <mat-row 
        *matRowDef="let row; columns: displayColumns"
        [style.background]="selectedIdx===row.takenDate? lightblue : ''"
      >
      </mat-row>
    </mat-table>
    <router-outlet>
    </router-outlet>
  `,
  styles: [`
    mat-row:hover {
      background-color: lightblue;
      cursor: hand;
    }
  `]
})
export class QuizListComponent implements OnInit {
  readonly displayColumns: string[] = ['takenDate', 'score'];
  constructor(private router: Router, private route: ActivatedRoute, private db: AngularFireDatabase) { }
  quizReports$: Observable<any>;

  ngOnInit() {
    this.route.paramMap.subscribe((param: ParamMap) => {
      const uid = param.get('id');
      this.quizReports$ = this.db.list(`reports/${uid}`).snapshotChanges().
        map(res => res.map(c => ({ takenDate: c.payload.key, ...c.payload.val() })))
    });
  }
}
