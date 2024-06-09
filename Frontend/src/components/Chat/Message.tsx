const Message = ({ message: { text, user }, name }: any) => {
  const isSentByCurrentUser = user.trim().toLowerCase() === name.trim().toLowerCase();

  return isSentByCurrentUser ? (
    <div className="flex justify-end">
      <div className="bg-blue-500 text-white rounded-lg p-2 max-w-xs w-full mb-2">
        <p>{text}</p>
      </div>
    </div>
  ) : (
    <div className="flex justify-start">
      <div className="bg-gray-200 rounded-lg p-2 max-w-xs w-full mb-2">
        <p className="text-gray-800 font-semibold mb-1">{user}</p>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Message;
