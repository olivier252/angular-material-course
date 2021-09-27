import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'button-test',
  templateUrl: './button-test.component.html',
  styleUrls: ['./button-test.component.scss']
})
export class ButtonTestComponent implements OnInit {
  @ViewChild('btn', {static: true}) button: ElementRef;
  btnSub: Subscription;

  constructor(private elm: ElementRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.buttonClick();
  }

  buttonClick() {
    this.btnSub = fromEvent(this.button.nativeElement, 'click')
    .pipe(debounceTime(300)).
    subscribe(res => console.log(res));
  }

  ngOnDestroy() {
    this.btnSub.unsubscribe()
  }

}
