import{Component,Input} from '@angular/core';
import{Hero} from './hero';
@Component({
    selector:"new-hero",
    template:`<share-screen></share-screen>
     <div id="mastercontent" class ="newhero">
                <div> <label>Id:</label> <input value="{{hero.id}}" type="text"/></div>
                 <div><label>first name:</label> <input value="{{hero.name}}" type="text" /></div>
                <div><label>last name:</label> <input value="{{hero.name}}" type="text" /></div>
                 <div><label>address:</label> <input value="{{hero.name}}" type="text" /></div>
                  <div><label>city:</label> <input value="{{hero.name}}" type="text" /></div>
                   <div><label>zip:</label> <input value="{{hero.name}}" type="text" /></div>
            </div>      
    `,
    styleUrls:['./app.component.css']
})
export class NewheroComponent 
{
     @Input()hero:Hero = {name:'',id:1};

}
