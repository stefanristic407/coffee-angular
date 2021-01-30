import { Directive, Output, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appLifecyclehook]'
})
export class LifecyclehookDirective implements AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked {

  constructor() { }
  @Output() contentChecked = new EventEmitter();
  @Output() contentInit = new EventEmitter();
  @Output() viewInit = new EventEmitter();
  @Output() viewChecked = new EventEmitter();

  ngAfterContentChecked() {
    this.contentChecked.emit();
  }

  ngAfterContentInit() {
    this.contentInit.emit();
  }

  ngAfterViewChecked() {
    this.viewChecked.emit();
  }
  ngAfterViewInit() {
    this.viewInit.emit();
  }
}
