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
  IonSpinner
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
    IonSpinner
  ],
})
export class Tab1Page implements OnInit {

  categorias: any[] = [];
  productos: any[] = [];

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
}