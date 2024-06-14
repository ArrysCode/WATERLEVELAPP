import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {
  usuarios: any[] = []; // Lista de usuarios obtenidos
  cardSeleccionada!: number; // Índice de la card seleccionada
  usuariosFiltrados: any[] = []; // Arreglo de usuarios filtrados

  constructor(private authService: AuthService, private alertController: AlertController, private firestore: AngularFirestore) { }

  ngOnInit() {
    // Obtener la lista de usuarios excluyendo el usuario actual
    this.authService.getUsuariosExceptoActual().subscribe((usuarios: any[]) => {
      this.usuarios = usuarios;
    });

    // Inicializar la card seleccionada
    this.cardSeleccionada = -1;
  }

  // Método para filtrar usuarios
  filtrarUsuarios(event: any) {
    const textoBusqueda = event.target.value.toLowerCase(); // Obtener texto de búsqueda en minúsculas
  
    // Filtrar usuarios basados en el texto de búsqueda
    this.usuariosFiltrados = this.usuarios.filter(usuario => {
      const coincideCorreo = usuario.correo.toLowerCase().includes(textoBusqueda);
      const coincideRol = usuario.rol.toString().toLowerCase().includes(textoBusqueda); // Convertir a cadena y luego buscar coincidencias
      const coincide = coincideCorreo || coincideRol; // Considerar que el usuario coincide si su correo o su rol coincide con el texto de búsqueda
      return coincide;
    });
  }

  // Método para seleccionar una card
  seleccionarCard(index: number) {
    // Asignar el índice de la card seleccionada
    this.cardSeleccionada = index;
  }

  // Método para editar un usuario
  async editarUsuario(usuario: any) {
    const alert = await this.alertController.create({
      header: 'Editar Usuario',
      subHeader: usuario.correo,
      message: `Rol actual: ${usuario.rol}`,
      inputs: [
        {
          name: 'nuevoRol',
          type: 'radio',
          label: 'Admin',
          value: 'admin',
          checked: usuario.rol === 'admin', // Marcar como seleccionado si el rol actual es 'admin'
        },
        {
          name: 'nuevoRol',
          type: 'radio',
          label: 'Usuario',
          value: 'user',
          checked: usuario.rol === 'user', // Marcar como seleccionado si el rol actual es 'user'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Guardar',
          handler: async (data) => {
            try {
              const nuevoRol = data.nuevoRol; // Obtener el nuevo rol seleccionado
  
              // Actualizar la información del usuario en Firestore
              await this.actualizarUsuario(usuario.uid, nuevoRol);
  
              // Mostrar una alerta de éxito cuando se actualiza el usuario
              const alert = await this.alertController.create({
                header: 'Éxito',
                message: 'Usuario actualizado correctamente.',
                buttons: ['OK']
              });
              await alert.present();
            } catch (error) {
              console.error('Error al actualizar usuario:', error);
            }
          }
        }
      ]
    });
  
    await alert.present();
  }
  
  // Método para actualizar el rol de un usuario en Firestore
  async actualizarUsuario(uid: string, nuevoRol: string) {
    try {
      if (nuevoRol !== undefined) { // Verificar si nuevoRol tiene un valor definido
        const usuarioRef = this.firestore.collection('usuarios').doc(uid);
        await usuarioRef.update({
          rol: nuevoRol
        });
      } else {
        console.error('El nuevo rol es indefinido.');
      }
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      throw error; // Propagar el error para manejarlo en la función llamadora si es necesario
    }
  }
}
