const User = require("../models/users");

let users = [{
    fullName: 'Ibrahim Keshta',
    email: 'user1@gmail.com',
    password: "12345678"
}, {
    fullName: 'Zakarya Keshta',
    email: 'user2@gmail.com',
    password: "12345678"
}]
async function createUsers(users = []){
    try {
        if(users.length == 0){
            throw new Error("no users sent");
        }
        let x;
        await Promise.all(users.map(async user => {
            return new Promise(async (resolve, reject) => {
            new User(user).save((e, newuser) => {
                if(e) throw new Error(e);
               return resolve(newuser)
            })
        })
        })).then(result => {
            return x = result
        })
        return x
    } catch (error) {
        return error;
    }
}

createUsers(users).then(success => {
    console.log('success', success);
}).catch(e => {
    console.log('error', e);
})