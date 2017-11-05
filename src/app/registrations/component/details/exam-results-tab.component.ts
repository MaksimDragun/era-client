import {ExamSubjectCRUD} from '../../../core/certificates/exam-subject-crud';
import {Component, Input, OnChanges, SimpleChange, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-exam-results-tab',
  templateUrl: './exam-results-tab.component.html'
})
export class ExamResultsTabComponent implements OnChanges {

  @Input() examMarks: {subject: ExamSubjectCRUD, mark: number}[];

  averageMark: number;

  ngOnChanges(changes: SimpleChanges): void {
    const change = changes['examMarks'];
    if (change && change.currentValue) {
      this.averageMark = 0;
      this.examMarks.forEach(sm => {
        this.averageMark += sm.mark;
      });
    }
  }
}
