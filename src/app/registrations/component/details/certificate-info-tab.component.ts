import {SubjectCRUD} from '../../../core/certificates/subject-crud';
import {Certificate} from '../../models/certificate';
import {Component, Input, OnChanges, SimpleChange, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-certificate-info-tab',
  templateUrl: './certificate-info-tab.component.html'
})
export class CertificateInfoTabComponent implements OnChanges {

  @Input() certificate: Certificate;

  markGroups: {subject: SubjectCRUD, mark: number}[][];

  averageMark: number;

  ngOnChanges(changes: SimpleChanges): void {
    const change = changes['certificate'];
    if (change && change.currentValue) {
      this.markGroups = [];
      if (this.certificate.marks) {
        let sum = 0;
        let groupSize = Math.floor(this.certificate.marks.length / 3);
        groupSize = groupSize < 5 ? 5 : groupSize + 1;
        let i = 0;
        let group: {subject: SubjectCRUD, mark: number}[];
        this.certificate.marks.forEach(sm => {
          sum += sm.mark;
          if (i % groupSize === 0) {
            group = [];
            this.markGroups.push(group);
          }
          group.push({subject: sm.subject, mark: sm.mark});
          i++;
        });
        this.averageMark = sum / this.certificate.marks.length;
      }
    }
  }

}
