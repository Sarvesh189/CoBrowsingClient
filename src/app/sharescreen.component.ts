import{Component,forwardRef,OnInit,NgZone } from '@angular/core';
import{HerosocketService} from './herosocket.service';
import { ModalService } from './modal.service';
import{ScreenSharingParent} from './Parent';
import{SocketMessage} from './Message';
import{Logger,MaskDisplay} from './Utility';
import{EventMessage}from './EventMessage';
import {cbEventSocketService} from './cbEventSocket.service'
@Component({
    selector:"share-screen",
    template:`<hr/><div class="screenshare" >
                <div><button screenshare id="btnsharescreen" (click)="onSharescreen()">{{btnText}}</button>
                     <label *ngIf="herosocketservice.userInfo.MessageType=='1'">No of user connected : {{herosocketservice.userInfo.UserCount}}</label></div>
                <div id='ssmodule' *ngIf="isVisible==1">
                    <input type="text" value={{herosocketservice.cobrowsingurl}}/>
                </div></div>
                <chat-modal></chat-modal>
                <hr/>`,
    styleUrls:['./app.component.css'],
   
    providers:[HerosocketService,{ provide: ScreenSharingParent, useExisting: forwardRef(() => SharescreenComponent) },cbEventSocketService]

})
export class SharescreenComponent extends ScreenSharingParent{
    isVisible:boolean=false;
    ssurl:string = "";
    key:any;
    IgnoreControls:string[]=["btnChatMessageSend","chatInput","chatHistory"];
    constructor(public  herosocketservice:HerosocketService,private modalService:ModalService,private zone:NgZone,private cbeventserver:cbEventSocketService){
        super();
        this.btnText = "collaborate";
        
      //  alert('screenshare instanciated')
    }

   
    
    sendMessage=()=>{
        
        setTimeout(()=> {
          this.herosocketservice.sendMessage(this.screenshotPage());  
        }, 200);
         
      //  this.herosocketservice.sendMessage(this.screenshotBlobPage());
         return true;
    }

   hightlightOn():void{
           window.document.designMode = "On";
   }

   highlightOff():void{
    window.document.designMode = "Off";
    

   }


    onSharescreen():void{
      this.isVisible=!this.isVisible; 
       this.modalService.displaychatbox(this.herosocketservice.currentchatroomid);
      if(this.btnText=="collaborate")
        {
      
          this.herosocketservice.connect("").then((item)=>{
          Logger.log(item.toString());});
          this.cbeventserver.connect( this.herosocketservice.currentchatroomid);
       //  this.addEventToMainconent();
         document.getElementById("mastercontent").addEventListener("keyup",this.sendMessage);
         document.getElementById("mastercontent").addEventListener("click",this.sendMessage);// document.getElementById("mastercontent").removeEventListener("click",arguments.callee);});
         this.herosocketservice.sendMessage(this.screenshotPage());
         this.btnText="stop sharing screen";
      
       
    }else{
            Logger.log("screen sharing stopped")
        
            this.herosocketservice.close();
            this.herosocketservice.userInfo.Init();
            this.modalService.closechatbox();
            this.btnText="collaborate";
           document.getElementById("mastercontent").removeEventListener("keyup" ,this.sendMessage);
           document.getElementById("mastercontent").removeEventListener("click" ,this.sendMessage);
          
           }
       
   
    }



   



         urlsToAbsolute(nodeList):any {
        if (!nodeList.length) {
            return [];
        }
        var attrName = 'href';
        if (nodeList[0].__proto__ === HTMLImageElement.prototype 
        || nodeList[0].__proto__ === HTMLScriptElement.prototype) {
            attrName = 'src';
        }
        nodeList = [].map.call(nodeList, function (el, i) {
            var attr = el.getAttribute(attrName);
            if (!attr) {
                return;
            }
            var absURL = /^(https?|data):/i.test(attr);
            if (absURL) {
                return el;
            } else {
                return el;
            }
        });
        return nodeList;
    }

addOnPageLoad_():void {
     
           // alert('1');
            var scrollX = Number(500) || 0;
            var scrollY = Number(500) || 0;
            window.scrollTo(scrollX, scrollY);
     
    }

  // TODO: current limitation is css background images are not included.
 screenshotPage():any {

    //  this.urlsToAbsolute(document.images);
   //    this.urlsToAbsolute(document.querySelectorAll("link[rel='stylesheet']"));
      //  var screenshot2 = document.documentElement.cloneNode(true);
        let screenshot2 = document.getElementById("mastercontent").cloneNode(true);
    //    alert(screenshot2.childNodes.length);
       let screenshot = screenshot2 as HTMLElement;
        let b = document.createElement('base');
        b.href = document.location.protocol + '//' + location.host;
        //var head = screenshot.querySelector('head');
       // head.insertBefore(b, head.firstChild);
        screenshot.style.pointerEvents = 'auto'; //auto and none
        screenshot.style.overflow = 'hidden';
        screenshot.style.webkitUserSelect = 'auto'; //auto and none
      //  screenshot.style.mozUserSelect = 'none';
        screenshot.style.msUserSelect = 'auto'; //auto and none
     //   screenshot.style.oUserSelect = 'none';
        screenshot.style.userSelect = 'auto';
    let top  = window.pageYOffset || document.documentElement.scrollTop,
    left = window.pageXOffset || document.documentElement.scrollLeft;
       // this.currentscroll.sy = top.toString();
      //  this.currentscroll.sx = left.toString();
//          var script = document.createElement('script');
//          script.textContent = 'alert("1");window.scrollTo('+top+','+left+');';
//          screenshot.appendChild(script);
        
        let elmns = screenshot.querySelectorAll("input[type=text]");
        let orgelmns = document.getElementById("mastercontent").querySelectorAll("input[type=text]");
             for( let i=0; i <elmns.length; i++){
               let htmlElem = elmns[i];
               
               let shouldMask = (htmlElem as HTMLInputElement).getAttribute("data-mask");
                console.log("shouldMask");
               console.log(shouldMask);
                let elemValue =(orgelmns[i] as HTMLInputElement).value;
               if(shouldMask != null && shouldMask == 'true')
                {
                    console.log("inside if condition");
                   elemValue =  MaskDisplay.MaskInput(elemValue);
                    console.log(elemValue);
                }
               
              
               
               htmlElem.setAttribute("value",elemValue);
                
           }

         elmns = screenshot.querySelectorAll("select");
         orgelmns = document.getElementById("mastercontent").querySelectorAll("select");
             for( let i=0; i <elmns.length; i++){
               let htmlElem = elmns[i];
               let elemValue =(orgelmns[i] as HTMLSelectElement).selectedIndex;
          console.log("selectedindex: "+elemValue);
               htmlElem.setAttribute("SI",elemValue.toString());/// as HTMLSelectElement).selectedIndex=elemValue;
            
           }

     let message = new SocketMessage("3", screenshot.outerHTML,"0","0","0",left.toString(),top.toString(),"0","0")
      
        return message;
}

//  screenshotBlobPage():any {

//     //  this.urlsToAbsolute(document.images);
//    //    this.urlsToAbsolute(document.querySelectorAll("link[rel='stylesheet']"));
//       //  var screenshot2 = document.documentElement.cloneNode(true);
//         let screenshot2 = document.getElementById("mastercontent").cloneNode(true);
//     //    alert(screenshot2.childNodes.length);
//        let screenshot = screenshot2 as HTMLElement;
//         let b = document.createElement('base');
//         b.href = document.location.protocol + '//' + location.host;
//         //var head = screenshot.querySelector('head');
//        // head.insertBefore(b, head.firstChild);
//         screenshot.style.pointerEvents = 'none';
//         screenshot.style.overflow = 'hidden';
//         screenshot.style.webkitUserSelect = 'none';
//       //  screenshot.style.mozUserSelect = 'none';
//         screenshot.style.msUserSelect = 'none';
//      //   screenshot.style.oUserSelect = 'none';
//         screenshot.style.userSelect = 'none';
//     let top  = window.pageYOffset || document.documentElement.scrollTop,
//     left = window.pageXOffset || document.documentElement.scrollLeft;
//        // this.currentscroll.sy = top.toString();
//       //  this.currentscroll.sx = left.toString();
// //          var script = document.createElement('script');
// //          script.textContent = 'alert("1");window.scrollTo('+top+','+left+');';
// //          screenshot.appendChild(script);
        
//         let elmns = screenshot.querySelectorAll("input[type=text]");
//         let orgelmns = document.getElementById("mastercontent").querySelectorAll("input[type=text]");
//              for( let i=0; i <elmns.length; i++){
//                let htmlElem = elmns[i];
//                let elemValue =(orgelmns[i] as HTMLInputElement).value;
          
//                htmlElem.setAttribute("value",elemValue);
            
//            }

//          elmns = screenshot.querySelectorAll("select");
//          orgelmns = document.getElementById("mastercontent").querySelectorAll("select");
//              for( let i=0; i <elmns.length; i++){
//                let htmlElem = elmns[i];
//                let elemValue =(orgelmns[i] as HTMLSelectElement).selectedIndex;
//           console.log("selectedindex: "+elemValue);
//                htmlElem.setAttribute("SI",elemValue.toString());/// as HTMLSelectElement).selectedIndex=elemValue;
            
//            }
    
//     var blobMessage = new Blob([screenshot.outerHTML],{type:'text/html'});

//     // let message = new SocketMessage2("3", blobMessage,"0","0","0",left.toString(),top.toString(),"0","0")
           
//         return message;
// }

}