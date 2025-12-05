import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Candidate } from '../../models/candidate.model';

@Component({
  selector: 'app-lista-candidatos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-candidatos.component.html',
  styleUrls: ['./lista-candidatos.component.css']
})
export class ListaCandidatosComponent {
  @Input() candidates: Candidate[] = [];
  @Output() candidateSelected = new EventEmitter<Candidate>();

  viewCandidateDetail(candidate: Candidate): void {
    this.candidateSelected.emit(candidate);
  }
}