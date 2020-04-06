import { Directive, HostBinding, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: "[appDropdown]"
 })

export class DropdownDirective {
  // @HostBinding('class.open') isOpen:boolean = false;
  // @HostListener('click') toggleOpen(){
  //   this.isOpen = !this.isOpen;
  // }
  // constructor(){
  // }

  /* TO CLOSE THE DROPDOWNON EVERY CLICK ANYWHERE(NOT ONLY ON THE ELEMENT)*/
  @HostBinding('class.open') isOpen = false;
  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  }
  constructor(private elRef: ElementRef) {}
}
