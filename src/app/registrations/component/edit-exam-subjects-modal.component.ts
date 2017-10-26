import {ExamSubjectCRUD} from '../../core/certificates/exam-subject-crud';
import {Component, EventEmitter, Input, OnInit, OnChanges, Output, SimpleChange, SimpleChanges} from '@angular/core';

import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-edit-exam-subjects-modal',
  templateUrl: './edit-exam-subjects-modal.component.html'
})
export class EditExamSubjectsModalComponent implements OnInit, OnChanges {

  @Input() examSubjects: ExamSubjectCRUD[][];
  @Input() sourceExamSubjectMarks: {subject: ExamSubjectCRUD, mark: number}[];
  editableExamSubjectMarks: {subject: ExamSubjectCRUD, mark: number}[];

  averageMark = 0;

  subjectMarkMask = [/[0-9]/, /[0-9]/, /[0-9]/];

  @Output() onSave: EventEmitter<{subject: ExamSubjectCRUD, mark: number}[]> = new EventEmitter();

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    let change: SimpleChange;
    change = changes['examSubjects'];
    if (change && change.currentValue) {
      this.examSubjects = change.currentValue;
      this.sourceExamSubjectMarks = this.examSubjects.map(es => {
        return {subject: es[0], mark: null};
      });
      this.resetExamSubjectMaks();
    }
    change = changes['sourceExamSubjectMarks'];
    if (change && change.currentValue) {
      this.resetExamSubjectMaks();
    } else {
      this.editableExamSubjectMarks = this.examSubjects.map(es => {
        return {subject: es[0], mark: null};
      });
    }
  }

  resetExamSubjectMaks(): void {
    this.editableExamSubjectMarks = [];
    this.sourceExamSubjectMarks.forEach(es => {
      this.editableExamSubjectMarks.push({...es});
    });
  }

  onSaveAction(): void {
    this.onSave.emit(this.editableExamSubjectMarks);
  }

  onCancelAction(): void {
    this.resetExamSubjectMaks();
  }
}
