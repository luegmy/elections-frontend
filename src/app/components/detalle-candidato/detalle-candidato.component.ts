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

  // Solo mantenemos expansión para estas dos secciones
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

  getScoreColor(score: number | undefined | null): string {
    if (score === undefined || score === null) return '#94a3b8';
    if (score >= 80) return '#4ade80'; 
    if (score >= 60) return '#eab308'; 
    if (score >= 40) return '#f59e0b'; 
    return '#ef4444'; 
  }

  scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  goBack() {
    this.backToList.emit();
  }
}