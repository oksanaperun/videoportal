import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthorDto } from './dtos/author.dto';

@Injectable()
export class AuthorService {

  constructor(
    private http: HttpClient,
  ) { }

  get(): Observable<AuthorDto[]> {
    return this.http.get<AuthorDto[]>('authors');
  }
}
