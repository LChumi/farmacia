import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  order = {
    medicamento: '',
    tipo: '',
    cantidad: null,
    distribuidor: '',
    sucursal: {
      principal: false,
      secundaria: false
    },
    sucursalAddress: ''
  };

  showSummary = false;

  submitOrder(form: any) {
    if (form.valid) {
      if (!this.order.sucursal.principal && !this.order.sucursal.secundaria) {
        alert('Debe seleccionar al menos una sucursal.');
        return;
      }
      this.order.sucursalAddress = this.getSucursalAddress();
      this.showSummary = true;
    }
  }

  resetForm(form: any) {
    form.resetForm();
    this.order.sucursal = { principal: false, secundaria: false };
  }

  closeSummary() {
    this.showSummary = false;
  }

  sendOrder() {
    console.log('Pedido Enviado');
    this.showSummary = false;
    this.resetForm({ resetForm: () => {} });
  }

  getSucursalAddress(): string {
    const addresses = [];
    if (this.order.sucursal.principal) addresses.push('Calle 12 de Diciembre');
    if (this.order.sucursal.secundaria) addresses.push('Calle Av. Quito');
    return addresses.join(' y ');
  }
}