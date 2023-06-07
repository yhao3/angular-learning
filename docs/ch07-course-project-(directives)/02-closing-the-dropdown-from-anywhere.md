# 02. Closing the Dropdown from Anywhere

如果你希望點擊下拉選單以外的任何地方也可以關閉下拉選單，請將 `dropdown.directive.ts` 替換為以下程式碼（
關鍵在於將監聽器放在 `document` 上，而不是某個下拉選單上）：

- [`dropdown.directive.ts`](../../course-project-1/src/app/shared/dropdown.directive.ts)

```ts
import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  @HostBinding('class.open')
  isOpen = false;

  @HostListener('document:click', ['$event'])
  toggleOpen(event: Event) {
    this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  }

  constructor(private elRef: ElementRef) {}
}
```

> **Note**:
> 這也意味著點擊其中一個下拉選單將關閉其他所有下拉選單，順便提一下。