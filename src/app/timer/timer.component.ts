import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {range, Subject, timer, interval} from 'rxjs';
import {filter, map, mapTo, skipUntil, skipWhile, switchMap, takeWhile, tap} from 'rxjs/operators';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  subject: Subject<boolean> = new Subject<boolean>();
  observable = this.subject.asObservable();

  hourList: Array<number> = [];
  minuteList: Array<number> = [];
  secondList: Array<number> = [];

  currentHour: number;
  currentMinute: number;
  currentSecond: number;

  actionButtonState = 'Start';

  active = false;

  constructor() { }

  // tslint:disable-next-line:no-input-rename
  @Input('hour')
  initialHour: number;

  // tslint:disable-next-line:no-input-rename
  @Input('minute')
  initialMinute: number;

  // tslint:disable-next-line:no-input-rename
  @Input('second')
  initialSecond: number;

  @Output('complete')
  complete: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit() {
    range(0, 24).subscribe(value => {
      this.hourList.push(value);
    });

    range(0, 60).subscribe(value => {
      this.minuteList.push(value);
    });

    range(0, 60).subscribe(value => {
      this.secondList.push(value);
    });

    this.initializeTimerPart();

    const subscription = this.subject.pipe(
      tap(state => {
        if (state) {
          this.actionButtonState = 'Pause';
        } else {
          this.actionButtonState = 'Start';
        }
        console.log('state ', state);
        this.active = state;
      }),
      switchMap(() => interval(1000)),
      filter(() => this.active),
    ).subscribe(v => {
      this.currentSecond--;
      if (this.currentSecond < 0) {
        this.currentSecond = 59;
        this.currentMinute--;
        if (this.currentMinute < 0) {
          this.currentMinute = 59;
          this.currentHour--;
          if (this.currentHour < 0) {
            this.currentHour = 0;
            this.currentMinute = 0;
            this.currentSecond = 0;
            this.active = false;
            this.actionButtonState = 'Start';
            this.initializeTimerPart();
            this.complete.emit();
          }
        }
      }
      console.log('interval ', v, ' state ', this.active);
    });
  }

  onStartButtonClick() {
    const nextState = !this.active;
    this.subject.next(nextState);
  }

  private initializeTimerPart() {
    this.currentHour = this.initialHour;
    this.currentMinute = this.initialMinute;
    this.currentSecond = this.initialSecond;
  }

}
