import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators'; // this method allows us to transform every element open array
// into a new elements stored them back to a new array

import { Item } from './item.model';

@Injectable({providedIn: 'root'})
export class ItemsService {
  private items: Item[] = [];
  private itemsUpdated = new Subject<Item[]>();

  constructor(private http: HttpClient) {}

  getItems() {
    this.http
      .get<{message: string, items: Item[]}>('http://localhost:3000/api/items')
        .pipe(map((itemData) => {
          return itemData.items.map(item => {
            return {
              itemId: item._id,
              itemName: item.itemName,
              itemPrice: item.itemPrice,
              itemDescription: item.itemDescription
            };
          });
        }))
        .subscribe(transformedItems => {
          this.items = transformedItems;
          this.itemsUpdated.next([...this.items]);
        });
  }

  getItemsUpdateListner() {
    return this.itemsUpdated.asObservable();
  }

  addItem(itemName: string, itemPrice: number, itemDescription: string) {
    const item: Item = {itemId: null, itemName: itemName, itemPrice: itemPrice, itemDescription: itemDescription };
    this.http
      .post<{message: string}>('http://localhost:3000/api/items', item)
        .subscribe((responseData) => {
          console.log(responseData.message);
          this.items.push(item);
          this.itemsUpdated.next([...this.items]);
        });
  }
}
