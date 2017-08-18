import { Component,OnInit } from '@angular/core';
import {Hero} from './hero';
import { HeroService } from './hero.service';
import { HerosocketService }         from './herosocket.service';

@Component({
  selector: 'my-heroes',
  templateUrl: './app.component.html',

  styleUrls: ['./app.component.css'],
  providers:[HeroService,HerosocketService]
})
export class HeroesComponent  implements OnInit {
  
  
  heroes:Hero[];
  title = 'Tour of Heroes';
  hero:Hero={id:1,name:"Windstorms"};
  selectedHero:Hero;//=this.heroes[0];

constructor(private heroService:HeroService, public herosocketservice:HerosocketService)
  {

  }
  getHeroes():void{
  this.heroes= this.heroService.getHeroes();
  }
  

  
  ngOnInit():void{
    this.getHeroes();
  
  }

  
  onSelect(hero:Hero):void{
    this.selectedHero = hero;
  
  }

 

}
