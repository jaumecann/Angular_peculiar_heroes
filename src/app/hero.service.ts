import { Injectable } from '@angular/core';
import { Hero } from './heroes/hero';
import { HEROES } from './heroes/mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';


@Injectable({ 
/* This marks the class as one that participates in the dependency injection system. 
The HeroService class is going to provide an injectable service, and it can also have its own injected dependencies.

---

You must make the HeroService available to the dependency injection system by registering a provider.
A provider is something that can create or deliver a service; in this case, it instantiates the HeroService class to provide the service.

To make sure that the HeroService can provide this service, register it with the injector, 
which is the object that is responsible for choosing and injecting the provider where the app requires it.

When you provide the service at the root level, Angular creates a single, shared instance of HeroService
and injects into any class that asks for it.
Registering the provider in the @Injectable metadata also allows Angular to optimize an app 
by removing the service if it turns out not to be used after all.
  */
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService){ }
  /*This is a typical "service-in-service" scenario: 
  you inject the MessageService into the HeroService which is injected into the HeroesComponent.*/ 

  /*
  In this tutorial, HeroService.getHeroes() will return an Observable because it will eventually use 
  the Angular HttpClient.get method to fetch the heroes and HttpClient.get() returns an Observable.
  
  Soon the app will fetch heroes from a remote server, which is an inherently asynchronous operation.
  The HeroService must wait for the server to respond, getHeroes() cannot return immediately with hero data, 
  and the browser will not block while the service waits.
  
  HeroService.getHeroes() must have an asynchronous signature of some kind.
  */

  getHeroes(): Observable<Hero[]> {
     // TODO: send the message _after_ fetching the heroes
    this.messageService.add('HeroService: fetched heroes');
    return of (HEROES);
  }
  /* of(HEROES) returns an Observable<Hero[]> that emits a single value, the array of mock heroes. */
}
