import { Directive, HostListener, HostBinding } from "@angular/core";

@Directive({
  selector: "[appDropdown]",
})
export class DropdownDirective {
  @HostBinding("class.open") isOpen = false;

  @HostListener("click") toggleOpen() {
    this.isOpen = !this.isOpen;
  }

  // @HostListener('mouseenter') mouseEnter() {
  //   this.isOpen = true;
  // }
  //
  // @HostListener('mouseleave') mouseLeave() {
  //   this.isOpen = false;
  // }
}
