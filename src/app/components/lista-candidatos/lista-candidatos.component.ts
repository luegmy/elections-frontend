import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { MatchResponse } from '../../models/candidate.model';

@Component({
  selector: 'app-lista-candidatos',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  templateUrl: './lista-candidatos.component.html',
  styleUrls: ['./lista-candidatos.component.css']
})
export class ListaCandidatosComponent {
  @Input() searchResults: MatchResponse[] = [];
  @Output() candidateSelected = new EventEmitter<MatchResponse>();

  viewCandidateDetail(result: MatchResponse): void {
    // Emitimos el objeto completo que ya tiene matchDescription y matchDetailDescription
    this.candidateSelected.emit(result);
  }
}