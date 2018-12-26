import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Item } from './item.model';

@Injectable({providedIn: 'root'})
export class ItemsService {
  private items: Item[] = [];
  private itemsUpdated = new Subject<Item[]>();

  constructor(private http: HttpClient) {}

  getItems() {
    this.http.get<{message: string, items: Item[]}>('http://localhost:3000/api/items')
    .subscribe((itemData) => {
      this.items = itemData.items;
      this.itemsUpdated.next([...this.items]);
    });
  }

  getItemsUpdateListner() {
    return this.itemsUpdated.asObservable();
  }

  addItem(itemName: string, itemPrice: number, itemDescription: string) {
    const item: Item = {id: null, itemName: itemName, itemPrice: itemPrice, itemDescription: itemDescription };
    this.http.post<{message: string}>('http://localhost:3000/api/items', item)
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.items.push(item);
        this.itemsUpdated.next([...this.items]);
      });
  }
}
