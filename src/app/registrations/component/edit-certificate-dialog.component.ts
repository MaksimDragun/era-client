import {Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChange, SimpleChanges} from '@angular/core';
import {CertificationService} from '../../core/certificates/certification.service';

import {Subject} from '../../core/certificates/subject';
import {EducationInstitution} from '../../core/institution/education-institution';
import {EducationInstitutionService} from '../../core/institution/education-institution.service';
import {CertificateCRUD} from '../models/certificate-crud';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-edit-certificate-dialog',
  templateUrl: './edit-certificate-dialog.component.html'
})
export class EditCertificateDialogComponent implements OnInit, OnChanges {

  @Input() countryList: string[];
  @Input() sourceCertificate: CertificateCRUD;
  editableCertificate: CertificateCRUD;
  selectedCountry: string;
  selectedInstitution: EducationInstitution;
  selectedInstitutionValue: any;

  subjectList: Subject[] = [];
  extraSubjectList: Subject[] = [];

  subjectMarkMask = [/[0-9]/, /[0-9]/];

  @Output() onSave: EventEmitter<CertificateCRUD> = new EventEmitter();

  constructor(private certificationService: CertificationService,
    public educationInstitutionService: EducationInstitutionService) {}

  ngOnInit(): void {
    this.certificationService.fetchSubjectList()
      .then(list => {
        list.forEach(subject => {
          if (subject.base) {
            this.subjectList.push(subject);
          } else {
            this.extraSubjectList.push(subject);
          }
        });
        this.resetCertificate();
      });
  }

  getBaseInstitutions = (value: string): Observable<EducationInstitution[]> => {
    return Observable.from(
      this.educationInstitutionService.fetchInstitutionBaseList(value, this.selectedCountry));
  }

  formatInstitution = (ei: EducationInstitution): string => {
    return `${ei.name}`;
  }

  selectInstitution(value: EducationInstitution): void {
    this.selectedInstitution = value;
  }

  newInstitution(name: string): void {
    this.selectedInstitution = {
      id: null,
      name: name,
      country: this.selectedCountry
    };
  }

  resetCertificate(): void {
    this.editableCertificate = new CertificateCRUD();
    this.editableCertificate.id = this.sourceCertificate.id;
    this.editableCertificate.year = this.sourceCertificate.year;
    if (this.sourceCertificate.institution) {
      this.selectedInstitutionValue = this.sourceCertificate.institution.name;
      this.selectedInstitution = this.sourceCertificate.institution;
      this.selectedCountry = this.sourceCertificate.institution.country;
    } else {
      this.selectedInstitutionValue = null;
      this.selectedInstitution = null;
      this.selectedCountry = this.countryList[0];
    }

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
    let change: SimpleChange;
    change = changes['sourceCertificate'];
    if (change && !change.firstChange) {
      this.resetCertificate();
    }
    change = changes['countryList'];
    if (change && change.currentValue) {
      this.selectedCountry = change.currentValue[0];
    }
  }

  onSaveAction(): void {
    this.editableCertificate.institution = this.selectedInstitution;
    this.onSave.emit(this.editableCertificate);
  }

  onCancelAction(): void {
    this.resetCertificate();
  }

}
