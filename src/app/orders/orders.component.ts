import { Component, OnInit, ViewChild } from '@angular/core';
import { OrdersService } from './orders.service';
import { Orders } from '../Model/orders';
import { FormGroup, FormControl } from '@angular/forms';
import {MatTableDataSource, MatDialog, MatDialogRef, MatSort} from '@angular/material';
import { NewOrdersComponent } from '../new-orders/new-orders.component';
import {EditOrderComponent} from '../edit-order/edit-order.component';
import {NotificationService} from '../notification.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})

export class OrdersComponent implements OnInit {
 Orderitems;
 isPopupOpened = true;
 orders = new Orders();
//  @ViewChild(MatSort) matsort: MatSort;
 @ViewChild(MatPaginator) paginator: MatPaginator;
 displayedColumns: string[] = [
   'id',
  'OrderNumber',
  'OrderDuedate',
  'CustomerName',
  'CustomerAddress',
  'CustomerphoneNo',
  'OrderTotal', 'actions'];
  dataSource: MatTableDataSource<Element>;
  DialogRefpost: MatDialogRef<NewOrdersComponent>;
  DialogRefUpdate: MatDialogRef<EditOrderComponent>;

  constructor(private orderservice: OrdersService, public dialog: MatDialog, private notifyservice: NotificationService) { }
Orderformgroup = new FormGroup({
id: new FormControl(''),
OrderNumber: new FormControl(''),
OrderDuedate:  new FormControl(''),
CustomerName:  new FormControl(''),
CustomerAddress:  new FormControl(''),
CustomerphoneNo:  new FormControl(''),
OrderTotal:  new FormControl(''),
 });

  ngOnInit() {
    // this.dataSource.sort = this.matsort;
    // this.dataSource.paginator = this.paginator;
    this.getOrderlistItems();
  }

  openDialog(): void {
    this.DialogRefpost = this.dialog.open(NewOrdersComponent, {
      width: '288px',
    });

    this.DialogRefpost.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getOrderlistItems();

    });
  }

  getOrderlistItems() {
   return this.orderservice.orderlistview().subscribe(data => {
   console.log(data);
   this.Orderitems = JSON.parse(JSON.stringify(data));
   this.dataSource = new MatTableDataSource < Element > (data);
   this.dataSource.paginator = this.paginator;
   console.log(this.Orderitems);
 });
  }

  getOrderlistbyId(id: number) {
  return this.orderservice.orderlistviewbyid(id, {'Content-Type': 'application/json', 'responseType': 'text'}).subscribe(
    data => {
  console.log(data);
  });
  }

onEdit( order) {
  // this.editService.populate(order);
   console.log(order);
  this.DialogRefUpdate = this.dialog.open(EditOrderComponent, {
    width: '288px',
    data: order
  });

  this.DialogRefUpdate.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    this.getOrderlistItems();

  });
}

onDelete(id: number) {
  if ( confirm('Are you sure to delete this record ?')) {
  return this.orderservice.orderDelete(id, {'Content-Type': 'application/json', 'responseType': 'text'}).subscribe(data => {
    console.log('deleted successfully');
    this.getOrderlistItems();
    this.notifyservice.warn('Deleted Successfully');
  });
}
}
}
