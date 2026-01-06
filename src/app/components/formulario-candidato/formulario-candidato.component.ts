import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CandidateService } from '../../services/candidate.service';
import { Candidate, Proposal, AchievementType } from '../../models/candidate.model';

@Component({
  selector: 'app-formulario-candidato',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './formulario-candidato.component.html',
  styleUrls: ['./formulario-candidato.component.css']
})
export class FormularioCandidatoComponent {
  candidate: Partial<Candidate> = {
    code: '',
    name: '',
    position: '',
    party: '',
    partyAcronym: '',
    biography: '',
    proposals: [],
    achievements: [],
    history: [],
    transparency: {
      submittedDeclaration: false,
      declarationInconsistencies: 0,
      wasPublicOfficer: false,
      publishedIncome: false,
      publishedExpenses: false,
      auditsAvailable: false
    },
    trust: {
      majorSanctions: 0,
      minorSanctions: 0,
      partySwitches: 0,
      factCheckFailures: 0,
      ethicsSanction: false
    },
    scores: {
      judicialScore: 0,
      contributionScore: 0,
      transparencyScore: 0,
      trustScore: 0,
      finalScore: 0
    },
    rankingLevel: 0,
    lastAuditDate: '',
    dataSourceVersion: ''
  };

  newProposal: any = { 
    id: '', 
    title: '', 
    description: '', 
    area: '', 
    detailDescription: '', 
    sourcePlan: '',
    feasibilityScore: 0.5,
    impactScore: 0.5,
    costEstimate: '' 
  };
  
  newAchievement: any = { 
    description: '', 
    type: '', 
    relevance: 1, 
    quantity: 0, 
    tags: [] 
  };

  constructor(
    private router: Router,
    private candidateService: CandidateService
  ) {}

  addProposal(): void {
    if (this.newProposal.title && this.newProposal.description) {
      this.newProposal.id = Date.now().toString();
      this.candidate.proposals!.push({...this.newProposal});
      this.newProposal = { 
        id: '', 
        title: '', 
        description: '', 
        area: '', 
        detailDescription: '', 
        sourcePlan: '',
        feasibilityScore: 0.5,
        impactScore: 0.5,
        costEstimate: '' 
      };
    }
  }

  removeProposal(index: number): void {
    this.candidate.proposals!.splice(index, 1);
  }

  addAchievement(): void {
    if (this.newAchievement.description && this.newAchievement.type) {
      this.candidate.achievements!.push({...this.newAchievement});
      this.newAchievement = { description: '', type: '', relevance: 1, quantity: 0, tags: [] };
    }
  }

  removeAchievement(index: number): void {
    this.candidate.achievements!.splice(index, 1);
  }

  onSubmit(): void {
    if (this.candidate.name && this.candidate.party) {
      // Generar código único si no existe
      if (!this.candidate.code) {
        this.candidate.code = 'CAND-' + Date.now().toString().slice(-6);
      }
      
      this.candidateService.createCandidate(this.candidate as Candidate).subscribe({
        next: (savedCandidate) => {
          alert('Candidato creado exitosamente');
          this.router.navigate(['/']);
        },
        error: (err) => {
          alert('Error al crear el candidato');
          console.error('Error:', err);
        }
      });
    } else {
      alert('Por favor complete los campos obligatorios: Nombre y Partido');
    }
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }
}