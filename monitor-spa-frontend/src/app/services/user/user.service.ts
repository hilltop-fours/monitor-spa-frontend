import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //  url = 'http://localhost:3000';

  //  constructor(private http: HttpClient) { }

  //  getUsers(): Observable<User[]> {
  //    return this.http.get<User[]>(this.url + '/users');
  //  }

  data = {
    users: [
      { id: 1234, name: 'Andrew Owen', age: 26, eyeColor: 'blue' },
      { id: 1235, name: 'Susan Que', age: 45, eyeColor: 'hazel' },
      { id: 1236, name: 'John Doe', age: 53, eyeColor: 'brown' }
    ]
  }

  constructor(private readonly http: HttpClient) { }

  getUsers(): Observable<User[]> { return of(this.data.users) }
}



class User {
  id!: number
  name!: string
  age!: number
  eyeColor!: string
}