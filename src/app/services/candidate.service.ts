import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'; // Importamos HttpParams
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Candidate, MatchResponse, CandidateResponse, PageResponse } from '../models/candidate.model';
import { environment } from '../../environments/environment';

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

/**
   * Obtiene candidatos paginados.
   * @param position - Filtro (all, presidencial, congresal)
   * @param page - Número de página (0 por defecto)
   * @param size - Cantidad de registros (10 por defecto)
   * @param sort - Campo y dirección (ej: 'rankingLevel,asc')
   */
  getAllCandidates(
    position: string = 'all', 
    page: number = 0, 
    size: number = 10,
    sort: string = 'rankingLevel,asc'
  ): Observable<PageResponse<CandidateResponse>> {
    
    // Configuramos los HttpParams según lo que espera el Backend
    const params = new HttpParams()
      .set('position', position)
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort);

    // Retorna un PageResponse en lugar de un array simple
    return this.http.get<PageResponse<CandidateResponse>>(this.apiUrl, { params }).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  /**
   * Obtiene el detalle de un candidato por su ID (code)
   */
  getCandidateById(id: string): Observable<Candidate> {
    return this.http.get<Candidate>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Métodos de mantenimiento
  createCandidate(candidate: Candidate): Observable<Candidate> {
    return this.http.post<Candidate>(this.apiUrl, candidate).pipe(
      catchError(this.handleError)
    );
  }

  updateCandidate(id: string, candidate: Candidate): Observable<Candidate> {
    return this.http.put<Candidate>(`${this.apiUrl}/${id}`, candidate).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Búsqueda específica para Match (IA o comparativa)
   */
  searchCandidates(query: string): Observable<MatchResponse[]> {
    if (!query.trim()) {
      return new Observable(observer => {
        observer.next([]);
        observer.complete();
      });
    }

    const params = new HttpParams().set('query', query);

    return this.http.get<MatchResponse[]>(`${this.apiUrl}/match`, { params }).pipe(
      catchError(this.handleError)
    );
  }
}