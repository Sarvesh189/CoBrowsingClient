import{Component,DoCheck,Pipe,PipeTransform,KeyValueDiffers,Inject} from '@angular/core';
import{HerosocketService} from './herosocket.service';
import { DomSanitizer,DOCUMENT } from '@angular/platform-browser';


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
 //template:'<div id="content" *ngFor="let message of herosocketservice.messageList" innerHTML={{message}}></div>',
   template:'<div id="content" [innerHTML]="herosocketservice.mirrorScreenText|safeHtml" ></div>',
 providers:[HerosocketService]
})
export class MirrorComponent implements DoCheck
{
    message:string;
    differ: any;
    constructor(public herosocketservice:HerosocketService,public domSanitize:DomSanitizer,private differs: KeyValueDiffers,@Inject(DOCUMENT) private  mirrordocument: Document)
    {
      herosocketservice.connect();
      console.log("you are in mirror component");
      this.differ = differs.find({}).create(null);
    //domSanitize.
     // this.message=herosocketservice.mirrorScreenText;
    
      }
   
      ngDoCheck()
      {
        var changes = this.differ.diff(this.herosocketservice);
      
      if(changes) {
     
      console.log(this.herosocketservice.currentscroll.sx);
      console.log(this.herosocketservice.currentscroll.sy);
      //window.scrollTo(100,300);
         window.scrollTo(Math.floor(parseInt(this.herosocketservice.currentscroll.sx)),Math.floor(parseInt(this.herosocketservice.currentscroll.sy)));
		} else {
			console.log('nothing changed');
		}
      
        // var changes = this.differ.diff(this.herosocketservice.currentscroll.sx)||this.differ.diff(this.herosocketservice.currentscroll.sy);
        /*if(changes[this.herosocketservice.currentscroll.sx])
          {
             window.scrollTo(this.herosocketservice.currentscroll.sx,this.herosocketservice.currentscroll.sy);
      
            }*/
      }


 }
