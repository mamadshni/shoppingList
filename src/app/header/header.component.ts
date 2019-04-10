import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  @Output() routing = new EventEmitter<Boolean>();

  isRecipe(condition: boolean) {
    this.routing.emit(condition);
  }
}
