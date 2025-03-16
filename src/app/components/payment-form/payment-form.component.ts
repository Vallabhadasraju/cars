import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Car } from '../../models/car.model';

@Component({
  selector: 'app-payment-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 class="text-2xl font-bold mb-6">Payment Details</h2>
      
      <!-- Payment Method Selection -->
      <div class="mb-6">
        <label class="block text-sm font-medium mb-2">Select Payment Method</label>
        <div class="grid grid-cols-2 gap-4">
          <button type="button"
            [class]="paymentMethod === 'card' ? 'btn-primary' : 'btn-secondary'"
            (click)="selectPaymentMethod('card')">
            <i class="fas fa-credit-card mr-2"></i>Card
          </button>
          <button type="button"
            [class]="paymentMethod === 'netbanking' ? 'btn-primary' : 'btn-secondary'"
            (click)="selectPaymentMethod('netbanking')">
            <i class="fas fa-mobile-alt mr-2"></i>UPI & Net Banking
          </button>
        </div>
      </div>

      <!-- Credit/Debit Card Form -->
      @if (paymentMethod === 'card') {
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-2">Card Number</label>
            <input 
              type="text" 
              [(ngModel)]="cardNumber"
              name="cardNumber"
              required
              pattern="[0-9]{16}"
              class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="1234 5678 9012 3456">
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-2">Expiry Date</label>
              <input 
                type="text" 
                [(ngModel)]="expiryDate"
                name="expiryDate"
                required
                pattern="(0[1-9]|1[0-2])\/[0-9]{2}"
                class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="MM/YY">
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">CVV</label>
              <input 
                type="text" 
                [(ngModel)]="cvv"
                name="cvv"
                required
                pattern="[0-9]{3,4}"
                class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="123">
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium mb-2">Name on Card</label>
            <input 
              type="text" 
              [(ngModel)]="cardName"
              name="cardName"
              required
              class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="John Doe">
          </div>
        </div>
      }

      <!-- Net Banking & UPI Form -->
      @if (paymentMethod === 'netbanking') {
        <div class="space-y-6">
          <!-- UPI Apps -->
          <div>
            <label class="block text-sm font-medium mb-4">Popular Payment Methods</label>
            <div class="grid grid-cols-3 gap-4">
              <button 
                type="button"
                [class]="selectedPaymentApp === 'phonepe' ? 'payment-app-btn-active' : 'payment-app-btn'"
                (click)="selectPaymentApp('phonepe')">
                <img src="https://download.logo.wine/logo/PhonePe/PhonePe-Logo.wine.png" 
                     alt="PhonePe" 
                     class="h-8 w-auto mx-auto mb-2">
                <span class="text-sm">PhonePe</span>
              </button>
              <button 
                type="button"
                [class]="selectedPaymentApp === 'gpay' ? 'payment-app-btn-active' : 'payment-app-btn'"
                (click)="selectPaymentApp('gpay')">
                <img src="https://download.logo.wine/logo/Google_Pay/Google_Pay-Logo.wine.png" 
                     alt="Google Pay" 
                     class="h-8 w-auto mx-auto mb-2">
                <span class="text-sm">Google Pay</span>
              </button>
              <button 
                type="button"
                [class]="selectedPaymentApp === 'paytm' ? 'payment-app-btn-active' : 'payment-app-btn'"
                (click)="selectPaymentApp('paytm')">
                <img src="https://download.logo.wine/logo/Paytm/Paytm-Logo.wine.png" 
                     alt="Paytm" 
                     class="h-8 w-auto mx-auto mb-2">
                <span class="text-sm">Paytm</span>
              </button>
            </div>
          </div>

          <!-- UPI ID Input -->
          @if (selectedPaymentApp) {
            <div>
              <label class="block text-sm font-medium mb-2">Enter UPI ID</label>
              <div class="flex">
                <input 
                  type="text" 
                  [(ngModel)]="upiId"
                  name="upiId"
                  required
                  class="flex-1 px-3 py-2 border rounded-l-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="username@upi">
                <button 
                  class="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700"
                  (click)="verifyUpi()">
                  Verify
                </button>
              </div>
            </div>
          }

          <!-- Traditional Net Banking -->
          <div class="border-t pt-6">
            <label class="block text-sm font-medium mb-2">Or Select Bank for Net Banking</label>
            <select 
              [(ngModel)]="selectedBank"
              name="selectedBank"
              class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
              <option value="">Choose your bank</option>
              <option value="sbi">State Bank of India</option>
              <option value="hdfc">HDFC Bank</option>
              <option value="icici">ICICI Bank</option>
              <option value="axis">Axis Bank</option>
              <option value="pnb">Punjab National Bank</option>
            </select>
          </div>
        </div>
      }

      <!-- Payment Summary -->
      <div class="border-t pt-6 mt-6">
        <p class="text-lg font-semibold mb-2">Payment Summary</p>
        <div class="flex justify-between mb-2">
          <span>Car Price:</span>
          <span>{{ car.price | currency }}</span>
        </div>
        <div class="flex justify-between mb-2">
          <span>Tax (10%):</span>
          <span>{{ car.price * 0.1 | currency }}</span>
        </div>
        <div class="border-t pt-2 flex justify-between font-bold">
          <span>Total:</span>
          <span>{{ car.price * 1.1 | currency }}</span>
        </div>
      </div>

      <!-- Pay Now Button -->
      <button 
        (click)="processPayment()"
        [disabled]="!isFormValid() || processing"
        class="w-full btn-primary mt-6">
        {{ processing ? 'Processing...' : 'Pay Now' }}
      </button>
    </div>
  `,
  styles: [`
    .payment-app-btn {
      @apply flex flex-col items-center justify-center p-4 border rounded-lg 
             hover:border-blue-500 transition-colors duration-200
             bg-white dark:bg-gray-700;
    }
    .payment-app-btn-active {
      @apply flex flex-col items-center justify-center p-4 rounded-lg
             border-2 border-blue-500 bg-blue-50 dark:bg-gray-600
             transition-colors duration-200;
    }
  `]
})
export class PaymentFormComponent {
  @Input() car!: Car;
  @Output() paymentComplete = new EventEmitter<void>();
  
  // Common fields
  processing: boolean = false;
  paymentMethod: 'card' | 'netbanking' = 'card';

  // Card payment fields
  cardNumber: string = '';
  expiryDate: string = '';
  cvv: string = '';
  cardName: string = '';

  // Net banking and UPI fields
  selectedBank: string = '';
  selectedPaymentApp: 'phonepe' | 'gpay' | 'paytm' | '' = '';
  upiId: string = '';
  accountName: string = '';

  selectPaymentMethod(method: 'card' | 'netbanking') {
    this.paymentMethod = method;
    this.resetFields();
  }

  selectPaymentApp(app: 'phonepe' | 'gpay' | 'paytm') {
    this.selectedPaymentApp = app;
    this.selectedBank = '';
  }

  verifyUpi() {
    // Simulate UPI verification
    alert('UPI verification successful!');
  }

  resetFields() {
    // Reset all form fields
    this.cardNumber = '';
    this.expiryDate = '';
    this.cvv = '';
    this.cardName = '';
    this.selectedBank = '';
    this.selectedPaymentApp = '';
    this.upiId = '';
    this.accountName = '';
  }

  isFormValid(): boolean {
    switch (this.paymentMethod) {
      case 'card':
        return !!(this.cardNumber && this.expiryDate && this.cvv && this.cardName);
      case 'netbanking':
        return !!(this.selectedBank || (this.selectedPaymentApp && this.upiId));
      default:
        return false;
    }
  }

  processPayment() {
    if (!this.isFormValid()) return;
    
    this.processing = true;
    // Simulate payment processing
    setTimeout(() => {
      this.processing = false;
      alert('Payment processed successfully!');
      this.paymentComplete.emit();
    }, 2000);
  }
}