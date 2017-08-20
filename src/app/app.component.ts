import { Component } from '@angular/core';
 
@Component({
  selector: 'my-app',
  template: `
  
<div id="main">
    <div class="cleared reset-box"></div>
<div class="bar nav">
<div class="nav-outer">
<div class="nav-wrapper">
<div class="nav-inner">
	<ul class="hmenu">
		<li>
		 <a routerLink="/Hero">Heroes</a>
		</li>	
		<li>
		 <a routerLink="/Mirror">Mirrors</a>
		</li>	
		<li>
		<a routerLink="/newhero">New hero</a>
		</li>	
	</ul>
</div>
</div>
</div>
</div>   
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = 'Tour of Heroes';
}