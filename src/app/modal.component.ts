import{Component,OnInit,ViewEncapsulation}from '@angular/core';
import{ModalService} from './modal.service';
import{HerosocketService} from './herosocket.service';
import{ActivatedRoute} from '@angular/router';
import{MessageObservableService} from './modal.service';
import{SocketMessage} from './Message';
@Component({
    selector:"chat-modal",
    template:`<div *ngIf="display" style="display:block"  class="popup-box chat-popup" id="chatModal">
                <div class="popup-head">
                    <div class="popup-head-left">chat</div>
                    <div class="popup-head-right" (click)="close()">X</div>
                    <div style="clear: both" ></div>
                </div>
                <div class="popup-messages">
                    <textarea cols="30" rows="10"  id="chatInput" disabled>{{chatHistory}}</textarea>
                    <input type="submit" (click)="SendMessage($event)" value="Send" style="float: right" />
                        <div style="overflow: hidden; padding-right: .5em;">
                                <input placeholder="enter message" type="text" [(ngModel)]="chatMessage"  id="chatInput" style="width: 100%;" />
                        </div>
                </div>
            </div>`,
    styleUrls:['/../assets/css/modal.less'],
    encapsulation: ViewEncapsulation.None
   
})
export class ModalComponent implements OnInit {
  chatroomId:string="";
  chatHistory:string="";
  chatMessage:string="";
  display:boolean=false;
  constructor(private modalService:ModalService, private socketservice:HerosocketService,private currentroute:ActivatedRoute,private messageOservice:MessageObservableService){
  console.log('ModalComponent is instanciated')
  this.modalService.openchatwindow$.subscribe( (info)=>{console.log("subscription is called");this.Display(info);});
        
    }
ngOnInit() {
     this.messageOservice.messageArrvied$.subscribe(
        (message)=>{
            
            this.chatHistory=this.chatHistory+message+"\n\r";
            
        }
        

     );
    this.modalService.closechatwindow$.subscribe(()=>{
        this.close();
    });

    }
close():void{
     this.display=false;
}
Display(info:any):void{
    this.display=true;
    this.chatroomId=info;
   // document.getElementById("chatModal").style.display='block'
    console.log("Display");

}
SendMessage(event:Event):void{
    console.log("send message button is clicked");
    
   
    console.log("chatroomid:"+this.chatroomId);
 this.socketservice.connect(this.chatroomId);
 console.log("connected to chatroom")
 console.log("message:"+this.chatMessage);
 let socketMessage = new SocketMessage("4",this.chatMessage,"0",this.chatroomId,"001","0","0","0","0");
 this.socketservice.sendMessage(socketMessage);
 this.chatMessage="";
 event.stopPropagation();

}

}