import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WishlistService } from '../../services/wishlist.service';
import { Car } from '../../models/car.model';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold">My Wishlist</h1>
        <button class="btn-secondary" routerLink="/">
          <i class="fas fa-arrow-left mr-2"></i>Back to Home
        </button>
      </div>

      @if (wishlistItems.length === 0) {
        <div class="text-center py-12">
          <i class="fas fa-heart text-gray-400 text-5xl mb-4"></i>
          <p class="text-xl text-gray-600 dark:text-gray-400">Your wishlist is empty</p>
          <button routerLink="/" class="btn-primary mt-4">
            Browse Cars
          </button>
        </div>
      } @else {
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (car of wishlistItems; track car.id) {
            <div class="card group">
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
                  <button 
                    class="text-red-500 hover:text-red-600 transition-colors duration-200"
                    (click)="removeFromWishlist(car.id)"
                  >
                    <i class="fas fa-heart text-2xl"></i>
                  </button>
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
                </div>

                <p class="text-gray-600 dark:text-gray-300 mb-6 line-clamp-2">{{ car.description }}</p>
                
                <button 
                  [routerLink]="['/cars', car.id]"
                  class="btn-primary w-full"
                >
                  View Details
                </button>
              </div>
            </div>
          }
        </div>
      }
    </div>
  `
})
export class WishlistComponent implements OnInit {
  wishlistItems: Car[] = [];

  constructor(private wishlistService: WishlistService) {}

  ngOnInit() {
    this.wishlistService.getWishlist().subscribe(items => {
      this.wishlistItems = items;
    });
  }

  removeFromWishlist(carId: string) {
    this.wishlistService.removeFromWishlist(carId);
  }
} 