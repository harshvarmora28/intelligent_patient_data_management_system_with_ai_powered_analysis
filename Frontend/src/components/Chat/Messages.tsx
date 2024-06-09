import Message from './Message';

const Messages = ({ messages, name } : any) => (
    <div className="messages">
      {messages.map((message: any, i: any) => <div key={i}><Message message={message} name={name}/></div>)}
    </div>
  ); 


export default Messages;