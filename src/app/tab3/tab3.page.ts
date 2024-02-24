import { Component, inject } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  constructor(public db: AngularFireDatabase) {
    this.getMeasures();
  }

  getMeasures() {
    const path = "test/"

    this.db.list(path).valueChanges().subscribe(res => {
      console.log("Mediciones: ", res);
    })
  }
}
