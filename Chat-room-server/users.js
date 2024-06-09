const users = [];

const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  if(!name || !room) return { error: 'Username and room are required.' };

  const user = { id, name, room };

  users.push(user);

  return { user };
}

const getRoomList = () => {
  // Extract unique room names
  const rooms = users.reduce((roomList, user) => {
    if (!roomList.includes(user.room)) {
      roomList.push(user.room);
    }
    return roomList;
  }, []);

  return rooms;
};

console.log(getRoomList())

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if(index !== -1) return users.splice(index, 1)[0];
}

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };