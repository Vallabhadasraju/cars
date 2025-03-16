import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CarService } from '../../services/car.service';
import { WishlistService } from '../../services/wishlist.service';
import { Car } from '../../models/car.model';
import { PaymentFormComponent } from '../payment-form/payment-form.component';

@Component({
  selector: 'app-car-details',
  standalone: true,
  imports: [CommonModule, RouterLink, PaymentFormComponent],
  template: `
    @if (car) {
      <div class="container mx-auto px-4 py-8">
        <!-- Navigation -->
        <div class="flex justify-between items-center mb-6">
          <button class="btn-secondary" routerLink="/">
            <i class="fas fa-home mr-2"></i>Home
          </button>
          <button class="btn-secondary" routerLink="/wishlist">
            <i class="fas fa-heart mr-2"></i>Wishlist
          </button>
        </div>

        <!-- Car Details -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <img [src]="car.imageUrl" [alt]="car.make + ' ' + car.model" class="w-full h-96 object-cover">
          <div class="p-6">
            <h1 class="text-3xl font-bold mb-4">{{ car.make }} {{ car.model }} {{ car.year }}</h1>
            <p class="text-2xl text-blue-600 dark:text-blue-400 mb-4">{{ car.price | currency }}</p>
            <p class="text-gray-600 dark:text-gray-300 mb-6">{{ car.description }}</p>
            
            <div class="grid grid-cols-2 gap-4 mb-6">
              <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h3 class="font-semibold mb-2">Engine</h3>
                <p>{{ car.specifications.engine }}</p>
              </div>
              <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h3 class="font-semibold mb-2">Transmission</h3>
                <p>{{ car.specifications.transmission }}</p>
              </div>
              <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h3 class="font-semibold mb-2">Mileage</h3>
                <p>{{ car.specifications.mileage }}</p>
              </div>
              <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h3 class="font-semibold mb-2">Fuel Type</h3>
                <p>{{ car.specifications.fuelType }}</p>
              </div>
            </div>
            
            <div class="flex space-x-4">
              <button class="btn-primary flex-1" (click)="showPaymentForm()">
                <i class="fas fa-shopping-cart mr-2"></i>Buy Now
              </button>
              <button class="btn-secondary" (click)="toggleWishlist()">
                <i [class]="isInWishlist ? 'fas fa-heart text-red-500' : 'far fa-heart'" class="mr-2"></i>
                {{ isInWishlist ? 'Saved' : 'Save' }}
              </button>
            </div>
          </div>
        </div>

        <!-- Payment Form Modal -->
        @if (showingPaymentForm) {
          <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div class="max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
              <button 
                (click)="hidePaymentForm()" 
                class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <i class="fas fa-times text-xl"></i>
              </button>
              <app-payment-form [car]="car" (paymentComplete)="onPaymentComplete()"></app-payment-form>
            </div>
          </div>
        }
      </div>
    }
  `
})
export class CarDetailsComponent implements OnInit {
  car?: Car;
  showingPaymentForm = false;
  isInWishlist = false;

  constructor(
    private route: ActivatedRoute,
    private carService: CarService,
    private wishlistService: WishlistService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.carService.getCarById(id).subscribe(car => {
        this.car = car;
        if (car) {
          this.isInWishlist = this.wishlistService.isInWishlist(car);
        }
      });
    }
  }

  showPaymentForm() {
    this.showingPaymentForm = true;
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
  }

  hidePaymentForm() {
    this.showingPaymentForm = false;
    // Restore body scrolling
    document.body.style.overflow = 'auto';
  }

  onPaymentComplete() {
    this.hidePaymentForm();
    // Navigate to home page after successful payment
    window.location.href = '/';
  }

  toggleWishlist() {
    if (!this.car) return;
    
    if (this.isInWishlist) {
      this.wishlistService.removeFromWishlist(this.car.id);
    } else {
      this.wishlistService.addToWishlist(this.car);
    }
    this.isInWishlist = !this.isInWishlist;
  }
}