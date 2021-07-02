import {
  Component,
  OnInit,
  TemplateRef,
  EventEmitter,
  Output,
  Input,
  SimpleChanges,
} from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { userStore } from '../user-store';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-diary-form',
  templateUrl: './diary-form.component.html',
  styleUrls: ['./diary-form.component.scss'],
})
export class DiaryFormComponent implements OnInit {
  diaries: any[] = [];
  diariesCollection: AngularFirestoreCollection;
  store = userStore;
  addModalRef: BsModalRef;
  editModalRef: BsModalRef;
  form: any = <any>{};
  @Output('saved') saved = new EventEmitter();
  @Input() edit: boolean;
  @Input() selectedDiary: any;
  constructor(
    public afs: AngularFirestore,
    private modalService: BsModalService
  ) {}
  ngOnInit() {
    this.getDiaries();
  }
  ngOnChanges(changes: SimpleChanges) {
    this.form = Object.assign({}, this.selectedDiary);
  }
  getDiaries() {
    this.diariesCollection = this.afs.collection('diaries', (ref) =>
      ref.where('userId', '==', this.store.user.uid)
    );
  }
  async save(diaryForm: NgForm) {
    if (diaryForm.invalid) {
      return;
    }
    this.form.userId = this.store.user.uid;
    if (this.edit) {
      await this.diariesCollection.doc(this.selectedDiary.id).update(this.form);
    } else {
      await this.diariesCollection.add(this.form);
    }
    this.saved.emit();
    this.getDiaries();
  }
}
