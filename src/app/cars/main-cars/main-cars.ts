import { Component } from '@angular/core';
import { CarsService } from '../cars-service';
import { CarModel } from '../../models/car-model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal';
import { AddModCar } from '../add-mod-car/add-mod-car';
import { SearchModel } from '../../models/search-model';

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
    column: 'brand',
    status: 'all'
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
      console.log('main-cars', data);
      this.cars = data;
      console.log('main-cars2', this.cars);
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
    const search = {column: this.searchForm.column, searchText: this.searchForm.searchText, status: this.searchForm.status};
    this.carsService.searchCars(search).subscribe(data => {
      this.cars = data;
    }
    )
  }

  clickColumn(event: Event) {
    event.stopPropagation();
  }

  onChange(event: Event, id: any) {
    const checkbox = event.target as HTMLInputElement;
    let is_checked = 0;
    if(checkbox.checked) {
      is_checked = 1;
    }
    this.carsService.modCarStatus(id, is_checked).subscribe(() => {
      // this.getCars();
      this.searchCars();
    });

  }
  
}
