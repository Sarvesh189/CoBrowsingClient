import{Component,DoCheck,Pipe,PipeTransform,KeyValueDiffers,Inject,ViewEncapsulation,OnInit} from '@angular/core';
import{HerosocketService} from './herosocket.service';
import { DomSanitizer,DOCUMENT } from '@angular/platform-browser';
import{ActivatedRoute} from'@angular/router';
import { ModalService } from './modal.service';

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
   providers:[HerosocketService]
})
export class MirrorComponent implements DoCheck,OnInit
{
    message:string;
    differ: any;
    
    constructor(public herosocketservice:HerosocketService,public domSanitize:DomSanitizer,private differs: KeyValueDiffers,@Inject(DOCUMENT) private  mirrordocument: Document, private currentroute:ActivatedRoute,private modalService:ModalService)
    {
      console.log("Mirror component instanciation started");
      let _chatroomId='';
      currentroute.url.forEach(function(item) { 
      if(item[1]!=null)
        herosocketservice.currentchatroomid = item[1].toString();
      
       
       _chatroomId = item[1].toString();
      });
      
        console.log(_chatroomId);
      
      herosocketservice.connect("");
      
      this.differ = differs.find({}).create(null);
      console.log("Mirrorcomponent instanciated") 
    
    
      }
      ngOnInit()
      {
        if(this.modalService != null)
          {
            this.modalService.displaychatbox(this.herosocketservice.currentchatroomid);
           }
         else {console.log("modal service is null");}

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
       console.log(document);
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
