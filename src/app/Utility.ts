
export class Logger
{
    
    static log(message:string):void
    {
        let time=new Date();
        console.log(time.toLocaleDateString()+" "+time.getHours()+":"+time.getMinutes()+":"+time.getSeconds()+" : "+message);
    }

}