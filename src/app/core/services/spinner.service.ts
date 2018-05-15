import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SpinnerService {
  private _isLoading = new BehaviorSubject<boolean>(false);
  constructor() { }
  isLoading() : Observable<boolean> {
    return this._isLoading.asObservable();
  }
  show() {
    this._isLoading.next(true);
  }
  off() {
    this._isLoading.next(false);
  }
}
