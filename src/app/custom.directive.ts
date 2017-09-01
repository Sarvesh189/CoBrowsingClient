import{Directive,ElementRef, Input,HostListener} from '@angular/core';


@Directive({
    selector:'[ssmask]'
})
export class CustomDirective{
    constructor(private element:ElementRef)
    {}

   @Input() ssmask:boolean;
   
   @HostListener('keyup') onkeyupHandler():void{
       console.log('keyup triggered:'+this.ssmask);
       if(this.ssmask)
        {
           
            this.element.nativeElement.value.replace +="XX";
            console.log(this.element.nativeElement.value);
        }
   } 


}

