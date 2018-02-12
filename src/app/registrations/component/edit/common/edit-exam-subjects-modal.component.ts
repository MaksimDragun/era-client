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
    let change = changes['sourceExamSubjectMarks'];
    if (change && change.currentValue) {
      this.editableExamSubjectMarks = [];
      this.sourceExamSubjectMarks.forEach(esm => {
        this.editableExamSubjectMarks.push({...esm});
      });
    }

    change = changes['examSubjects'];
    if (change && change.currentValue) {
      const esms: {subject: ExamSubjectCRUD, mark: number}[] = [];
      this.examSubjects.forEach(ess => {
        let esm = null;
        for (const es of ess) {
          esm = this.editableExamSubjectMarks.find(esmToFind => esmToFind.subject.id === es.id);
          if (esm) {
            esms.push({subject: es, mark: esm.mark});
            break;
          }
        }
        if (!esm) {
          esms.push({subject: ess[0], mark: null});
        } else {
          esm = null;
        }
      });
      this.editableExamSubjectMarks = esms;
      this.calculateSumMark();
    }
  }

  resetExamSubjectMaks(): void {
    this.editableExamSubjectMarks = [];
    this.sourceExamSubjectMarks.forEach(es => {
      this.editableExamSubjectMarks.push({...es});
    });

    const esms: {subject: ExamSubjectCRUD, mark: number}[] = [];
    this.examSubjects.forEach(ess => {
      let esm = null;
      for (const es of ess) {
        esm = this.editableExamSubjectMarks.find(esmToFind => esmToFind.subject.id === es.id);
        if (esm) {
          esms.push({subject: es, mark: esm.mark});
          break;
        }
      }
      if (!esm) {
        esms.push({subject: ess[0], mark: null});
      } else {
        esm = null;
      }
    });
    this.editableExamSubjectMarks = esms;

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
