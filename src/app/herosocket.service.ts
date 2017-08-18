import{Injectable} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Injectable()
 export class HerosocketService  {
       mirrorScreenText:string;
       host:string = "ws://localhost:5599/api/messaging";
       webconnector: WebSocket;
       currentscroll:any={"sx":"","sy":"","x":"","y":""};
       connect():void{
        this.webconnector = new WebSocket(this.host);
        this.webconnector.onopen= function()
            {
                if(this.readyState!==WebSocket.CLOSING)
               this.send("herosocket");


            };
        this.webconnector.onmessage = ((messageEvent)=>{
             console.log(messageEvent.data)
//              if(document.getElementById("content")!==null){
//              var text = JSON.parse(messageEvent.data);
//                 document.getElementById("content").innerHTML = text.message;
//               var script = document.createElement("script");
//               script.textContent="("+window.scrollTo(text.sx,text.sy)+")()";
//               document.body.appendChild(script);
//   console.log(text.sx);
//              }
            var text = JSON.parse(messageEvent.data);
          this.mirrorScreenText =text.message;
          this.currentscroll.sx=text.sx;
          this.currentscroll.sy = text.sy;
             }



        //      var elmns = document.querySelectorAll("input[type=text]");
        //      for( var i=0; i <elmns.length; i++){
        //        var htmlElem = elmns[i];
        //        htmlElem.setAttribute("value",htmlElem.getAttribute("name"));
        //    }
               

           

        //   //  var link = document.getElementById('content') as HTMLCanvasElement;
       
        //   //  window.URL = window.URL+"/Mirror";
        
        //      var binaryData = [];
        //      binaryData.push(messageEvent.data);
        //   //   alert( window.URL.createObjectURL(new Blob(binaryData, {type: "text/html"})));
            
        //     // alert(window.URL.createObjectURL(binaryData));
        //    // link.src = window.URL.createObjectURL(new Blob(binaryData, {type: "text/html"}));
            
        //    // console.log( link.rel)   
        //              var _canvas =   document.getElementById("content") as HTMLCanvasElement;
        //             var ctx = _canvas.getContext('2d');
        //             var img = new Image();

        //             img.onload = function(){
        //                 ctx.drawImage(img, 0, 0)
        //                 }

        //             img.src = URL.createObjectURL(new Blob(binaryData));
       
        );
        this.webconnector.onclose = (closeEvent)=>
        {

            console.log(closeEvent.reason);
        }
    
       }
      close():void{
        if(this.webconnector.readyState===WebSocket.OPEN)
        this.webconnector.close();
      }
      sendMessage():void{
            console.log("message  sending.");
            var screeninfo =  this.screenshotPage();
            console.log(screeninfo);
            setTimeout(()=> {
              
              var message = {"message":screeninfo,"sx":this.currentscroll.sx,"sy":this.currentscroll.sy,"id":"1213","x":"","y":""};
               this.webconnector.send(JSON.stringify(message));
 
            }, 500);   
      }
    sendBlobMessage(blobmessage: Blob):void{
        setTimeout(()=>{
        console.log("blobmessage sending");
        this.webconnector.send(blobmessage);

        },500);
        

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
       // window.addEventListener('DOMContentLoaded', function (e) {
            alert('1');
            var scrollX = Number(500) || 0;
            var scrollY = Number(500) || 0;
            window.scrollTo(scrollX, scrollY);
      //  }
//);
    }

  // TODO: current limitation is css background images are not included.
 screenshotPage():string {

      this.urlsToAbsolute(document.images);
       this.urlsToAbsolute(document.querySelectorAll("link[rel='stylesheet']"));
      //  var screenshot2 = document.documentElement.cloneNode(true);
        var screenshot2 = document.getElementById("mastercontent").cloneNode(true);
    //    alert(screenshot2.childNodes.length);
       var screenshot = screenshot2 as HTMLElement;
        var b = document.createElement('base');
        b.href = document.location.protocol + '//' + location.host;
        //var head = screenshot.querySelector('head');
       // head.insertBefore(b, head.firstChild);
        screenshot.style.pointerEvents = 'none';
        screenshot.style.overflow = 'hidden';
        screenshot.style.webkitUserSelect = 'none';
      //  screenshot.style.mozUserSelect = 'none';
        screenshot.style.msUserSelect = 'none';
     //   screenshot.style.oUserSelect = 'none';
        screenshot.style.userSelect = 'none';
    var top  = window.pageYOffset || document.documentElement.scrollTop,
    left = window.pageXOffset || document.documentElement.scrollLeft;
        this.currentscroll.sy = top.toString();
       this.currentscroll.sx = left.toString();
//         var script = document.createElement('script');
//         script.textContent = '(' + this.addOnPageLoad_.toString() + ')();';
//         screenshot.appendChild(script);
        
        var elmns = screenshot.querySelectorAll("input[type=text]");
        var orgelmns = document.getElementById("mastercontent").querySelectorAll("input[type=text]");
             for( var i=0; i <elmns.length; i++){
               var htmlElem = elmns[i];
               var elemValue =(orgelmns[i] as HTMLInputElement).value;
          
               htmlElem.setAttribute("value",elemValue);
            
           }



     //   var blob = new Blob([screenshot.outerHTML], {type: 'text/html'});
         var blob = screenshot.outerHTML;
       
        return blob;
}

    }

