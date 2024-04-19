class Users {
  constructor() {
    this.listOfUser = [];
  }

  addUser(id, name, room) {
    const user = { id, name, room };
    this.listOfUser.push(user);
  }

  getUserById(id) {
    const user = this.listOfUser.filter((user) => user.id === id)[0];
    return user;
  }

  removeUser(id) {
    const user = this.getUserById(id);
    const theList = this.listOfUser.filter((user) => user.id !== id);
    this.listOfUser = theList;
    return user;
  }

  getListOfUserInRoom(room) {
    const theList = this.listOfUser.filter((user) => user.room === room);
    return theList;
  }
}

module.exports = { Users };
