import { Component, OnInit } from '@angular/core';
import { Hero } from './hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';



@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroOnFocus: Hero ;
  heroes: Hero [];


  constructor(private heroService: HeroService, private messageService: MessageService) { }
  /* When Angular creates a HeroesComponent, 
  the Dependency Injection system sets the heroService parameter to the singleton instance of HeroService.*/

  ngOnInit() {
    /* While you could call getAndSet..Heroes() in the constructor, that's not the best practice.
    Reserve the constructor for simple initialization such as wiring constructor parameters to properties. 
    The constructor shouldn't do anything. It certainly shouldn't call a function that makes HTTP requests to a remote server 
    as a real data service would.
    Instead, call getAnd...Heroes() inside the ngOnInit lifecycle hook and let Angular call ngOnInit()
    at an appropriate time after constructing a HeroesComponent instance.*/

    this.getAndSetTheService()

  }

  getAndSetTheService(){
   /* this.heroes = this.heroService.getHeroes();*/
   this.heroService.getHeroes()
   .subscribe(heroes => this.heroes = heroes);
   
    /* The previous version assigns an array of heroes to the component's heroes property. 
    The assignment occurs synchronously, as if the server could return heroes instantly or the browser could freeze 
    the UI while it waited for the server's response.

    That won't work when the HeroService is actually making requests of a remote server.

    The new version waits for the Observable to emit the array of heroes—which could happen now or several minutes from now.
    The subscribe() method passes the emitted array to the callback, which sets the component's heroes property.

    This asynchronous approach will work when the HeroService requests heroes from the server. */

  }


  selectHero(whatever: Hero): void {
    this.heroOnFocus = whatever;
    this.messageService.add(`HeroService: Selected hero id=${whatever.id}`);
  }

}
