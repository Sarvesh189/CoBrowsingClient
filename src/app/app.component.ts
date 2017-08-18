import { Component } from '@angular/core';
 
@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
     <a routerLink="/Hero">Heroes</a>
      <a routerLink="/Mirror">Mirrors</a>
       <a routerLink="/newhero">New hero</a>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = 'Tour of Heroes';
}