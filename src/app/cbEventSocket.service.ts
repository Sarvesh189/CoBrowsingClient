import{Injectable} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import{Guid} from './UniqueNumber';
import{MouseEventMessage} from './EventMessage';
import{HandleEvent} from './Utility';
// import{SocketMessage,_userInfo,UserInfoMessage} from './Message';
// import{MessageObservableService} from './modal.service';
// import{Logger} from './Utility';

@Injectable()
 export class cbEventSocketService  {
       
       host:string = "ws://localhost:8080/api/EventMessaging";
       webconnector:WebSocket;
       message:MouseEventMessage;
       handleEvent:HandleEvent;
constructor()
{
    this.handleEvent = new HandleEvent();
}


       connect(chatroomid:string):Promise<boolean>{
       console.log("cbEventSocket Service is trying to connect chatroomid :"+chatroomid);
        if(chatroomid)
            {
                
               this.webconnector = new WebSocket(this.host+"?chatroomid="+chatroomid);
            }
        else
            { 
                    console.log('chatroomid is not available');
                   // this.webconnector = new WebSocket(this.host+"?chatroomid="+this.chatroomid);
                
            }
        
        this.webconnector.onmessage = ((messageEvent)=>{
            console.log("Mouse Event Message arrived");
            console.log(messageEvent);
            this.handleEvent.FireEvent(messageEvent.data);
            //this. = messageEvent;
            
        
             });     
        
        this.webconnector.onclose = (closeEvent)=>
        {

            console.log(closeEvent.reason);
        }
        return Promise.resolve(true);
       }
      close():void{
         //let message = new SocketMessage("100", "<div>user stopped sharing.</div>","0","0","0","0","0","","");
          //    console.log(message);
            //  this.webconnector.send(JSON.stringify(message));
        if(this.webconnector.readyState===WebSocket.OPEN)
        this.webconnector.close();
      }

      
      sendMessage(eventMsg:MouseEventMessage):void{
            console.log("message  sending.");
           console.log(eventMsg);
            setTimeout(()=> {
              this.webconnector.send(JSON.stringify(eventMsg));
              console.log("sent");
             }, 500);   
      }
    
      
    

    }

