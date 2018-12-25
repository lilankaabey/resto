import { Component } from '@angular/core';

import { NgForm } from '@angular/forms';

import { ItemsService } from '../items.service';

@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html',
  styleUrls: ['./item-create.component.css']
})

export class ItemCreateComponent {
  enteredName = '';
  enteredPrice;
  enteredDescription = '';

  constructor(public itemsService: ItemsService) {}

  onAddItem (form: NgForm) {
    this.itemsService.addItem(form.value.itemName, form.value.itemPrice, form.value.itemDescription);
    form.resetForm();
  }
}
