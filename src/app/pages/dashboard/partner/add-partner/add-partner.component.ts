import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  FormArray,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminQueryService } from '../../../../services/graphql/admin/admin-query.service';
import { AdminMutationService } from '../../../../services/graphql/admin/admin-mutation.service';
@Component({
  selector: 'app-add-partner',
  templateUrl: './add-partner.component.html',
  styleUrls: ['./add-partner.component.scss'],
})
export class AddPartnerComponent implements OnInit {
  //  variables
  partnerForm: FormGroup;
  travelPackage: FormArray;
  location: FormArray;
  countries: Array<any> = [];
  airports: Array<any> = [];
  args = {
    limit: 3,
    search: '',
    all: true,
  };
  id: any;
  packagesForUpdate: any;
  constructor(
    private fb: FormBuilder,
    private adminQuery: AdminQueryService,
    private adminMutation: AdminMutationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];

      if (this.id !== undefined) {
        console.log('got here');
        this.patchForm();
      }
    });
    // console.log(this.route.url.value[0].path);
    this.partnerForm = this.fb.group({
      companyName: ['', [Validators.required]],
      companyContact: ['', [Validators.required]],
      companyEmail: ['', [Validators.required]],
      pocName: ['', [Validators.required]],
      pocContact: ['', [Validators.required]],
      pocEmail: ['', [Validators.required]],
      active: [true, [Validators.required]],
      preferred: [true, [Validators.required]],
      partnerColor: ['#fff', [Validators.required]],
      partnerCurrency: ['', [Validators.required]],
      packages: this.fb.array([this.initLocation()]),
      ccEmails: this.fb.array([]),
      notes: [],
    });
    this.getCountries();
  }
  patchForm() {
    this.adminQuery.getPartnersForUpdate(this.id, false).subscribe(
      ({ data }) => {
        const formData = data.getPartners[0];
        this.packagesForUpdate = formData.packages;
        console.log('==========formData==========');
        console.log(formData);
        formData.ccEmails.map((email, index) => {
          const control = <FormArray>this.partnerForm.controls['ccEmails'];
          control.push(new FormControl());
          console.log(control);
          control.at(index).setValue(email);
        });
        formData.packages.map((d, index) => {
          const control = <FormArray>this.partnerForm.controls['packages'];
          if (index > 0) {
            control.push(this.initLocation());
          }
          d.priceList.map((data, secondIndex) => {
            const controlPriceList = (<FormArray>(
              this.partnerForm.controls['packages']
            ))
              .at(index)
              .get('priceList') as FormArray;
            if (secondIndex > 0) {
              controlPriceList.push(this.initPriceList());
            }
          });

          console.log(d.pricelist);
          const packageObject = {
            country: d.country,
            airport: d.airport,
            priceList: d.priceList,
            notes: d.notes ? d.notes : 'Airport notes',
          };
          console.log(packageObject);
          control.at(index).setValue(packageObject);
          this.countryChange('event', index);
        });
        this.partnerForm.patchValue({
          active: formData.active,
          preferred: formData.preferred,
          companyName: formData.companyName,
          companyEmail: formData.companyEmail,
          companyContact: formData.companyContact,
          pocName: formData.pocName,
          pocEmail: formData.pocEmail,
          pocContact: formData.pocContact,
          partnerCurrency: formData.partnerCurrency,
          notes: formData.notes,
        });
        this.partnerForm.controls['companyEmail'].disable();
        this.partnerForm.controls['companyName'].disable();
        // this.partnerForm.controls['packages'].disable();
      },
      err => {
        console.log(JSON.stringify(err));
      }
    );
  }
  //  real start
  initLocation() {
    return this.fb.group({
      country: [null, [Validators.required]],
      airport: [null, [Validators.required]],
      notes: [''],
      priceList: this.fb.array([this.initPriceList()]),
      // poc: this.fb.array([this.initPOCList()]),
    });
  }
  initPriceList() {
    return this.fb.group({
      packageName: ['', [Validators.required]],
      cost: ['', [Validators.required]],
    });
  }
  // initPOCList() {
  //   return this.fb.group({
  //     contract: ['contract'],
  //     fullName: ['', [Validators.required]],
  //     mobile: ['', [Validators.required]],
  //   });
  // }

  addLocation() {
    const control = <FormArray>this.partnerForm.controls['packages'];
    control.push(this.initLocation());
  }

  addEmails() {
    const control = <FormArray>this.partnerForm.controls['ccEmails'];
    control.push(new FormControl());
  }

  addPricelist(i) {
    const control = (<FormArray>this.partnerForm.controls['packages'])
      .at(i)
      .get('priceList') as FormArray;

    control.push(this.initPriceList());
  }

  // addPOClist(i) {
  //   const control = (<FormArray>this.partnerForm.controls['packages'])
  //     .at(i)
  //     .get('poc') as FormArray;
  //   control.push(this.initPOCList());
  // }
  // deletePOC(i, j) {
  //   const control = (<FormArray>this.partnerForm.controls['packages'])
  //     .at(i)
  //     .get('poc') as FormArray;

  //   control.removeAt(j);
  // }
  deletePackage(i, j) {
    const control = (<FormArray>this.partnerForm.controls['packages'])
      .at(i)
      .get('priceList') as FormArray;

    control.removeAt(j);
  }
  deleteEmail(i) {
    const control = <FormArray>this.partnerForm.controls['ccEmails'];
    control.removeAt(i);
  }

  removeLocation(i) {
    const control = <FormArray>this.partnerForm.controls['packages'];
    control.removeAt(i);
  }

  //  get list of all countries
  getCountries() {
    this.adminQuery.getCountryAirports(this.args).subscribe(({ data }) => {
      this.countries = data.searchCountries.countryNames;
    });
  }

  countryChange(event, i) {
    // console.log(this.partnerForm.value);
    this.adminQuery
      .getAirports(this.partnerForm.value.packages[i].country.countryCode)
      .subscribe(({ data }) => {
        this.airports[i] = data.getAirports;
        // console.log(this.airports);
      });
  }

  submitForm() {
    if (this.id === undefined) {
      console.log(this.partnerForm.value);
      this.adminMutation.addPartner(this.partnerForm.value).subscribe(data => {
        console.log(data);
        if (data) {
          this.router.navigateByUrl('/partners');
        }
      });
    } else {
      this.partnerForm.value['id'] = this.id;
      this.adminMutation
        .updatePartner(this.partnerForm.value)
        .subscribe(data => {
          console.log(data);
          if (data) {
            this.router.navigateByUrl('/partners');
          }
        });
      this.updatePackages();
    }

    // this.adminMutation.addPartner(this.partnerForm.value).subscribe(data => {
    //   console.log(data);
    // });
  }

  updatePackages() {
    const packages = this.partnerForm.controls['packages'].value;
    console.log('======packages=====');
    console.log(this.packagesForUpdate);
    packages.forEach((element, index) => {
      this.adminMutation
        .updatePackages({
          id: this.packagesForUpdate[index]._id,
          country: element.country,
          airport: element.airport,
          notes: element.notes,
          priceList: element.priceList,
        })
        .subscribe(res => {
          console.log(res);
        });
    });
  }

  testForm() {
    console.log(this.partnerForm.value);
  }
  airportChange(event) {
    console.log(event);
  }
  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.countryName === c2.countryName : c1 === c2;
  }
  compareFn2(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.airportCode === c2.airportCode : c1 === c2;
  }
}
