import {Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChange, SimpleChanges} from '@angular/core';
import {CertificationService} from '../../core/certificates/certification.service';

import {Subject} from '../../core/certificates/subject';
import {CertificateCRUD} from '../models/certificate-crud';

@Component({
  selector: 'app-edit-certificate-dialog',
  templateUrl: './edit-certificate-dialog.component.html'
})
export class EditCertificateDialogComponent implements OnInit, OnChanges {

  @Input() sourceCertificate: CertificateCRUD;
  editableCertificate: CertificateCRUD;

  subjectList: Subject[];

  subjectMarkMask = [ /[0-9]/,  /[0-9]/];

  @Output() onSave: EventEmitter<CertificateCRUD> = new EventEmitter();

  constructor(private certificationService: CertificationService) {}

  ngOnInit(): void {
    this.certificationService.fetchSubjectList()
      .then(list => {
        this.subjectList = list;
        this.resetCertificate();
      });
  }

  resetCertificate(): void {
    this.editableCertificate = new CertificateCRUD();
    this.editableCertificate.id = this.sourceCertificate.id;
    this.editableCertificate.institution = this.sourceCertificate.institution;
    this.editableCertificate.year = this.sourceCertificate.year;

    this.editableCertificate.marks = this.subjectList.map(subject => {
      return {subject: subject, mark: null};
    });
    this.editableCertificate.marks.forEach(mark => {
      mark.mark = this.findMark(mark.subject);
    });
  }

  findMark(subject: Subject): number {
    const result = this.sourceCertificate.marks.find(mark => subject.id === mark.subject.id);
    return result && result.mark;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const change: SimpleChange = changes['sourceCertificate'];
    if (change && !change.firstChange) {
      this.resetCertificate();
    }
  }

  onSaveAction(): void {
    this.onSave.emit(this.editableCertificate);
  }

  onCancelAction(): void {
    this.resetCertificate();
  }

}
