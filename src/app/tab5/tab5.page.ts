import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {
  usuarios: any[] = [];
  cardSeleccionada!: number;
  usuariosFiltrados: any[] = []; // Arreglo de usuarios filtrados

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getUsuariosExceptoActual().subscribe((usuarios: any[]) => {
      this.usuarios = usuarios;
      console.log('Usuarios obtenidos:', this.usuarios); // Agregamos un log para verificar los usuarios recibidos
    });

    this.cardSeleccionada = -1;
  }

  filtrarUsuarios(event: any) {
    const textoBusqueda = event.target.value.toLowerCase(); // Obtener texto de búsqueda en minúsculas
    console.log('Texto de búsqueda:', textoBusqueda); // Imprimir el texto de búsqueda

    // Filtrar usuarios basados en el texto de búsqueda
    this.usuariosFiltrados = this.usuarios.filter(usuario => {
      const coincide = usuario.correo.toLowerCase().includes(textoBusqueda);
      if (coincide) {
        console.log('Usuario coincidente:', usuario); // Imprimir usuarios coincidentes
      }
      return coincide;
    });
  }

  seleccionarCard(index: number) {
    // Función para manejar la selección de la card
    this.cardSeleccionada = index;

    // Imprimir los datos del usuario seleccionado por consola
    console.log('Datos del usuario seleccionado:', this.usuarios[index]);
  }
}
