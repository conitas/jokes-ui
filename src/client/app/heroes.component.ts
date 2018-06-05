import {Component, OnInit} from '@angular/core';

import {Hero} from './hero';
import {HeroService} from './hero.service';
import {map} from 'rxjs/operators'
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';
import {Joke} from './joke';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html'
})
export class HeroesComponent implements OnInit {
  addingHero = false;
  heroes: any = [];
  selectedHero: Hero;
  jokes: Joke[] = [];
  jokes_next: Joke[] = [];
  jokes_next_count = 0;
  pollingData: any;
  alternate: false;

  constructor(private heroService: HeroService) {
  }

  ngOnInit() {
    this.getHeroes();
    this.pollingData = Observable.interval(4000).startWith(0).subscribe(() =>
      this.heroService.getRandomJoke(Math.floor((Math.random() * 3) + 1)).pipe(
        map(result => {
          result.jokes.forEach(joke => joke.server = result.server);
          return result.jokes;
        }))
        .subscribe(result => {
          console.log(result);
          this.jokes.unshift(...this.jokes_next);
          this.jokes_next_count = result.length;
          this.jokes_next = result;
          if (this.jokes.length > 10 + this.jokes_next_count) {
            this.jokes = this.jokes.slice(0, 10 + this.jokes_next_count);
          }
        }));
  }

  cancel() {
    this.addingHero = false;
    this.selectedHero = null;
  }

  deleteHero(hero: Hero) {
    this.heroService.deleteHero(hero).subscribe(() => {
      this.heroes = this.heroes.filter(h => h !== hero);
      if (this.selectedHero === hero) {
        this.selectedHero = null;
      }
    });
  }

  getHeroes() {
    return this.heroService.getHeroes().subscribe(heroes => {
      this.heroes = heroes;
    });
  }

  getAvatar(hero: Hero) {
    if (!hero.avatar && hero.name) {
      this.heroService.getAvatar(hero.name).subscribe(avatar => {
        console.log(avatar);
        hero.avatar = avatar;
      return avatar;
      })
    }
    return hero.avatar;
  }

  getAvatarForJoke(joke: Joke) {
    if (!joke.avatar) {
      this.heroService.getAvatar(joke.server).subscribe(avatar => {
        joke.avatar = avatar;
        return avatar;
      })
    }
    return joke.avatar;
  }

  enableAddMode() {
    this.addingHero = true;
    this.selectedHero = new Hero();
  }

  onSelect(hero: Hero) {
    this.addingHero = false;
    this.selectedHero = hero;
  }

  save() {
    if (this.addingHero) {
      this.heroService.addHero(this.selectedHero).subscribe(hero => {
        this.addingHero = false;
        this.selectedHero = null;
        this.heroes.push(hero);
      });
    } else {
      this.heroService.updateHero(this.selectedHero).subscribe(() => {
        this.addingHero = false;
        this.selectedHero.avatar = '';
        this.selectedHero = null;
      });
    }
  }
}
