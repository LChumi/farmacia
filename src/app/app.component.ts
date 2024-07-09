import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  nombreMedicamento: string = '';
  tipoMedicamento: string = '';
  cantidadProducto: number = 0;
  distribuidor: string = '';
  principal: boolean = false;
  secundaria: boolean = false;

  alerta = {
    mostrar: false,
    mensaje: '',
    tipo: '',
  };

  mostrarModal: boolean = false;
  resumenPedido: string = '';

  permitirSoloLetras(event: KeyboardEvent) {
    const regex = /^[a-zA-Z\s]*$/;
    const key = String.fromCharCode(event.keyCode);
    if (!regex.test(key)) {
      event.preventDefault();
    }
  }

  mostrarAlerta(mensaje: string, tipo: string) {
    this.alerta.mostrar = true;
    this.alerta.mensaje = mensaje;
    this.alerta.tipo = tipo;
    setTimeout(() => {
      this.alerta.mostrar = false;
    }, 3000);
  }

  mostrarResumenPedido() {
    if (
      !this.nombreMedicamento ||
      !this.tipoMedicamento ||
      !this.cantidadProducto ||
      !this.distribuidor ||
      (!this.principal && !this.secundaria)
    ) {
      this.mostrarAlerta(
        'Por favor complete todos los campos.',
        'border-red-500 text-red-500'
      );
      return;
    }

    if (this.cantidadProducto <= 0) {
      this.mostrarAlerta(
        'La cantidad del producto debe ser mayor que cero.',
        'border-red-500 text-red-500'
      );
      return;
    }

    let direccionFarmacia = '';
    if (this.principal && this.secundaria) {
      direccionFarmacia =
        'Para la farmacia situada en Calle 12 de Diciembre y para la situada en Calle Av. Quito.';
    } else if (this.principal) {
      direccionFarmacia = 'Para la farmacia situada en Calle 12 de Diciembre.';
    } else if (this.secundaria) {
      direccionFarmacia = 'Para la farmacia situada en Calle Av. Quito.';
    }
    this.resumenPedido = `Pedido al Distribuidor ${this.distribuidor}. \n\n ${this.cantidadProducto} unidades del ${this.tipoMedicamento} ${this.nombreMedicamento}. \n\n ${direccionFarmacia}`;
    this.mostrarModal = true;
  }

  confirmarPedido() {
    this.mostrarModal = false;
    console.log(this.resumenPedido);
    this.mostrarAlerta('Pedido Enviado', 'border-green-500 text-green-500');
    setTimeout(() => {
      this.borrarDatos()      
    }, 1000);
  }

  cancelarPedido() {
    this.mostrarModal = false;
    this.mostrarAlerta('Pedido Cancelado', 'border-red-500 text-red-500');
  }

  borrarDatos() {
    this.nombreMedicamento = '';
    this.tipoMedicamento = '';
    this.cantidadProducto = 0;
    this.distribuidor = '';
    this.principal = false;
    this.secundaria = false;
    this.alerta = {
      mostrar: false,
      mensaje: '',
      tipo: '',
    };
  }
}
