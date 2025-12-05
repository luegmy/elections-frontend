import { Component, Input, Output, EventEmitter, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Candidate } from '../../models/candidate.model';

@Component({
  selector: 'app-detalle-candidato',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-candidato.component.html',
  styleUrls: ['./detalle-candidato.component.css']
})
export class DetalleCandidatoComponent {
  @Input() candidate: Candidate | null = null;
  @Output() backToList = new EventEmitter<void>();

  constructor(
    private elementRef: ElementRef,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  scrollToSection(sectionId: string): void {
    // Verificar que estamos en el navegador (no en SSR)
    if (isPlatformBrowser(this.platformId)) {
      const element = document.getElementById(sectionId);
      if (element) {
        // Scroll suave con offset para el header fijo
        const yOffset = -80;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        
        window.scrollTo({
          top: y,
          behavior: 'smooth'
        });

        // Efecto visual de highlight
        element.style.transition = 'all 0.3s ease';
        element.style.backgroundColor = 'rgba(25, 118, 210, 0.1)';
        
        setTimeout(() => {
          element.style.backgroundColor = '';
        }, 1500);
      }
    }
  }

  goBack(): void {
    this.backToList.emit();
  }

  getSeverityClass(severity: string): string {
    switch (severity) {
      case 'GRAVE': return 'severity-grave';
      case 'MODERADO': return 'severity-moderado';
      case 'LEVE': return 'severity-leve';
      default: return 'severity-neutro';
    }
  }
}