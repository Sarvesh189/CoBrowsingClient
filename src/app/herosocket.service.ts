import{Injectable} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import{Guid} from './UniqueNumber';
import{SocketMessage,_userInfo,UserInfoMessage} from './Message';
import{MessageObservableService} from './modal.service';
import{Logger} from './Utility';

@Injectable()
 export class HerosocketService  {
       mirrorScreenText:string;
       host:string = "ws://localhost:8080/api/messaging";
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
       Logger.log("trying to connect chatroomid :"+chatroomid);
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
            Logger.log("Message arrived");

            let socketMessage = JSON.parse(messageEvent.data);
             Logger.log("Message: "+socketMessage);
            if(socketMessage.MessageType=="1")
                {
                    Logger.log("connect message with userid:"+socketMessage.UserId);
                    this.userId = socketMessage.UserId;  
                     this.userInfo.SetUserInfoMessage(this.message.MessageType,this.message.UserCount,"connected")    

                }
           else if(socketMessage.MessageType=="4")
                {
                    Logger.log(socketMessage.message);
                    this.chatMessage = socketMessage.Message;
                    this._messageOservice.PublishMessage(socketMessage.UserId+":"+socketMessage.Message);
                }
                else{
            this.message.MessageType=socketMessage.MessageType;
            this.message.UserCount = socketMessage.UserCount;
            this.message.Message = socketMessage.Message;
            this.message.ChatRoomId = socketMessage.ChatRoomId;
           Logger.log(this.message.GetMessageInfo());
            this.sx=socketMessage.ScrollX;
            this.sy = socketMessage.ScrollY;
           // alert(this.sx);
         //   alert(this.sy)
        
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

