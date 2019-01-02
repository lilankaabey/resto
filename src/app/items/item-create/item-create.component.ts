import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { ItemsService } from '../items.service';
import { Item } from '../item.model';

@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html',
  styleUrls: ['./item-create.component.css']
})

export class ItemCreateComponent implements OnInit {
  enteredName = '';
  enteredPrice;
  enteredDescription = '';
  item: Item;
  private mode = 'create';
  private itemId: string;

  constructor(public itemsService: ItemsService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('itemId')) {
        this.mode = 'edit';
        this.itemId = paramMap.get('itemId');
        this.itemsService.getItem(this.itemId).subscribe(itemData => {
          this.item = {itemId: itemData._id, itemName: itemData.itemName, itemPrice: itemData.itemPrice, itemDescription: itemData.itemDescription };
        });
      } else {
        this.mode = 'create';
        this.itemId = null;
      }
    });
  }

  onSaveItem (form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.itemsService.addItem(form.value.itemName, form.value.itemPrice, form.value.itemDescription);
    } else {
      this.itemsService.updateItem(this.itemId, form.value.itemName, form.value.itemPrice, form.value.itemDescription);
    }
    form.resetForm();
  }
}
