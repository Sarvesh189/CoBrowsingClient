import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import {HeroDetailComponent} from './hero-detail.component';
import { HeroesComponent }     from './heroes.component';
import { HeroService }         from './hero.service';
import { HerosocketService }         from './herosocket.service';
import{SharescreenComponent} from './sharescreen.component';
import{MirrorComponent,SafeHtmlPipe} from './mirror.component';
import {NewheroComponent} from './newhero.component';

import { RouterModule, Routes }   from '@angular/router';
import {screenshare} from './sharingevent.directive';
import{ModalService,MessageObservableService}from './modal.service';
import{ModalComponent} from './modal.component';

//import{SafeHtmlPipe} from './safe-html.pipe';

const appRoutes: Routes = [
   { path: 'Hero', component: HeroesComponent },
   { path: 'Mirror/**', component: MirrorComponent },
     { path: 'newhero', component: NewheroComponent },
    
   { path: '**', component: MirrorComponent },
   
];

@NgModule({
  declarations: [AppComponent,ModalComponent,HeroDetailComponent,HeroesComponent,MirrorComponent,SharescreenComponent,NewheroComponent,screenshare,SafeHtmlPipe],
  imports: [BrowserModule,FormsModule,RouterModule.forRoot(appRoutes)],
  providers: [HeroService,HerosocketService,ModalService,MessageObservableService],
  bootstrap: [AppComponent]
})
export class AppModule { }

