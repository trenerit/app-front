import { Component } from '@angular/core';
import { CarsService } from '../cars-service';

@Component({
  selector: 'app-main-cars',
  standalone: false,
  templateUrl: './main-cars.html',
  styleUrl: './main-cars.scss',
})
export class MainCars {

  constructor(private readonly carsService: CarsService) {}

  cars: any = [];

  ngOnInit() {
    this.getCars();
  }

  getCars(): void {
    this.carsService.getCars().subscribe(data => {
      console.log(data);
      this.cars = data;
    });
  }

  delCar(id: number, e :Event): void {
    e.stopPropagation();
    const conf = confirm('Czy chcesz usunąć ten samochód?');
    if(conf) {
      this.carsService.delCar(id).subscribe(() => {
        this.getCars();
      });
    }
  }
}
