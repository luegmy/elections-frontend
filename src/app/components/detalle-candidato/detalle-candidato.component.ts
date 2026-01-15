import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, DecimalPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-detalle-candidato',
  standalone: true,
  imports: [CommonModule, DecimalPipe, DatePipe],
  templateUrl: './detalle-candidato.component.html',
  styleUrls: ['./detalle-candidato.component.css']
})
export class DetalleCandidatoComponent {
  @Input() candidate: any = null; 
  @Output() backToList = new EventEmitter<void>();

  // Estados de expansión para las nuevas secciones de auditoría
  showExtra = false;       // Inconsistencias de Contraloría
  showFactCheck = false;   // Fuentes de mentiras detectadas
  showSanctions = false;   // Detalle de sanciones (Map de Java)

  // Mapas para las secciones con múltiples ítems
  expandedHistory = new Map<number, boolean>();
  expandedProposals = new Map<number, boolean>();

  toggleItem(map: Map<number, boolean>, index: number) {
    const currentState = map.get(index);
    map.clear(); 
    map.set(index, !currentState);
  }

  getScoreClass(score: number | undefined | null): string {
    if (score === undefined || score === null) return '';
    if (score >= 80) return 'card-success';
    if (score >= 60) return 'card-warning';
    if (score >= 40) return 'card-observe';
    return 'card-danger';
  }

  scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  goBack() {
    this.backToList.emit();
  }
}