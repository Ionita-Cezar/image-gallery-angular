import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Image {
  id: string;
  author: string;
  download_url: string;
}

@Injectable({
  providedIn: 'root',
})
export class ImagesService {
  private apiUrl = 'https://picsum.photos/v2/list';

  constructor(private http: HttpClient) {}

  fetchImages(): Observable<Image[]> {
    return this.http.get<Image[]>(this.apiUrl);
  }
}
