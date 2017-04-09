const {Users} = require('./users.js');
const expect = require('expect');

describe('Users', () => {
    var users; 

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Mike',
            room: 'Node Course'
        }, {
            id: '2',
            name: 'Boob',
            room: 'Batman'
        }, {
            id: '3',
            name: 'George',
            room: 'Node Course'
        }]
    });

    it('should add new user', () => {
        var users = new Users();
        var user = {
            id: '123',
            name: 'Boob',
            room: 'Batman'
        }
        var resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]); //to equal the user object above 
        //variable users above accessing users array
        console.log(users.users);
    })

    it('should return names for node course', () => {
        var userList = users.getUserList('Node Course');
        console.log(userList);
        expect(userList).toEqual(['Mike', 'George'])
    });
    it('should return names for batman room', () => {
        var userList = users.getUserList('Batman');
        console.log(userList);
        expect(userList).toEqual(['Boob']);
    });
    it('should remove a user', () => {
        var userId = '1';
        var user = users.removeUser(userId);

        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);

    });
    it('should not remove user', () => {
        var userId = '5';
        var user = users.removeUser(userId);

        expect(user).toNotExist();
        expect(users.users.length).toBe(3);

    });
    it('should find user', () => {
        var userId = '2';
        var user = users.getUser(userId);
        
        expect(user.id).toBe(userId);

    });
    it('should not find user', () => {
        var userId = '4';
        var user = users.getUser(userId);

        expect(user).toNotExist();

    });
})