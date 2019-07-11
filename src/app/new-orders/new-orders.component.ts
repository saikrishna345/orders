import { Component, OnInit, Inject} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {OrdersService} from '../orders/orders.service';
import { Orders } from '../Model/orders';
import { Router } from '@angular/router';
import { NotificationService } from '../notification.service';
@Component({
  selector: 'app-new-orders',
  templateUrl: './new-orders.component.html',
  styleUrls: ['./new-orders.component.css']
})
export class NewOrdersComponent implements OnInit {
  Orderitems;
  list;
  orders = new Orders();
  Orderformgroup = new FormGroup({
    OrderNumber: new FormControl(''),
    OrderDuedate:  new FormControl(''),
    CustomerName:  new FormControl(''),
    CustomerAddress:  new FormControl(''),
    CustomerphoneNo:  new FormControl(''),
    OrderTotal:  new FormControl(''),
     });
  constructor(private orderservice: OrdersService, private notifyservice: NotificationService,
     private router: Router, public dialogRef: MatDialogRef<NewOrdersComponent>,
    @Inject(MAT_DIALOG_DATA) data
    ) { }

  ngOnInit() {
    this.getOrderlistItems();
  }

  get orderNo() {
    return this.Orderformgroup.controls.OrderNumber.value;
     }
    get orderDuedate() {
    return this.Orderformgroup.controls.OrderDuedate.value;
    }
    get customername() {
    return this.Orderformgroup.controls.CustomerName.value;
    }
    get customeraddress() {
      return this.Orderformgroup.controls.CustomerAddress.value;
      }
    get customerphno() {
    return this.Orderformgroup.controls.CustomerphoneNo.value;
    }
    get orderTotal() {
      return this.Orderformgroup.controls.OrderTotal.value;
      }

      getOrderlistItems() {
        return this.orderservice.orderlistview().subscribe(data => {
        console.log(data);
        this.Orderitems = JSON.parse(JSON.stringify(data));
        console.log(this.Orderitems);
      });
       }

       onNoClick() {

        this.dialogRef.close();
        // this.router.navigateByUrl('orders');
      }

  OrdersPost() {
    this.orders.OrderNumber = this.orderNo;
    this.orders.OrderDuedate = this.orderDuedate;
    this.orders.CustomerName = this.customername;
    this.orders.CustomerAddress = this.customeraddress;
    this.orders.CustomerphoneNo = this.customerphno;
    this.orders.OrderTotal = this.orderTotal;
    return this.orderservice.orderPost(this.orders, {'Content-Type': 'application/json', 'responseType': 'text'}).subscribe(data => {
    console.log(data);
    this.notifyservice.success('Added Successfully');
    this.getOrderlistItems();
  });
  }
}

