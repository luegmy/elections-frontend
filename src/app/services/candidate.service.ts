import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Candidate, MatchRequest } from '../models/candidate.model';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  private apiUrl = 'https://elections-backend-wcpi.onrender.com/api/candidates';

  constructor(private http: HttpClient) {}

  getAllCandidates(): Observable<Candidate[]> {
    return this.http.get<Candidate[]>(this.apiUrl);
  }

  getCandidateById(id: number): Observable<Candidate> {
    return this.http.get<Candidate>(`${this.apiUrl}/${id}`);
  }

  createCandidate(candidate: Candidate): Observable<Candidate> {
    return this.http.post<Candidate>(this.apiUrl, candidate);
  }

  updateCandidate(id: number, candidate: Candidate): Observable<Candidate> {
    return this.http.put<Candidate>(`${this.apiUrl}/${id}`, candidate);
  }

  searchCandidates(question: string): Observable<Candidate[]> {
    const request: MatchRequest = { question };
    return this.http.post<Candidate[]>(`${this.apiUrl}/match`, request);
  }
}