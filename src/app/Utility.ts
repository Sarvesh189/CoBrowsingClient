import{MouseEventMessage} from './EventMessage'
export class Logger
{
    
    static log(message:string):void
    {
        let time=new Date();
        console.log(time.toLocaleDateString()+" "+time.getHours()+":"+time.getMinutes()+":"+time.getSeconds()+" : "+message);
    }

}

export class MaskDisplay
{
    static MaskInput(elementValue:any):string
    {
        for(let i=0; i <elementValue.length;i++)
            {
               
        elementValue = elementValue.replace(/[a-z0-9A-Z]/,'*');
        console.log(elementValue);
            }
        return elementValue;
    }

}

export class HandleEvent
{
    evtMessage:MouseEventMessage;
    FireEvent(eventMessage:string)
    {
         this.evtMessage = JSON.parse(eventMessage);
         let pointX = this.evtMessage.ClientX - this.evtMessage.parentX;
         
         
         let pointY = this.evtMessage.ClientY - this.evtMessage.parentY;
         
         let masterLocation = this.getOffset(); 
         console.log(masterLocation);
         pointX = pointX + masterLocation.left;
         pointY = pointY + masterLocation.top;
         console.log(pointX);
         console.log(pointY);
         let targetElement = document.elementFromPoint(pointX,pointY);
         console.log(targetElement);
         let event = new MouseEvent("click",{view:window,bubbles: true,cancelable: true});

         if(targetElement != null)
            {
              targetElement.dispatchEvent(event);  
            }
    }

    getOffset() {

        let el = document.getElementById("mastercontent").getBoundingClientRect();
        
        return {
          left: el.left + window.scrollX,
          top: el.top + window.scrollY
        }
      }

}