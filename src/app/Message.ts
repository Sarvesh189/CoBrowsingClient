export class SocketMessage
{
   
    constructor( public MessageType:string,public Message:string, public UserCount:string, public ChatRoomId:string,public UserId:string,public ScrollX:string, public ScrollY:string, public X:string, public Y:string)
    {}

    GetMessageInfo():string{
        return "MessageType: "+this.MessageType+ " Message: "+this.Message + " chatroomid "+this.ChatRoomId;

    }
}

export class UserInfoMessage
{
    MessageType:string;
    UserCount:string;
    Message:string;

   Init():void{
        
        this.Message="";
        this.UserCount="0";
        this.MessageType="-1";
        
    }
   SetUserInfoMessage(messagetype:string,usercount:string,message:string):void
    {
        this.Message=message;
        this.UserCount=usercount;
        this.MessageType=messagetype;
    }
}
export let _userInfo = new UserInfoMessage();