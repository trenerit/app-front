import { Component, Input, OnInit } from '@angular/core';
import { CarModel } from '../../models/car-model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { CarsService } from '../cars-service';

@Component({
  selector: 'app-add-mod-car',
  standalone: false,
  templateUrl: './add-mod-car.html',
  styleUrl: './add-mod-car.scss',
})
export class AddModCar {

  @Input() car!: CarModel;

  protected carInputForm!: CarModel;

  protected idCar: number = 0;

  protected startObject = {};
  
  protected endObject = {};

  constructor(
    public activeModal: NgbActiveModal,
    protected readonly carsService: CarsService,
  ) {}

  ngOnInit(): void {
    // console.log('car in modal', this.car);
    // console.log('active modal', this.activeModal);

    if(this.car) {

      this.carInputForm = {brand: this.car.brand, model: this.car.model, price: this.car.price};
      this.idCar = this.car.id!;
    } else {
      this.carInputForm = {brand: '', model: '', price: 0};
    }
  }

  private addNewCar(car: CarModel): void {
    this.carsService.addCar(car).subscribe(() => {
      this.activeModal.close({save: true});
    });
  }
  
  private modCar(car: CarModel): void {
    this.carsService.modCar(this.idCar, car).subscribe(() => {
      this.activeModal.close({save: true});
    });
  }
  
  
  
  protected onSave(formData: NgForm) {
    
    if(this.idCar > 0)
      this.modCar(formData.value); 
    else  
      this.addNewCar(formData.value); 
  }
  
  protected onClose() {
    
    this.activeModal.close({save: false});
  }

}
