import { Component } from '@angular/core';

@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html',
  styleUrls: ['./item-create.component.css']
})

export class ItemCreateComponent {
  enteredValue = '';
  newItem = '';

  onAddItem () {
    this.newItem = this.enteredValue;
  }
}
