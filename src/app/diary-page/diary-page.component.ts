import { Component, OnInit, TemplateRef } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { userStore } from '../user-store';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-diary-page',
  templateUrl: './diary-page.component.html',
  styleUrls: ['./diary-page.component.scss'],
})
export class DiaryPageComponent implements OnInit {
  form: any = <any>{};
  diariesCollection: AngularFirestoreCollection;
  store = userStore;
  addModalRef: BsModalRef;
  editModalRef: BsModalRef;
  selectedDiary: any = <any>{};
  diaries: Observable<any[]>;
  diarieEntries: any[] = [];
  constructor(
    private modalService: BsModalService,
    public afs: AngularFirestore
  ) {}
  ngOnInit() {
    this.getDiaries();
  }
  getDiaries() {
    this.diariesCollection = this.afs.collection('diaries', (ref) =>
      ref.where('userId', '==', this.store.user.uid)
    );
    this.diaries = this.diariesCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((_) => {
          const object = _.payload.doc.data();
          object.id = _.payload.doc.id;
          return object;
        })
      )
    );
    this.diaries.subscribe((diaries) => {
      this.diarieEntries = diaries;
    });
  }
  openAddModal(template: TemplateRef<any>) {
    this.addModalRef = this.modalService.show(template);
  }
  openEditModal(template: TemplateRef<any>, selectedDiary) {
    this.editModalRef = this.modalService.show(template);
    this.selectedDiary = selectedDiary;
  }
  closeModals() {
    this.addModalRef && this.addModalRef.hide();
    this.editModalRef && this.editModalRef.hide();
  }
  deleteDiary(id: string) {
    const diary = this.afs.doc(`diaries/${id}`);
    diary.delete();
  }
}
