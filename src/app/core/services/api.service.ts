import { Injectable } from '@angular/core';
import { BackendApiService, Configuration } from '../../../generated';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public apiService!: BackendApiService;

  constructor(
    private httpClient: HttpClient,
  ) {
    this.apiService = new BackendApiService(httpClient, environment.apiBaseUrl, new Configuration());
  }
}
