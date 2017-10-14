import {Component, EventEmitter, Input, OnInit, OnChanges, Output, SimpleChange, SimpleChanges} from '@angular/core';
import {CertificationService} from '../../core/certificates/certification.service';

import {SubjectCRUD} from '../../core/certificates/subject-crud';
import {EducationInstitution} from '../../core/institution/education-institution';
import {EducationInstitutionService} from '../../core/institution/education-institution.service';
import {CertificateCRUD} from '../models/certificate-crud';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-edit-certificate-dialog',
  templateUrl: './edit-certificate-modal.component.html'
})
export class EditCertificateModalComponent implements OnInit, OnChanges {

  @Input() countryList: string[];
  @Input() sourceCertificate: CertificateCRUD;
  editableCertificate: CertificateCRUD;
  selectedCountry: string;
  selectedInstitution: EducationInstitution;
  selectedInstitutionValue: any;

  subjectList: SubjectCRUD[] = [];
  extraSubjectSourceList: SubjectCRUD[] = [];
  extraSubjectList: SubjectCRUD[] = [];
  extraSubject: SubjectCRUD;

  averageMark = 0;

  subjectMarkMask = [/[0-9]/, /[0-9]/];

  @Output() onSave: EventEmitter<CertificateCRUD> = new EventEmitter();

  constructor(private certificationService: CertificationService,
    public educationInstitutionService: EducationInstitutionService) {}

  subjectComparator = (s1: SubjectCRUD, s2: SubjectCRUD): number => {
    return s1.title > s2.title ? s1.title < s2.title ? -1 : 1 : 0;
  }

  ngOnInit(): void {
    this.certificationService.fetchSubjectList()
      .then(list => {
        list.forEach(subject => {
          if (subject.base) {
            this.subjectList.push(subject);
          } else {
            this.extraSubjectSourceList.push(subject);
            this.extraSubjectSourceList = this.extraSubjectSourceList.sort(this.subjectComparator);
            this.extraSubjectList.push(subject);
          }
        });
        this.resetCertificate();
        this.calculateAverageMark();
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
      this.selectedCountry = this.countryList && this.countryList[0];
    }

    this.editableCertificate.marks = this.subjectList.map(subject => {
      return {subject: subject, mark: null};
    });
    this.editableCertificate.marks.forEach(mark => {
      mark.mark = this.findMark(mark.subject);
    });

    this.sourceCertificate.extraMarks.forEach(mark => {
      this.editableCertificate.extraMarks.push({...mark});
    });

    this.calculateAverageMark();
  }

  findMark(subject: SubjectCRUD): number {
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
    this.extraSubjectSourceList = [];
    this.extraSubjectList.forEach(subject => this.extraSubjectSourceList.push(subject));
    this.editableCertificate.institution = this.selectedInstitution;
    this.onSave.emit(this.editableCertificate);
  }

  onCancelAction(): void {
    this.extraSubjectList = [];
    this.extraSubjectSourceList.forEach(subject => this.extraSubjectList.push(subject));
    this.resetCertificate();
  }

  newSubject(title: string): void {
    this.extraSubject = {
      id: null,
      title: title,
      base: false
    };
  }

  addExtraSubject(): void {
    if (this.extraSubject && this.extraSubject.title) {
      this.editableCertificate.extraMarks.push({subject: this.extraSubject, mark: null});
      const index = this.extraSubjectList.indexOf(this.extraSubject, 0);
      if (index > -1) {
        this.extraSubjectList.splice(index, 1);
      }
      this.extraSubject = null;
    }
  }

  removeExtraSubject(extraSubjectMark: {subject: SubjectCRUD, mark: number}): void {
    const index = this.editableCertificate.extraMarks.indexOf(extraSubjectMark, 0);
    if (index > -1) {
      this.editableCertificate.extraMarks.splice(index, 1);
    }
    if (extraSubjectMark.subject.id) {
      this.extraSubjectList.push(extraSubjectMark.subject);
      this.extraSubjectList = this.extraSubjectList.sort(this.subjectComparator);
    }
    this.calculateAverageMark();
  }

  isAddSubjectButtonDisabled(): boolean {
    return !this.extraSubject || !this.extraSubject.title || this.extraSubject.title.length < 3
      || this.editableCertificate.extraMarks.find(sm => sm.subject.title === this.extraSubject.title) !== undefined;
  }

  reloadSubjects(): void {
    this.certificationService.fetchSubjectList()
      .then(list => {
        list.forEach(subject => {
          if (!subject.base) {
            this.refreshSubject(subject);
          }
        });
      });
  }

  refreshSubject(subject: SubjectCRUD): void {
    this.extraSubjectList.forEach(s => {
      if (!s.id && s.title === subject.title) {
        s.id = subject.id;
      }
    });
    this.extraSubjectSourceList.forEach(s => {
      if (!s.id && s.title === subject.title) {
        s.id = subject.id;
      }
    });
    this.editableCertificate.extraMarks.forEach(sm => {
      if (!sm.subject.id && sm.subject.title === subject.title) {
        sm.subject.id = subject.id;
      }
    });
    this.sourceCertificate.extraMarks.forEach(sm => {
      if (!sm.subject.id && sm.subject.title === subject.title) {
        sm.subject.id = subject.id;
      }
    });
  }

  calculateAverageMark(): void {
    let sum = 0;
    let count = 0;
    this.editableCertificate.marks.forEach(sm => {
      if (sm.mark) {
        sum = sum + +sm.mark.toString().trim();
        count++;
      }
    });
    this.editableCertificate.extraMarks.forEach(sm => {
      if (sm.mark) {
        sum = sum + +sm.mark.toString().trim();
        count++;
      }
    });
    this.averageMark = sum && count ? sum / count : 0;
  }
}
