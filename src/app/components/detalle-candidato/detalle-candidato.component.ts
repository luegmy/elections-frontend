import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, DecimalPipe, DatePipe, KeyValuePipe } from '@angular/common';

@Component({
  selector: 'app-detalle-candidato',
  standalone: true,
  imports: [CommonModule, DecimalPipe, DatePipe, KeyValuePipe],
  templateUrl: './detalle-candidato.component.html',
  styleUrls: ['./detalle-candidato.component.css']
})
export class DetalleCandidatoComponent {
  @Input() candidate: any = null; 
  @Output() backToList = new EventEmitter<void>();

  showExtra = false;
  showFactCheck = false;
  showSanctions = false;

  expandedHistory = new Map<number, boolean>();
  expandedProposals = new Map<number, boolean>();

  // Maneja la apertura de las propuestas
  toggleItem(map: Map<number, boolean>, index: number) {
    const currentState = map.get(index);
    map.clear(); // Solo una abierta a la vez
    map.set(index, !currentState);
  }

  getScoreClass(score: number | undefined | null): string {
    if (score === undefined || score === null) return '';
    if (score >= 80) return 'card-success';
    if (score >= 60) return 'card-warning';
    if (score >= 40) return 'card-observe';
    return 'card-danger';
  }

  getSeverityClass(severity: string): string {
    const classes: any = { 'GRAVE': 'b-grave', 'MODERADO': 'b-mod', 'LEVE': 'b-leve', 'NEUTRO': 'b-neu' };
    return classes[severity] || 'b-neu';
  }

  getSeverityBg(severity: string): string {
    const classes: any = { 'GRAVE': 'bg-red', 'MODERADO': 'bg-orange', 'LEVE': 'bg-yellow', 'NEUTRO': 'bg-gray' };
    return classes[severity] || 'bg-gray';
  }

  scrollToSection(sectionId: string) {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  goBack() {
    this.backToList.emit();
  }
}