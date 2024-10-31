const loginForm = document.getElementById("loginForm");


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


let diaryApp = "";

if(localStorage.getItem("diaryApp")){
    let response = JSON.parse(localStorage.getItem("diaryApp"));
    diaryApp = new Network(response.name, response.users)
    console.log(diaryApp)
}else{
    localStorage.setItem("diaryApp", JSON.stringify({name: "diaryApp", users: []}))
    let response = JSON.parse(localStorage.getItem("diaryApp"));
    diaryApp = new Network(response.name, response.users)
    console.log(diaryApp)
}




loginForm.addEventListener("submit", (event) =>{
    event.preventDefault();
    const formData = new FormData(loginForm);
    const data = Object.fromEntries(formData)
    if(diaryApp.users.some(item => item.email == data.email)){
        alert("Existing user")
    }else{
        let user = new User(data.email, data.password);
        diaryApp.users.push(user);
        localStorage.setItem("diaryApp", JSON.stringify(diaryApp))
        console.log(diaryApp)
    }
})


