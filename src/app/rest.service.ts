import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  public postParapharse(text: string): Observable<string> {
    return this.httpClient.post<string>(this.apiUrl + 'generate', text);
  }
}
