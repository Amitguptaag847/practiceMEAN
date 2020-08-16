import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  uri: string;

  token: string;

  headersObject: any;

  constructor(private _http: HttpClient) {
    this.uri = 'http://localhost:8080';
  }

  submitRegister(body: any) {
    return this._http.post(this.uri + '/users/register', body, {
      observe: 'body'
    });
  }

  submitLogin(body: any) {
    return this._http.post(this.uri + '/users/login', body, {
      observe: 'body'
    });
  }

  submitEdit(body: any) {
    return this._http.post(this.uri + '/users/edit', body, {
      observe: 'body'
    });
  }

  submitCompt(body: any) {
    return this._http.post(this.uri + '/users/setcompt', body, {
      observe: 'body'
    });
  }

  getMatches(id) {
    const body = {
      id
    };
    return this._http.post(this.uri+ '/users/matches', body, {
      observe: 'body'
    });
  }

  getUserData(id) {
    const body = {
      id
    };
    return this._http.post(this.uri+ '/users/getprofile', body, {
      observe: 'body'
    });
  }

  uploadImage(image: File, id: string) {
    const body = new FormData();
    body.append('image', image);
    body.append('id', id);
    return this._http.post(this.uri + '/users/uploadimage', body, {
      observe: 'body'
    });
  }

  authonicateUser() {
    this.token = localStorage.getItem('token');
    this.headersObject = new HttpHeaders().set('Authorization', this.token);
    return this._http.get(this.uri + '/users/auth', {
      observe: 'body',
      headers: this.headersObject
    });
  }
}
