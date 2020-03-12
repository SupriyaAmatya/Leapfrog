// function Login() {


//     document.getElementById("login-btn")
//         .addEventListener("click", function() {
//             document.querySelector(".login-modal").style.display = "flex";
//         });

//     document.querySelector(".close")
//         .addEventListener("click", function() {
//             document.querySelector(".login-modal").style.display = "none";
//         })
// }

class Login {
    constructor(form) {
        this.form = form;
        this.email = document.getElementById('user-email');
        this.password = document.getElementById('user-password');;
        this.init();
    }

    init() {
        let loginBtn = document.querySelectorAll(".login-btn");
        for(let i = 0; i<loginBtn.length; i++){
            loginBtn[i].addEventListener("click", function() {
                document.querySelector(".login-modal").style.display = "flex";
            });
        }
        

        document.querySelector(".close")
            .addEventListener("click", function() {
                document.querySelector(".login-modal").style.display = "none";
            });
        // console.log(localStorage.getItem("User_List"));
        // console.log(this.email);
        this.login();

    }
    login() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();

            this.checkInputs();
        });
    }

    checkInputs() {
        const emailValue = this.email.value.trim();
        const passwordValue = this.password.value.trim();

        let users;
        if (localStorage.getItem('Users_List')) {
            users = JSON.parse(localStorage.getItem('Users_List'))
        } else {
            users = [];
        }


        if (emailValue === '') {
            this.setErrorFor(this.email, 'Enter your E-mail/Mobile number');
        } else if (!this.isEmail(emailValue)) {
            this.setErrorFor(this.email, 'Not a valid email (eg: abc@xyz.com)');
        } else if (emailValue != users[0].email) {
            this.setErrorFor(this.email, 'Email is invalid');
        } else if (emailValue === users[0].email) {
            this.setSuccessFor(this.email);
        }

        if (passwordValue === '') {
            this.setErrorFor(this.password, 'Enter your password');
        } else if (passwordValue != users[0].password) {
            this.setErrorFor(this.password, 'Password is incorrect');
        } else {
            this.setSuccessFor(this.password);
        }

        this.successLogin()
    }

    setErrorFor(input, message) {
        const formControl = input.parentElement;
        const small = formControl.querySelector('small');
        formControl.className = 'form-control error';
        small.innerText = message;
        this.isSuccess = false;
    }

    setSuccessFor(input) {
        const formControl = input.parentElement;
        formControl.className = 'form-control success';
        this.isSuccess = true;
    }

    isEmail(email) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    }

    successLogin() {
        document.querySelector(".login-modal").style.display = "none";

        document.getElementById('user-name').style.display = 'block';
        document.getElementById('login-btn').style.display = 'none';
    }
}
const form = document.getElementById('login-form')
var login = new Login(form);