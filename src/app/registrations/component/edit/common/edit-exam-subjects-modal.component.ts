import {ExamSubjectCRUD} from '../../../../core/certificates/exam-subject-crud';
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

  sumMark = 0;

  subjectMarkMask = [/[0-9]/, /[0-9]/, /[0-9]/];

  

  @Output() onSave: EventEmitter<{subject: ExamSubjectCRUD, mark: number}[]> = new EventEmitter();

  ngOnInit(): void {
    this.calculateSumMark();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('change');
    console.log(changes);
    let change: SimpleChange;
    change = changes['examSubjects'];
    if (change && change.currentValue) {
      console.log('examSubjects changed');
      this.examSubjects = change.currentValue;
      this.sourceExamSubjectMarks = this.examSubjects.map(ess => {
        for (const es of ess) {
          let esm = this.sourceExamSubjectMarks.find(esm => es.id === es.id);
          if (esm) {
            return {subject: esm.subject, mark: esm.mark};
          }
        }
        return {subject: ess[0], mark: null};
      });
      this.resetExamSubjectMaks();
    }
    change = changes['sourceExamSubjectMarks'];
    if (change && change.currentValue) {
      console.log('sourceexamSubjectsmarks changed');
      this.resetExamSubjectMaks();
    } else {
      console.log('examSubjects not changed');
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
    this.calculateSumMark();
  }

  onSaveAction(): void {
    this.onSave.emit(this.editableExamSubjectMarks);
  }

  onCancelAction(): void {
    this.resetExamSubjectMaks();
  }

  calculateSumMark(): void {
    let sum = 0;
    this.editableExamSubjectMarks.forEach(esm => {
      if (esm.mark) {
        sum = sum + +esm.mark.toString().trim();
      }
    });
    this.sumMark = sum;
  }
}
