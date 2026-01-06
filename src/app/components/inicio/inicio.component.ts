import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CandidateService } from '../../services/candidate.service';
import { Candidate, MatchResponse } from '../../models/candidate.model';
import { ListaCandidatosComponent } from '../lista-candidatos/lista-candidatos.component';
import { DetalleCandidatoComponent } from '../detalle-candidato/detalle-candidato.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, FormsModule, ListaCandidatosComponent, DetalleCandidatoComponent],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  searchQuery: string = '';
  searchResults: MatchResponse[] = [];
  selectedCandidate: Candidate | null = null;
  showDetail: boolean = false;
  loading: boolean = false;
  error: string = '';
  hasSearched: boolean = false;

  constructor(private candidateService: CandidateService) {}

  onSearch(): void {
    if (!this.searchQuery.trim() || this.loading) return;
    this.loading = true;
    this.error = '';
    this.hasSearched = true;
    this.showDetail = false;

    this.candidateService.searchCandidates(this.searchQuery).subscribe({
      next: (res) => {
        this.searchResults = res;
        this.loading = false;
      },
      error: () => {
        this.error = 'Hubo un problema al procesar la búsqueda.';
        this.loading = false;
      }
    });
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.onSearch();
    }
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.searchResults = [];
    this.hasSearched = false;
  }

  onCandidateSelected(match: MatchResponse): void {
    this.loading = true;
    this.candidateService.getCandidateById(match.code).subscribe({
      next: (c) => {
        this.selectedCandidate = c;
        this.showDetail = true;
        this.loading = false;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  onBackToList(): void {
    this.showDetail = false;
    this.selectedCandidate = null;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}