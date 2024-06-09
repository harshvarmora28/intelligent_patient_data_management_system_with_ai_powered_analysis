import { MdSend } from "react-icons/md";

const Input = ({ message, setMessage, sendMessage }: any) => (
  <div className="w-full" style={{ position: "absolute", bottom: 10 }}>
    <form className="flex w-full items-center gap-2">
      <input
        className="input p-4 border-4 rounded-lg"
        type="text"
        placeholder="Type a Message..."
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyPress={(event) =>
          event.key === "Enter" ? sendMessage(event) : null
        }
        style={{width: '800px'}}
      />
      <MdSend className="sendIcon" onClick={(event) => sendMessage(event)} />
    </form>
  </div>
);

export default Input;
