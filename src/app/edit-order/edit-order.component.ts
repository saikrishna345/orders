import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { FormControl, FormGroup, FormBuilder , Validators} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {OrdersService} from '../orders/orders.service';
import { Orders } from '../Model/orders';
import { Router } from '@angular/router';
import {NotificationService} from '../notification.service';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})
export class EditOrderComponent implements OnInit {

  Orderitems;
  list;
  orders = new Orders();
  Orderformgroup: FormGroup;
  constructor(private orderservice: OrdersService, private notifyservice: NotificationService, private fb: FormBuilder,
     private router: Router, public dialogRef: MatDialogRef<EditOrderComponent>, @Inject(MAT_DIALOG_DATA) data
    ) {
      console.log(data.OrderNumber);
     this.list = data;
     this.Orderformgroup = this.fb.group({
       id: [this.list.id, Validators.required],
      OrderNumber: [this.list.OrderNumber, Validators.required],
      OrderDuedate: [this.list.OrderDuedate, Validators.required] ,
      CustomerName: [this.list.CustomerName, Validators.required] ,
      CustomerAddress: [this.list.CustomerAddress, Validators.required],
      CustomerphoneNo: [this.list.CustomerphoneNo, Validators.required] ,
      OrderTotal: [this.list.OrderTotal, Validators.required]
          });
    }
  ngOnInit() {
    this.getOrderlistItems();
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


Ordersupdate() {
this.orders.id = this.Orderformgroup.controls.id.value;
this.orders.OrderNumber = this.orderNo;
this.orders.OrderDuedate = this.orderDuedate;
this.orders.CustomerName = this.customername;
this.orders.CustomerAddress = this.customeraddress;
this.orders.CustomerphoneNo = this.customerphno;
this.orders.OrderTotal = this.orderTotal;
return this.orderservice.orderUpdate(this.orders.id, this.orders).subscribe(data => {
console.log(data);

console.log('successfully updated');
this.notifyservice.success('Updated Successfully');
this.getOrderlistItems();
  }
  , error => {
console.log(error);
  });

}
}
