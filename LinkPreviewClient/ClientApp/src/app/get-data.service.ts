import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  private REST_API_SERVER = 'https://localhost:5001/WeatherForecast'

  constructor(private httpClient: HttpClient) { }

  public getData(link): Observable<any> {
    const params = new HttpParams()
      .set('link', link);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: new HttpParams().set('link', link)
    };

    const urlServer = `${this.REST_API_SERVER}`;

    return this.httpClient.get<any>(urlServer, httpOptions);
  }
}
