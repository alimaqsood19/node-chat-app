class Users {
    constructor () {
        this.users = [];
    }
    addUser (id, name, room) {
        var user = {
            id: id,
            name: name,
            room: room
        }
        this.users.push(user);
        return user;
    }
    removeUser (id) {
        // return user that was removed from users array
        var user = this.users.filter((individualUser) => {
            return individualUser.id === id 
        });
        if (user) {
            this.users = this.users.filter((individualUser) => {
                return individualUser.id !== id
            })
        }

        return user[0]


    }
    getUser (id) {
        var user = this.users.filter((individualUser) => {
            return individualUser.id === id
        })
        return user[0]
    }
    getUserList (room) {
        //iterate through the user array and find the users that matches room name 
        var users = this.users.filter((individualUser) => { //filters through the this.users array and creates a new array if true to condition
            return individualUser.room === room //passes true or false and will not add to the array users made above
        })
        var namesArray = users.map((individualUser) => { //filters through the filtered array and then creates a new array with a specified proeprty
            return individualUser.name //returns from the object just the name property string
        })
        return namesArray; //returns an array of names that are in a specified room 
    }
}

module.exports = {
    Users: Users
}