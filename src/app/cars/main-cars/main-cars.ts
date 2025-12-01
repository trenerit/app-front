import { Component } from '@angular/core';
import { CarsService } from '../cars-service';
import { CarModel } from '../../models/car-model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal';
import { AddModCar } from '../add-mod-car/add-mod-car';
import { SearchModel } from '../../models/search-model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-main-cars',
  standalone: false,
  templateUrl: './main-cars.html',
  styleUrl: './main-cars.scss',
})
export class MainCars {

  cars: CarModel[] = [];

  searchForm: SearchModel = {
    searchText: '',
    column: '',
  };
  
  constructor(
    private readonly carsService: CarsService,
    private readonly modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getCars();
  }

  getCars(): void {
    this.carsService.getCars().subscribe(data => {
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

  openModal(action?: string, event?: Event, carFromHtml?: CarModel): void {
    if(action === 'mod') {
      event?.stopPropagation();
    }
    const modalRef = this.modalService.open(AddModCar, {size: 'lg'});

    modalRef.componentInstance.car = carFromHtml;

    modalRef.result.then(
      (result) => {
        this.getCars();
        if(result.save) {
          console.log('if');
        }
      }
    )

  }

  searchCars() {
    let search = {};

    if (this.searchForm.column == 'brand') {
      search = { brand: this.searchForm.searchText }
    }
    if (this.searchForm.column == 'model') {
      search = { model: this.searchForm.searchText }
    }
    if (this.searchForm.column == 'price') {
      search = { price: this.searchForm.searchText }
    }
    console.log(search)
    this.carsService.searchCars(search).subscribe(data => {
      this.cars = data;
    }
    )
  }
}
