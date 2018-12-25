import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Item } from './item.model';

@Injectable({providedIn: 'root'})
export class ItemsService {
  private items: Item[] = [];
  private itemsUpdated = new Subject<Item[]>();

  getItems() {
    return [...this.items];
  }

  getItemsUpdateListner() {
    return this.itemsUpdated.asObservable();
  }

  addItem(itemName: string, itemPrice: number, itemDescription: string) {
    const item: Item = {itemName: itemName, itemPrice: itemPrice, itemDescription: itemDescription };
    this.items.push(item);
    this.itemsUpdated.next([...this.items]);
  }
}
