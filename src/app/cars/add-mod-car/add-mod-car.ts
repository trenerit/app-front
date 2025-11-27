import { Component, Input, OnInit } from '@angular/core';
import { CarModel } from '../../models/car-model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-mod-car',
  standalone: false,
  templateUrl: './add-mod-car.html',
  styleUrl: './add-mod-car.scss',
})
export class AddModCar implements OnInit {

  @Input() car!: CarModel;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    console.log('car in modal', this.car);
    console.log('active modal', this.activeModal);
  }

}
