import {Directive, Attribute,ElementRef,Renderer,HostListener,Input,Host,Optional} from '@angular/core';
import {ScreenSharingParent} from './Parent';

@Directive({
  selector: '[screenshare]',
  
  host:{
    '(click)':"handleKeyup()"
  },
 
})

export class screenshare  {

    htmlelement:any;
    constructor(private el: ElementRef, private parentcomponent:ScreenSharingParent) {
        
      this.htmlelement=el.nativeElement;
      this.htmlelement.addEventListener('keyup',this.error);
      
    }
    
    error(event){
      console.log(event);
            
    }

    handleKeyup(){
      console.log('handleKeyup is called::'+this.parentcomponent.btnText);
      if(this.parentcomponent.btnText!=="share screen"){
          console.log("screen sharing stopped")
        this.htmlelement.removeEventListener('keyup',this.error); //this line doesn't work because I can't access enter variable here!
    }}
}