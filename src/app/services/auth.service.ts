import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import { AlertController } from '@ionic/angular';
import { Usuario } from './interfaces'; // Importa la interfaz Usuario
import firebase from 'firebase/compat/app'; // Importa el módulo de Firebase
import 'firebase/compat/auth'; // Importa el módulo de autenticación de Firebase
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { switchMap} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private alertController: AlertController,
    private router: Router
    ) {
      
     }

     hasRequiredRole(userData: Usuario): boolean {
      // Aquí implementa la lógica para verificar si el usuario tiene el rol requerido
      // Por ejemplo, si el rol es 'admin', puedes verificar si el usuario tiene ese rol
      // Puedes basarte en la estructura de tu interfaz Usuario y en cómo se almacenan los roles en Firestore
      // Por ejemplo, si el rol es un array en userData, puedes hacer algo como esto:
      return userData.rol.includes('admin');
    }

    async login(email: string, password: string) {
      try {
        const credential = await this.afAuth.signInWithEmailAndPassword(email, password);
        if (credential && credential.user) {
          const userId = credential.user.uid;
          const userData = await this.getUserData(userId); // Obtener los datos del usuario desde Firestore
    
          if (userData) {
            console.log('Datos del usuario:', userData);
            
            // Verificar si el usuario es administrador si userData no es null
            const isAdmin = this.hasRequiredRole(userData);
            console.log('¿Es administrador?', isAdmin);
          } else {
            console.error('No se encontraron datos del usuario.');
          }
    
          return { user: credential.user, userData };
        } else {
          throw new Error('No se pudo iniciar sesión.');
        }
      } catch (error: any) {
        this.presentAlert('Error', 'Error al iniciar sesión, correo o contraseña incorrectos');
        return null;
      }
    }
    
    
    
    
    async getUserData(userId: string): Promise<Usuario | null> {
      try {
        const userDoc = await this.firestore.collection('usuarios').doc(userId).get().toPromise();
        if (userDoc && userDoc.exists) {
          const userData = userDoc.data() as Usuario;
          userData.uid = userId; // Asegúrate de incluir el UID del documento en el objeto del usuario
          return userData;
        } else {
          console.error('No se encontraron datos de usuario en Firestore.');
          return null;
        }
      } catch (error) {
        console.error('Error al obtener los datos de usuario:', error);
        return null;
      }
    }
    
    getCurrentUser2() {
      return this.afAuth.authState;
    }
    getUserRoles(userId: string) {
      return this.firestore.collection('usuarios').doc(userId).valueChanges().pipe(
        map((user: any) => user ? user.rol : [])
      );
    }
    
    async getCurrentUser() {
      return this.afAuth.currentUser;
    }
    
  

    async signup(email: string, password: string): Promise<{ success: boolean, message: string }> {
      if (!this.validateEmail(email)) {
        return { success: false, message: 'Por favor, ingrese un correo electrónico válido.' };
      }
      if (!password || password.length < 6) {
        return { success: false, message: 'La contraseña debe tener al menos 6 caracteres.' };
      }
    
      try {
        // Verificar si el usuario ya está registrado con el mismo correo electrónico
        const existingUser = await this.afAuth.fetchSignInMethodsForEmail(email);
        if (existingUser && existingUser.length > 0) {
          // Si ya existe un usuario con el mismo correo electrónico, retornar un error
          const errorMessage = 'Ya existe un usuario registrado con este correo electrónico.';
          return { success: false, message: errorMessage };
        }
    
        // Si no hay un usuario registrado con el mismo correo electrónico, crear uno nuevo
        const credential = await this.afAuth.createUserWithEmailAndPassword(email, password);
        if (credential && credential.user && credential.user.uid) {
          await this.createUserInFirestore(credential.user.uid, email);
          await this.showUserData(); // Mostrar datos en la consola después de crear el usuario en Firestore
          return { success: true, message: 'Usuario creado exitosamente' };
        } else {
          throw new Error('No se pudo obtener la información del usuario después del registro.');
        }
      } catch (error: any) {
        // Extraer el mensaje relevante del error de Firebase
        let errorMessage = 'Error al registrar: ' + error.message;
        if (error.code === 'auth/email-already-in-use') {
          errorMessage = 'Ya existe un usuario con estas credenciales. Por favor Inicie sesión';
        }
        return { success: false, message: errorMessage };
      }
    }
    
    
    
    private async createUserInFirestore(uid: string, email: string) {
      try {
        // Aquí se crea el usuario en Firestore
        await this.firestore.collection('usuarios').doc(uid).set({
          correo: email,
          rol: ['user'], // Asignamos el rol 'user' por defecto
          uid: uid
        });
        // Si la escritura en Firestore fue exitosa, no hay necesidad de devolver un valor
      } catch (error) {
        throw error; // Propagamos el error si ocurre algún problema al escribir en Firestore
      }
    }
  

  private async showUserData() {
    try {
      const usuariosSnapshot = await this.firestore.collection('usuarios').get().toPromise();
      if (usuariosSnapshot) {
        usuariosSnapshot.forEach(doc => {
          const usuarioData = doc.data() as Usuario; // Convertir a tipo Usuario
          console.log('Correo:', usuarioData.correo, 'Rol:', usuarioData.rol);
        });
      } else {
        console.log('No se encontraron usuarios.');
      }
    } catch (error) {
      console.error('Error al obtener los datos de usuarios:', error);
    }
  }

  async logout() {
    try {
      await this.afAuth.signOut(); // Cerrar sesión en Firebase
      localStorage.removeItem('user'); // Eliminar información de usuario del almacenamiento local
      sessionStorage.clear(); // Limpiar el almacenamiento de sesión
      this.router.navigate(['/login']); // Redirigir al usuario a la página de inicio de sesión
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }

  private async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

  private validateEmail(email: string): boolean {
    // Utilizamos una expresión regular para validar el formato del correo electrónico
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(email);
  }


  // Método para obtener la lista de usuarios, excluyendo al usuario autenticado actualmente
  getUsuariosExceptoActual(): Observable<any[]> {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        console.log('Usuario actual:', user); // Agrega un log para verificar el usuario actual
        if (user) {
          // Si hay un usuario autenticado, obtenemos la lista de usuarios excluyendo al usuario actual
          return this.firestore.collection('usuarios').valueChanges().pipe(
            map((usuarios: any[]) => usuarios.filter(usuario => usuario.correo !== user.email))
          );
        } else {
          // Si no hay usuario autenticado, devolvemos un array vacío
          return [];
        }
      })
    );
  }

  // Agrega otros métodos según sea necesario, como verificar el estado de la autenticación, etc.
}
