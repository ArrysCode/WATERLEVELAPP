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
  usuarios: any[] = [];
  cardSeleccionada!: number;
  usuariosFiltrados: any[] = []; // Arreglo de usuarios filtrados

  constructor(private authService: AuthService, private alertController: AlertController,private firestore: AngularFirestore) { }

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
      const coincideCorreo = usuario.correo.toLowerCase().includes(textoBusqueda);
      const coincideRol = usuario.rol.toString().toLowerCase().includes(textoBusqueda); // Convertir a cadena y luego buscar coincidencias
      const coincide = coincideCorreo || coincideRol; // Considerar que el usuario coincide si su correo o su rol coincide con el texto de búsqueda
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




  async editarUsuario(usuario: any) {
    console.log('Usuario a editar:', usuario);
  
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
          handler: () => {
            console.log('Opción seleccionada: Admin');
          }
        },
        {
          name: 'nuevoRol',
          type: 'radio',
          label: 'Usuario',
          value: 'user',
          checked: usuario.rol === 'user', // Marcar como seleccionado si el rol actual es 'user'
          handler: () => {
            console.log('Opción seleccionada: Usuario');
          }
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
              console.log('Data:', data); // Imprimir el objeto data completo
  
              const nuevoRol = data; // Obtener directamente el valor del nuevo rol seleccionado
  
              // Actualizar la información del usuario en Firestore
              await this.actualizarUsuario(usuario.uid, nuevoRol); // Pasar el nuevo rol como una cadena
  
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
