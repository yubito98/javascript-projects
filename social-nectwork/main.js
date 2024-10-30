class User{
    constructor(email, password){
        this.email = email;
        this.password = password;
    }

}


class Network{
    constructor(name, users){
        this.name = name;
        this.users = users
    }

    addUser(user){
        this.users.push(user);
        alert(`User ${user.email} have been added`)
    }
}


const user1 = new User("Yubor", "123");
const diaryApp = new Network("Diary App", []);

console.log(user1)
console.log(diaryApp)
