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

  expandedHistory = new Map<number, boolean>();
  expandedProposals = new Map<number, boolean>();

  toggleItem(map: Map<number, boolean>, index: number) {
    const currentState = map.get(index);
    map.clear(); // Cierra otros para mantener el orden
    map.set(index, !currentState);
  }

  getAttendanceClass(percent: number): string {
    if (!percent) return '';
    if (percent >= 85) return 'text-green';
    if (percent >= 70) return 'text-orange';
    return 'text-red';
  }

  scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Define el color del texto (número) según puntaje 0-20
getScoreColor(score: number | undefined | null): string {
  if (score === undefined || score === null) return '#94a3b8';
  if (score >= 80) return '#4ade80'; // Verde
  if (score >= 60) return '#eab308'; // Amarillo
  if (score >= 40) return '#f59e0b'; // Naranja
  return '#ef4444';                 // Rojo
}

// Define la clase para el borde y fondo del card
getScoreClass(score: number | undefined | null): string {
  if (score === undefined || score === null) return '';
  if (score >= 80) return 'card-success';
  if (score >= 60) return 'card-warning';
  if (score >= 40) return 'card-observe';
  return 'card-danger';
}

  goBack() {
    this.backToList.emit();
  }

  formatStatus(status: string): string {
    if (!status) return 'Pendiente';
    // Pone la primera letra en mayúscula y quita guiones bajos
    const clean = status.replace(/_/g, ' ').toLowerCase();
    return clean.charAt(0).toUpperCase() + clean.slice(1);
  }
}