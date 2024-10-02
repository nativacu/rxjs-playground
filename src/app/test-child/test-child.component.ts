import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-test-child',
  templateUrl: './test-child.component.html',
  styleUrls: ['./test-child.component.css']
})
export class TestChildComponent implements OnInit, OnDestroy {
  destroyed$ = new Subject<void>();

  ngOnInit() {
    const observable = interval(200); // Create an observable that emits every 200 ms

    observable.pipe(
      takeUntil(
        this.destroyed$ // Unsubscribe when the component is destroyed
      )
    ).subscribe({
        next: value => {
          console.log(value); // Handle the emitted values here
        },
        error: err => {
          console.error('Error occurred: ', err); // Handle errors here
        }
      }
    );
  }

  ngOnDestroy() {
    this.destroyed$.next(); // Emit a value to complete the interval observable
    this.destroyed$.complete(); // Unsubscribe from the observable
  }
}

