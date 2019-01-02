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
  items: Item[] = [];
  isLoading = false;
  private itemsSub: Subscription;

  constructor(public itemsService: ItemsService) {}

  ngOnInit() {
    this.isLoading = true;
    this.itemsService.getItems();
    this.itemsSub = this.itemsService.getItemsUpdateListner()
    .subscribe((items: Item[]) => {
      this.isLoading = false;
      this.items = items;
    });
  }

  onDelete(itemId: string) {
    this.itemsService.deleteItem(itemId);
  }

  ngOnDestroy() {
    this.itemsSub.unsubscribe();
  }
}
