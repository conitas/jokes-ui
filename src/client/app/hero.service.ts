import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Hero} from './hero';
import {JokeResult} from './jokeResult';

const api = '/api';
const jokes = '/jokes';

@Injectable()
export class HeroService {
  constructor(private http: HttpClient) {}

  getHeroes() {
    return this.http.get<Array<Hero>>(`${api}/heroes`)
  }

  getAvatar(name: string) {
    return this.http.get<string>(`${api}/avatar/${name}`);
  }

  deleteHero(hero: Hero) {
    return this.http.delete(`${api}/hero/${hero.id}`);
  }

  addHero(hero: Hero) {
    return this.http.post<Hero>(`${api}/hero/`, hero);
  }

  updateHero(hero: Hero) {
    return this.http.put<Hero>(`${api}/hero/${hero.id}`, hero);
  }

  getRandomJoke(count: number) {
    return this.http.get<JokeResult>(`${jokes}/random/${count}`);
  }
}
