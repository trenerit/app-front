import { Component, Input, OnInit } from '@angular/core';
import { CarModel } from '../../models/car-model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-mod-car',
  standalone: false,
  templateUrl: './add-mod-car.html',
  styleUrl: './add-mod-car.scss',
})
export class AddModCar {

  @Input() car!: CarModel;

  carInputForm!: CarModel;

  add: boolean = true;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    // console.log('car in modal', this.car);
    // console.log('active modal', this.activeModal);

    if(this.car) {
      this.carInputForm = {brand: this.car.brand, model: this.car.model, price: this.car.price};
      this.add = false;
    } else {
      this.carInputForm = {brand: '', model: '', price: 0};
    }
  }

  onSave(formData: NgForm) {
    this.activeModal.close({save: true});
  }
  
  onClose() {
    this.activeModal.close({save: false});
  }

}
