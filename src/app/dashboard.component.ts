import { Component } from '@angular/core';
import {Hero} from './hero';
import { HeroService } from './hero.service';
import { HerosocketService }         from './herosocket.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',

 styleUrls: ['/../assets/css/reset.css','/../assets/css/bootstrap.min.css','/../assets/css/styles.less'],
//  providers:[HeroService,HerosocketService]
})
export class DashboardComponent  {
}