import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CandidateService } from '../../services/candidate.service';
import { Candidate, MatchResponse, CandidateResponse } from '../../models/candidate.model';
import { ListaCandidatosComponent } from '../lista-candidatos/lista-candidatos.component';
import { DetalleCandidatoComponent } from '../detalle-candidato/detalle-candidato.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, FormsModule, ListaCandidatosComponent, DetalleCandidatoComponent],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  searchQuery: string = '';
  searchResults: MatchResponse[] = [];
  selectedCandidate: Candidate | null = null;
  showDetail: boolean = false;
  loading: boolean = false;
  error: string = '';
  hasSearched: boolean = false;

  // Propiedades Tabla
  isTableView: boolean = false;
  pagedCandidates: CandidateResponse[] = [];
  currentPage: number = 0;
  pageSize: number = 10;
  totalPages: number = 0;
  totalCandidatesCount: number = 0;
  currentFilter: string = 'all';

  constructor(
    private candidateService: CandidateService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['view'] === 'all') {
        this.isTableView = true;
        this.currentFilter = params['filter'] || 'all';
        this.currentPage = 0;
        this.cargarTabla();
      } else {
        this.isTableView = false;
        this.clearSearch();
      }
    });
  }

  get isQueryValid(): boolean {
    return this.searchQuery.trim().length > 3;
  }

  onSearch(): void {
    if (!this.isQueryValid || this.loading) return;
    this.loading = true;
    this.error = '';
    this.hasSearched = true;
    this.isTableView = false; 

    this.candidateService.searchCandidates(this.searchQuery).subscribe({
      next: (res) => {
        this.searchResults = res;
        this.loading = false;
        this.searchQuery = ''; 
      },
      error: () => {
        this.error = 'Error al procesar la búsqueda.';
        this.loading = false;
      }
    });
  }

  cargarTabla(): void {
    this.loading = true;
    this.candidateService.getAllCandidates(this.currentFilter, this.currentPage, this.pageSize)
      .subscribe({
        next: (res) => {
          this.pagedCandidates = res.content;
          this.totalPages = res.totalPages;
          this.totalCandidatesCount = res.totalElements;
          this.loading = false;
        },
        error: () => {
          this.error = 'Error al cargar la lista.';
          this.loading = false;
        }
      });
  }

  onCandidateSelected(candidateData: any): void {
    this.loading = true;
    // Extraemos el código sin importar si viene de la tabla (candidateCode) o búsqueda (code)
    const code = candidateData.candidateCode || candidateData.code || candidateData.id;
    
    if (!code) {
      this.error = 'No se pudo identificar al candidato.';
      this.loading = false;
      return;
    }

    this.candidateService.getCandidateById(code).subscribe({
      next: (c) => {
        this.selectedCandidate = c;
        this.showDetail = true;
        this.loading = false;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      error: () => {
        this.error = 'Error al cargar el detalle del candidato.';
        this.loading = false;
      }
    });
  }

  onBackToList(): void {
    this.showDetail = false;
    this.selectedCandidate = null;
  }

  // Helpers de paginación
  onPageSizeChange(): void { this.currentPage = 0; this.cargarTabla(); }
  get paginas(): number[] { return Array.from({ length: this.totalPages }, (_, i) => i); }
  irAPagina(p: number): void {
    if (p >= 0 && p < this.totalPages) {
      this.currentPage = p;
      this.cargarTabla();
    }
  }
  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey && this.isQueryValid) {
      event.preventDefault();
      this.onSearch();
    }
  }
  clearSearch(): void {
    this.searchQuery = '';
    this.searchResults = [];
    this.hasSearched = false;
    this.error = '';
  }
}