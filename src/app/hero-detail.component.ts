import {Component,Input,AfterViewInit} from '@angular/core';
import { Hero } from './hero';
import {HerosocketService} from './herosocket.service';

@Component({
    selector:'hero-detail',
    template:`<div id="herodiv" *ngIf="hero">
            
            <h2>{{hero.name}} details!</h2>
            <div><label>id: </label>{{hero.id}}</div>
     <div>
        <label>name: </label>
        <input id="txtheroname" type="text" value="{{hero.name}}"  onchange="this.setAttribute('placeholder', this.value);" (input)="hero.name=$event.target.value" name={{hero.name}}   placeholder="name"/>
         
      </div>
            `,   
    providers:[HerosocketService]
})
export class HeroDetailComponent implements AfterViewInit
{

  constructor(private herosocketService:HerosocketService)
  {}

   @Input() hero:Hero;

   

 ngAfterViewInit():void{
    this.observershared();
  }
   observershared():void{

var target = document.querySelector("html") as Node;

// create an observer instance
var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      console.log(mutation);
      if (mutation.type === 'childList') {
        let list_values = [].slice.call(target.childNodes)
            .map( function(node) { return node.innerHTML; })
            .filter( function(s) {
              if (s === '<br>') {
                return false;
              }
              else {
                return true;
              }
         });
        console.log(mutation.type);}
    });
});
 
// configuration of the observer:
var config = { attributes: true, childList: true, characterData: true }
 
// pass in the target node, as well as the observer options
  observer.observe(target, config);
 
// later, you can stop observing
//observer.disconnect();
 }
}

