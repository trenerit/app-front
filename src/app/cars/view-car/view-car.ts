import { Component } from '@angular/core';
import { CarsService } from '../cars-service';
import { CarModel } from '../../models/car-model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-car',
  standalone: false,
  templateUrl: './view-car.html',
  styleUrl: './view-car.scss',
})
export class ViewCar {

  constructor(
    private readonly carsService: CarsService,
    private readonly route: ActivatedRoute
  ) {}
  
    car: any = [];
  
    ngOnInit() {
      this.getCar();
    }
  
    getCar(): void {
       const carId: number = this.route.snapshot.params['id'];
      this.carsService.getCar(carId).subscribe(data => {
        console.log(data);
        this.car = data;
      });
    }

}
