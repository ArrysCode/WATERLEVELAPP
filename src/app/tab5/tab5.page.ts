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
    console.log('Usuario a editar:', usuario); // Agregar log para verificar el usuario seleccionado

    const alert = await this.alertController.create({
      header: 'Editar Usuario',
      subHeader: usuario.correo,
      message: `Rol actual: ${usuario.rol}`,
      inputs: [
        {
          name: 'nuevoCorreo',
          type: 'text',
          placeholder: 'Nuevo correo electrónico'
        },
        {
          name: 'nuevoRol',
          type: 'text',
          placeholder: 'Nuevo rol'
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
              // Verificar si se proporcionó un nuevo correo electrónico
              const nuevoCorreo = data.nuevoCorreo.trim() !== '' ? data.nuevoCorreo.trim() : usuario.correo;
              
              // Verificar si se proporcionó un nuevo rol
              const nuevoRol = data.nuevoRol.trim() !== '' ? data.nuevoRol.trim() : usuario.rol;

              // Actualizar la información del usuario en Firestore
              await this.actualizarUsuario(usuario, nuevoCorreo, nuevoRol);
            } catch (error) {
              console.error('Error al actualizar usuario:', error);
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async actualizarUsuario(usuario: any, nuevoCorreo: string, nuevoRol: string) {
    try {
      const usuarioRef = this.firestore.collection('usuarios').doc(usuario.uid);
      await usuarioRef.update({
        correo: nuevoCorreo,
        rol: nuevoRol
      });
      
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
