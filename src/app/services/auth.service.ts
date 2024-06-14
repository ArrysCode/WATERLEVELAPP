import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
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
    // Configura la persistencia de sesión para mantener la sesión iniciada incluso después de salir de la aplicación
    this.afAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  }

  // Método para verificar si un usuario tiene un rol específico
  hasRequiredRole(userData: Usuario): boolean {
    return userData.rol.includes('admin');
  }

  // Método para iniciar sesión
  async login(email: string, password: string) {
    try {
      const credential = await this.afAuth.signInWithEmailAndPassword(email, password);
      if (credential && credential.user) {
        localStorage.setItem('user', JSON.stringify(credential.user));
        const userId = credential.user.uid;
        const userData = await this.getUserData(userId); // Obtener los datos del usuario desde Firestore
        if (userData) {
          // Verificar si el usuario es administrador si userData no es null
          const isAdmin = this.hasRequiredRole(userData);
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

  // Método para obtener los datos de un usuario desde Firestore
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

  // Método para obtener el usuario actual
  getCurrentUser2() {
    return this.afAuth.authState;
  }

  // Método para obtener los roles de un usuario
  getUserRoles(userId: string) {
    return this.firestore.collection('usuarios').doc(userId).valueChanges().pipe(
      map((user: any) => user ? user.rol : [])
    );
  }

  // Método para obtener el usuario actual
  async getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // Método para registrar un nuevo usuario
  async signup(email: string, password: string): Promise<{ success: boolean, message: string }> {
    if (!this.validateEmail(email)) {
      return { success: false, message: 'Por favor, ingrese un correo electrónico válido.' };
    }
    if (!password || password.length < 6) {
      return { success: false, message: 'La contraseña debe tener al menos 6 caracteres.' };
    }

    try {
      const existingUser = await this.afAuth.fetchSignInMethodsForEmail(email);
      if (existingUser && existingUser.length > 0) {
        const errorMessage = 'Ya existe un usuario registrado con este correo electrónico.';
        return { success: false, message: errorMessage };
      }

      const credential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      if (credential && credential.user && credential.user.uid) {
        await this.createUserInFirestore(credential.user.uid, email);
        return { success: true, message: 'Usuario creado exitosamente' };
      } else {
        throw new Error('No se pudo obtener la información del usuario después del registro.');
      }
    } catch (error: any) {
      let errorMessage = 'Error al registrar: ' + error.message;
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Ya existe un usuario con estas credenciales. Por favor Inicie sesión';
      }
      return { success: false, message: errorMessage };
    }
  }

  // Método para crear un usuario en Firestore
  private async createUserInFirestore(uid: string, email: string) {
    try {
      await this.firestore.collection('usuarios').doc(uid).set({
        correo: email,
        rol: ['user'], // Asignamos el rol 'user' por defecto
        uid: uid
      });
    } catch (error) {
      throw error;
    }
  }

  // Método para mostrar los datos del usuario en la consola
  private async showUserData() {
    try {
      const usuariosSnapshot = await this.firestore.collection('usuarios').get().toPromise();
      if (usuariosSnapshot) {
        usuariosSnapshot.forEach(doc => {
          const usuarioData = doc.data() as Usuario;
        });
      } else {
        console.log('No se encontraron usuarios.');
      }
    } catch (error) {
      console.error('Error al obtener los datos de usuarios:', error);
    }
  }

  // Método para cerrar sesión
  async logout() {
    try {
      await this.afAuth.signOut();
      localStorage.removeItem('user');
      sessionStorage.clear();
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }

  // Método para presentar una alerta
  private async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

  // Método para validar un correo electrónico
  private validateEmail(email: string): boolean {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(email);
  }

  // Método para obtener la lista de usuarios, excluyendo al usuario autenticado actualmente
  getUsuariosExceptoActual(): Observable<any[]> {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.firestore.collection('usuarios').valueChanges().pipe(
            map((usuarios: any[]) => usuarios.filter(usuario => usuario.correo !== user.email))
          );
        } else {
          return [];
        }
      })
    );
  }

  // Agrega otros métodos según sea necesario, como verificar el estado de la autenticación, etc.
}
