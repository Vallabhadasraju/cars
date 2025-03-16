import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CarService } from '../../services/car.service';
import { Car } from '../../models/car.model';

@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-4xl font-bold mb-8 text-center">Luxury & Performance Cars</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        @for (car of cars; track car.id) {
          <div class="card group hover:shadow-xl transition-all duration-300">
            <div class="relative overflow-hidden rounded-t-lg">
              <img 
                [src]="car.imageUrl" 
                [alt]="car.make + ' ' + car.model" 
                class="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
              >
              <div class="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {{ car.year }}
              </div>
            </div>
            <div class="p-6">
              <div class="flex justify-between items-start mb-4">
                <div>
                  <h3 class="text-2xl font-bold">{{ car.make }} {{ car.model }}</h3>
                  <p class="text-3xl font-bold text-blue-600 mt-2">{{ car.price | currency }}</p>
                </div>
                <div class="flex items-center">
                  <span class="text-yellow-400 text-xl mr-1">★</span>
                  <span class="font-semibold">{{ car.rating }}/5</span>
                </div>
              </div>
              
              <div class="grid grid-cols-2 gap-4 mb-6 text-sm">
                <div class="flex items-center">
                  <i class="fas fa-engine text-gray-500 mr-2"></i>
                  <span>{{ car.specifications.engine }}</span>
                </div>
                <div class="flex items-center">
                  <i class="fas fa-gas-pump text-gray-500 mr-2"></i>
                  <span>{{ car.specifications.fuelType }}</span>
                </div>
                <div class="flex items-center">
                  <i class="fas fa-tachometer-alt text-gray-500 mr-2"></i>
                  <span>{{ car.specifications.mileage }}</span>
                </div>
                <div class="flex items-center">
                  <i class="fas fa-cog text-gray-500 mr-2"></i>
                  <span>{{ car.specifications.transmission }}</span>
                </div>
              </div>

              <p class="text-gray-600 dark:text-gray-300 mb-6 line-clamp-2">{{ car.description }}</p>
              
              <div class="flex space-x-4">
                <button 
                  [routerLink]="['/cars', car.id]"
                  class="btn-primary flex-1 flex items-center justify-center"
                >
                  <i class="fas fa-info-circle mr-2"></i>View Details
                </button>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `
})
export class CarListComponent implements OnInit {
  cars: Car[] = [];

  constructor(private carService: CarService) {}

  ngOnInit() {
    this.carService.getCars().subscribe(cars => {
      this.cars = cars;
    });
  }
}