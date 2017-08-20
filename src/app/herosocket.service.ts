import{Injectable} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import{Guid} from './UniqueNumber';
import{SocketMessage,_userInfo,UserInfoMessage} from './Message';
import{MessageObservableService} from './modal.service';
@Injectable()
 export class HerosocketService  {
       mirrorScreenText:string;
       host:string = "ws://localhost:5599/api/messaging";
       webconnector: WebSocket;
       currentscroll:any={"sx":"","sy":"","x":"","y":""};
       cobrowsingurl:string;
       currentchatroomid:string;
       userId:string;
       message:SocketMessage;
       userInfo:UserInfoMessage=_userInfo;
       sx:string;sy:string;
       chatMessage:string;
constructor(private _messageOservice:MessageObservableService)
{
    this.currentchatroomid = Guid.newGuid();
    this.message = new SocketMessage("","","","","","","","","");
    this.userInfo.Init();
}


       connect(chatroomid:string):Promise<boolean>{
         //  alert(this.currentchatroomid);
        if(this.currentchatroomid!="")
            {
                
               this.webconnector = new WebSocket(this.host+"?chatroomid="+this.currentchatroomid);
            }
            else
            { 
                    
                    this.webconnector = new WebSocket(this.host+"?chatroomid="+this.currentchatroomid);
                   
            }
            this.cobrowsingurl = window.location.host+"/Mirror/"+this.currentchatroomid;
        
        
        this.webconnector.onmessage = ((messageEvent)=>{
       

            let socketMessage = JSON.parse(messageEvent.data);
            console.log(socketMessage);
            if(socketMessage.MessageType=="1")
                {
                    this.userId = socketMessage.UserId;     

                }
           else if(socketMessage.MessageType=="4")
                {
                    console.log(socketMessage.message);
                    this.chatMessage = socketMessage.Message;
                    this._messageOservice.PublishMessage(socketMessage.Message);
                }
                else{
            this.message.MessageType=socketMessage.MessageType;
            this.message.UserCount = socketMessage.UserCount;
            this.message.Message = socketMessage.Message;
            console.log( this.message.Message);
            this.message.ChatRoomId = socketMessage.ChatRoomId;
           // console.log(this.message.GetMessageInfo());
            this.sx=socketMessage.ScrollX;
            this.sy = socketMessage.ScrollY;
           // alert(this.sx);
         //   alert(this.sy)
            if(this.message.MessageType=="1")
                {
                     this.userInfo.SetUserInfoMessage(this.message.MessageType,this.message.UserCount,"connected")  

                }
             }     
          }
        );
        this.webconnector.onclose = (closeEvent)=>
        {

            console.log(closeEvent.reason);
        }
        return Promise.resolve(true);
       }
      close():void{
         let message = new SocketMessage("100", "<div>user stopped sharing.</div>","0","0","0","0","0","","");
              console.log(message);
              this.webconnector.send(JSON.stringify(message));
        if(this.webconnector.readyState===WebSocket.OPEN)
        this.webconnector.close();
      }

      
      sendMessage(messageObject:any):void{
            console.log("message  sending.");
            messageObject.UserId=this.userId;
            setTimeout(()=> {
                console.log(this.currentchatroomid);

                        console.log(messageObject);
              this.webconnector.send(JSON.stringify(messageObject));
              console.log("sent");
 
            }, 500);   
      }
    
      
    

    }

