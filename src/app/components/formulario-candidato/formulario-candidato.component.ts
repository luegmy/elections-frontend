import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CandidateService } from '../../services/candidate.service';
import { Candidate, Proposal } from '../../models/candidate.model';

@Component({
  selector: 'app-formulario-candidato',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './formulario-candidato.component.html',
  styleUrls: ['./formulario-candidato.component.css']
})
export class FormularioCandidatoComponent {
  candidate: Partial<Candidate> = {
    name: '',
    party: '',
    biography: '',
    proposals: [],
    achievements: [],
    transparency: {
      submittedDeclaration: false,
      declarationInconsistencies: 0,
      partySwitches: 0,
      wasPublicOfficer: false,
      attendancePercentage: 0,
      publishedIncome: false,
      publishedExpenses: false,
      auditsAvailable: false
    },
    trust: {
      majorScandals: 0,
      minorControversies: 0,
      factCheckFailures: 0,
      ethicsSanction: false,
      positiveEndorsements: 0
    },
    scores: {
      judicialScore: 0,
      contributionScore: 0,
      transparencyScore: 0,
      trustScore: 0,
      finalScore: 0
    },
    rankingLevel: 0,
    planKeywords: []
  };

  newProposal: Proposal = { id: '', title: '', description: '', area: '' };
  newAchievement: any = { description: '', type: '', relevance: 1, quantity: 0, tags: [], feasibilityScore: 0 };

  constructor(
    private router: Router,
    private candidateService: CandidateService
  ) {}

  addProposal(): void {
    if (this.newProposal.title && this.newProposal.description) {
      this.newProposal.id = Date.now().toString();
      this.candidate.proposals!.push({...this.newProposal});
      this.newProposal = { id: '', title: '', description: '', area: '' };
    }
  }

  removeProposal(index: number): void {
    this.candidate.proposals!.splice(index, 1);
  }

  addAchievement(): void {
    if (this.newAchievement.description && this.newAchievement.type) {
      this.candidate.achievements!.push({...this.newAchievement});
      this.newAchievement = { description: '', type: '', relevance: 1, quantity: 0, tags: [], feasibilityScore: 0 };
    }
  }

  removeAchievement(index: number): void {
    this.candidate.achievements!.splice(index, 1);
  }

  onSubmit(): void {
    if (this.candidate.name && this.candidate.party) {
      this.candidateService.createCandidate(this.candidate as Candidate).subscribe({
        next: (savedCandidate) => {
          alert('Candidato creado exitosamente');
          this.router.navigate(['/candidatos']);
        },
        error: (err) => {
          alert('Error al crear el candidato');
          console.error('Error:', err);
        }
      });
    }
  }

  // Método para cancelar y navegar al inicio
  onCancel(): void {
    this.router.navigate(['/']);
  }
}