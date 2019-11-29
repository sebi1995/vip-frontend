import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminQueryService } from '../../../../services/graphql/admin/admin-query.service';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
} from '@angular/forms';
import { AdminMutationService } from '../../../../services/graphql/admin/admin-mutation.service';
declare const $;
// import { BookingService } from '../booking.service';
@Component({
  selector: 'app-view-invoice',
  templateUrl: './view-invoice.component.html',
  styleUrls: ['./view-invoice.component.scss'],
})
export class ViewInvoiceComponent implements OnInit {
  id: any;
  bookingData: any;
  invoiceForm: FormGroup;
  invoice: any;
  constructor(
    private fb: FormBuilder,
    private adminQuery: AdminQueryService,
    private router: Router,
    private route: ActivatedRoute,
    private adminMutation: AdminMutationService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];

      if (this.id !== undefined) {
        this.getData();
      }
    });

    this.invoiceForm = this.fb.group({
      to: ['', [Validators.required]],
      total: ['', [Validators.required]],
      dueDate: ['', [Validators.required]],
      subTotal: ['', [Validators.required]],
      vat: ['', [Validators.required]],
      currency: ['', [Validators.required]],
      date: ['', []],
      items: this.fb.array([this.initItems()]),
    });
  }

  getData() {
    this.adminQuery.getBookings({ id: this.id }).subscribe(
      ({ data }) => {
        console.log('====>');
        console.log(data.getBookings[0]);
        this.bookingData = data.getBookings[0];
        this.invoiceForm.patchValue({
          to: `${this.bookingData.firstName} ${this.bookingData.lastName}`,
          currency: this.bookingData.package.currency,
        });
      },
      err => {
        console.log(JSON.stringify(err));
      }
    );
  }

  initItems() {
    return this.fb.group({
      description: [null, [Validators.required]],
      price: [null, [Validators.required]],
    });
  }

  addItem() {
    const control = <FormArray>this.invoiceForm.controls['items'];
    control.push(this.initItems());
  }

  removeItem(i) {
    const control = <FormArray>this.invoiceForm.controls['items'];
    control.removeAt(i);
  }

  submit = async () => {
    const dueDate = await this.getDate(this.invoiceForm.value.dueDate);
    const date = await new Date().toLocaleDateString();

    this.invoiceForm.patchValue({
      dueDate: dueDate,
    });
    const formValue = this.invoiceForm.value;
    formValue['_id'] = this.id;
    formValue['date'] = date;
    console.log(formValue);
    this.adminMutation.updateInvoice(formValue).subscribe(
      ({ data }) => {
        console.log(data);
        this.invoice = data.updateInvoice;
        this.getData();
      },
      err => {
        console.log(JSON.stringify(err));
      }
    );
    // tslint:disable-next-line: semicolon
  };

  getDate(value) {
    const d = new Date(value);
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    const date = day + '/' + month + '/' + year;
    return date;
  }

  sendInvoice() {
    this.adminMutation.sendInvoice(this.bookingData._id).subscribe(
      ({ data }) => {
        console.log(data);
        $('#modalSuccess').modal('show');
      },
      err => {
        console.log(JSON.stringify(err));
      }
    );
  }
}
