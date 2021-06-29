import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  private REST_API_SERVER = 'https://localhost:5001/WeatherForecast/getWebContent/'

  constructor(private httpClient: HttpClient) { }

  public getData(link): Observable<any> {

    const urlServer = `${this.REST_API_SERVER}` + encodeURIComponent(link);
     

    return this.httpClient.get<any>(urlServer,
      {
        params: new HttpParams()
          .set('link', link.toString())
      });
  }
}
