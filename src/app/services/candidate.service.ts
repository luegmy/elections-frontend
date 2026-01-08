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

  constructor(private http: HttpClient) { }

  private handleError(error: any) {
    console.error('Error en el servicio de candidatos:', error);
    return throwError(() => new Error('Ocurrió un error en el sistema electoral. Intente más tarde.'));
  }

  getAllCandidates(): Observable<Candidate[]> {
    return this.http.get<Candidate[]>(this.apiUrl).pipe(
      retry(1),
      catchError(this.handleError)
    );
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
    if (!query.trim()) return new Observable(observer => observer.next([]));

    return this.http.get<MatchResponse[]>(`${this.apiUrl}/match`, {
      params: { query }
    }).pipe(
      catchError(this.handleError)
    );
  }
}