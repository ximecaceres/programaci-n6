import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardTitle,
  IonCardContent,
  IonBadge,
  IonSpinner,
  IonButton
} from '@ionic/angular';

import { CafeteriaService } from '../services/cafeteria.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardTitle,
    IonCardContent,
    IonBadge,
    IonSpinner,
    IonButton
  ],
})
export class Tab1Page implements OnInit {

  categorias: any[] = [];
  productos: any[] = [];

  categoriaSeleccionada = 0;

  cargando = true;
  error = '';

  constructor(
    private cafeteriaService: CafeteriaService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    this.cargando = true;
    this.error = '';

    this.cafeteriaService.obtenerDatos().subscribe({
      next: (datos) => {
        this.categorias = datos.categorias;
        this.productos = datos.productos;

        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'No se pudieron cargar los datos del menú.';
        this.cargando = false;

        this.cdr.detectChanges();
      }
    });
  }

  seleccionarCategoria(id: number) {
    this.categoriaSeleccionada = id;
  }

  get productosFiltrados() {
    if (this.categoriaSeleccionada === 0) {
      return this.productos;
    }

    return this.productos.filter(
      producto => producto.categoriaId === this.categoriaSeleccionada
    );
  }

  formatearPrecio(precio: number): string {
    return 'Gs. ' + new Intl.NumberFormat('es-PY').format(precio);
  }
}