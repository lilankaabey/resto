import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Item } from '../item.model';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})

export class ItemListComponent implements OnInit, OnDestroy {
  // items = [
  //   {name: 'First Item', price: 'Rs. 500.00', description: 'This is the first item' },
  //   {name: 'Second Item', price: 'Rs. 700.00', description: 'This is the second item' },
  //   {name: 'Third Item', price: 'Rs. 500.00', description: 'This is the third item' },
  // ];

  items: Item[] = [];
  private itemsSub: Subscription;

  constructor(public itemsService: ItemsService) {}

  ngOnInit() {
    this.itemsService.getItems();
    this.itemsSub = this.itemsService.getItemsUpdateListner()
    .subscribe((items: Item[]) => {
      this.items = items;
    });
  }

  ngOnDestroy() {
    this.itemsSub.unsubscribe();
  }
}
