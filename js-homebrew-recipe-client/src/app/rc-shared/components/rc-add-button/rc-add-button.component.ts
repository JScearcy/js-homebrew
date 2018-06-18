import { Component, EventEmitter, Input } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'rc-add-button',
  templateUrl: './rc-add-button.component.html',
  styleUrls: ['./rc-add-button.component.css']
})
export class RcAddButtonComponent {
  @Input() type = 'button';
  public click = new EventEmitter();

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIconLiteral('plus', sanitizer.bypassSecurityTrustHtml(PLUS_ICON));
  }

  onClick(event) {
    this.click.emit(event);
  }
}

const PLUS_ICON = `
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path d="M 50 10 L 50 90 M 10 50 L 90 50" stroke="black"
    stroke-linecap="round" stroke-width="12" stroke-linecap="round" fill="none"/>
</svg> 
`;
