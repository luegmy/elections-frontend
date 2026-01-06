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