import{Component,HostListener,forwardRef } from '@angular/core';
import{HerosocketService} from './herosocket.service';

import{ScreenSharingParent} from './Parent';

@Component({
    selector:"share-screen",
    template:`<hr/><div><button screenshare id="btnsharescreen" (click)="onSharescreen()">{{btnText}}</button>
                <div id='ssmodule' *ngIf="isVisible==1">
                    <input type="text" value={{ssurl}}/>
                </div></div><hr/>`,
    providers:[HerosocketService,{ provide: ScreenSharingParent, useExisting: forwardRef(() => SharescreenComponent) }]

})
export class SharescreenComponent extends ScreenSharingParent{
    isVisible:boolean=false;
    ssurl:string = "";
    key:any;
   
    constructor(private  herosocketservice:HerosocketService){
        super();
        this.btnText = "share screen";
    }

     @HostListener('document:keyup', ['$event'])
     handleKeyboardEvent(event: KeyboardEvent) { 
    
        if(this.btnText!="share screen")
     this.herosocketservice.sendMessage();
    

    }
    @HostListener('document:click', ['$event'])
     handleclickEvent(event: MouseEvent) { 
    
       if(this.btnText!="share screen")
     this.herosocketservice.sendMessage();
    

    }

 
    onSharescreen():void{
      this.isVisible=!this.isVisible; 
      if(this.btnText=="share screen")
        {
      this.ssurl="localhost:4200/Mirror/"+Math.floor(Math.random()*10000000);
      
      this.herosocketservice.connect();
      this.herosocketservice.sendMessage();
      this.btnText="stop sharing screen";
    }else{
        console.log("screen sharing stopped")
            this.herosocketservice.close();
            this.btnText="share screen";
           }
    }
}