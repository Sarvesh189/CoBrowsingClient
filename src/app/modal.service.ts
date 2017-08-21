import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';


@Injectable()
export class ModalService {

    constructor()
    {
        console.log("Modal service instanciated");
        
    }
  // Observable string sources
   openchatwindow:Subject<any> = new Subject<any>();
   closechatwindow:Subject<any> = new Subject<any>();
  

  // Observable string streams
  openchatwindow$ = this.openchatwindow.asObservable();
  closechatwindow$ = this.closechatwindow.asObservable();
  

  // Service message commands
  displaychatbox(info:any):void{
    console.log('displaychatbox called');
    this.openchatwindow.next(info);
    
  }
 
  closechatbox():void
  {
    console.log('closechatbox called');
    this.closechatwindow.next();
  }

 
}


@Injectable()
export class MessageObservableService {

    constructor()
    {
        console.log("MessageObservableService");
    }
  // Observable string sources
   messageArrived:Subject<any> = new Subject<any>();
  

  // Observable string streams
  messageArrvied$ = this.messageArrived.asObservable();
  

  // Service message commands
  PublishMessage(message:any):void{
    console.log('PublishMessage called');
    this.messageArrived.next(message);
    
  }

 
}