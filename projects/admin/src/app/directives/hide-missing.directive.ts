import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appHideMissing]',
  standalone: true
})
export class HideMissingDirective {
  @Output() showMossageImage = new EventEmitter();
  @HostListener("error")
  private onError() {
    this.el.nativeElement.style.display = "none";
    this.showMossageImage.emit("assets/not-found.jpg")
  }
  @HostListener("load")
  private onLoad() {
    this.el.nativeElement.style.display = "block";
  }
  constructor(private el: ElementRef) { }
}
