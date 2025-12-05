import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CandidateService } from '../../services/candidate.service';
import { Candidate } from '../../models/candidate.model';
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
  candidates: Candidate[] = [];
  selectedCandidate: Candidate | null = null;
  showDetail: boolean = false;
  loading: boolean = false;
  error: string = '';
  hasSearched: boolean = false;

  constructor(private candidateService: CandidateService) {}

  // ❌ ELIMINADO: ngOnInit() que cargaba automáticamente

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.loading = true;
      this.error = '';
      this.selectedCandidate = null;
      this.showDetail = false;
      this.hasSearched = true; // ✅ Marcar que se ha realizado una búsqueda
      
      this.candidateService.searchCandidates(this.searchQuery.trim()).subscribe({
        next: (candidates) => {
          this.candidates = candidates;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Error al buscar candidatos';
          this.loading = false;
          this.hasSearched = false; // ✅ Resetear en caso de error
        }
      });
    }
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.onSearch();
    }
  }

  onCandidateSelected(candidate: Candidate): void {
    this.selectedCandidate = candidate;
    this.showDetail = true;
  }

  onBackToList(): void {
    this.showDetail = false;
    this.selectedCandidate = null;
  }
}