import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Candidate, MatchResponse } from '../models/candidate.model';
import { environment } from '../../environments/environment';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllCandidates(): Observable<Candidate[]> {
    return this.http.get<Candidate[]>(this.apiUrl);
  }

  getCandidateById(id: string): Observable<Candidate> {
    return this.http.get<Candidate>(`${this.apiUrl}/${id}`);
  }

  createCandidate(candidate: Candidate): Observable<Candidate> {
    return this.http.post<Candidate>(this.apiUrl, candidate);
  }

  updateCandidate(id: string, candidate: Candidate): Observable<Candidate> {
    return this.http.put<Candidate>(`${this.apiUrl}/${id}`, candidate);
  }

  searchCandidates(query: string): Observable<MatchResponse[]> {
  return this.http.get<MatchResponse[]>(`${this.apiUrl}/match`, {
    params: { query }
  }).pipe(
    retry(1), // Reintenta una vez si falla por red
    catchError(error => {
      console.error('Error en la búsqueda:', error);
      return throwError(() => new Error('No se pudo conectar con el servidor de elecciones.'));
    })
  );
  }
}