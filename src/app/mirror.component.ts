import{Component,DoCheck,Pipe,PipeTransform,KeyValueDiffers,Inject,ViewEncapsulation,OnInit,HostListener} from '@angular/core';
import{HerosocketService} from './herosocket.service';
import { DomSanitizer,DOCUMENT } from '@angular/platform-browser';
import{ActivatedRoute} from'@angular/router';
import { ModalService,MessageObservableService } from './modal.service';
import{MouseEventMessage} from './EventMessage';
import {cbEventSocketService} from './cbEventSocket.service';
import {HandleEvent} from './Utility';


@Pipe({ name: 'safeHtml'})
export class SafeHtmlPipe implements PipeTransform  {
  constructor(private sanitized: DomSanitizer) {}
  transform(value) {
   // console.log(this.sanitized.bypassSecurityTrustHtml(value))
    return this.sanitized.bypassSecurityTrustHtml(value);

  }
}



@Component({
 selector:"mirror",
 styleUrls: ['./app.component.css'], 
   template:`<div id="content" [innerHTML]="herosocketservice.message.Message|safeHtml" ></div>
   <chat-modal></chat-modal>`,
 encapsulation: ViewEncapsulation.None,
   providers:[HerosocketService,cbEventSocketService]
})
export class MirrorComponent implements DoCheck,OnInit
{
    message:string;
    differ: any;
    chatroomId:string;
    handleEvent:HandleEvent;
    constructor(public herosocketservice:HerosocketService,public domSanitize:DomSanitizer,private differs: KeyValueDiffers,@Inject(DOCUMENT) private  mirrordocument: Document, private currentroute:ActivatedRoute,private modalService:ModalService,private messageOservice:MessageObservableService,private cbEventService:cbEventSocketService)
    {
      this.handleEvent = new HandleEvent();
      console.log("Mirror component instanciation started");
      let _chatroomId='';
      currentroute.url.forEach(function(item) { 
      if(item[1]!=null)
        {
        herosocketservice.currentchatroomid = item[1].toString();     
        
       _chatroomId = item[1].toString();
        }
      });
      this.chatroomId = _chatroomId;
        console.log(_chatroomId);
      
      
      
      this.differ = differs.find({}).create(null);
      console.log("Mirrorcomponent instanciated") 
    
    
      }

      @HostListener('click',['$event'])
      onClick(evt:MouseEvent)
      {
         let _chatroomId = this.chatroomId;
        
         
         let parentlocation = this.handleEvent.getOffset();
         let mouseMsg = new MouseEventMessage(1,evt.srcElement.className+"$"+evt.srcElement.nodeName+"$"+evt.srcElement.id,'click','','',false,false,evt.pageX,evt.pageY,evt.clientX+window.scrollX,evt.clientY+window.scrollY,'','','','','','',parentlocation.left,parentlocation.top);

         
         this.cbEventService.sendMessage(mouseMsg);
        
         

      }

      // getOffset() {

      //   let el = document.getElementById("mastercontent").getBoundingClientRect();
        
      //   return {
      //     left: el.left + window.scrollX,
      //     top: el.top + window.scrollY
      //   }
      // }

      ngOnInit()
      {

        if(this.modalService != null)
          {
            this.modalService.displaychatbox(this.herosocketservice.currentchatroomid);
           }
         else {console.log("modal service is null");}

        let chatroomid = this.chatroomId;

         this.herosocketservice.connect("");
         this.cbEventService.connect(chatroomid).then((item)=>{console.log(item)});
      }
      ngDoCheck()
      {
        let changes = this.differ.diff(this.herosocketservice);
      
      if(changes) {
      console.log('scrolling');
      console.log(this.herosocketservice.sx);
      console.log(this.herosocketservice.sy);
      
         window.scrollTo(Math.floor(parseInt(this.herosocketservice.sx)),Math.floor(parseInt(this.herosocketservice.sy)));
		} else {
			console.log('nothing changed');
		}
      this.handleSelectItem();
        // var changes = this.differ.diff(this.herosocketservice.currentscroll.sx)||this.differ.diff(this.herosocketservice.currentscroll.sy);
        /*if(changes[this.herosocketservice.currentscroll.sx])
          {
             window.scrollTo(this.herosocketservice.currentscroll.sx,this.herosocketservice.currentscroll.sy);
      
            }*/
      }

      handleSelectItem():void{
       // alert('1')
       console.log("handleselectedItem is called");
       if(document.getElementById("mastercontent")!=null)
        {
         let selectElements = document.getElementById("mastercontent").querySelectorAll("select");
       // console.log(selectElements);
         for(let i=0; i<selectElements.length;i++)
          {
            console.log("inside loop")
            //console.log(selectElements[i]);
              let selectElement = selectElements[i];
              console.log(selectElement);
              let si = selectElement.getAttribute("si");
              console.log(si);
              selectElement.selectedIndex = parseInt(si);

          }
      }
      }

 }
