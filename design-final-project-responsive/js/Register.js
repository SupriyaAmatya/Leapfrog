class Register {
    constructor(form, name, email, mobile, password, password2) {
        this.form = form;
        this.name = name;
        this.email = email;
        this.mobile = mobile;
        this.password = password;
        this.password2 = password2;
        this.register();

        this.users = [];
        this.isSuccess = false;
    }
    register() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();

            this.checkInputs();
            this.addUser();
        });
    }

    checkInputs() {
        // get the values from the inputs
        const nameValue = this.name.value
        const emailValue = this.email.value.trim();
        const mobileValue = this.mobile.value.trim();
        const passwordValue = this.password.value.trim();
        const password2Value = this.password2.value.trim();


        if (nameValue === '') {
            this.setErrorFor(this.name, 'Please specify your Name');
        } else {
            this.setSuccessFor(this.name);

        }

        if (emailValue === '') {
            this.setErrorFor(this.email, 'Please specify your Email');
        } else if (!this.isEmail(emailValue)) {
            this.setErrorFor(this.email, 'Not a valid email (eg: abc@xyz.com)');
        } else {
            this.setSuccessFor(this.email);
        }

        if (passwordValue === '') {
            this.setErrorFor(this.password, 'Password cannot be blank');
        } else {
            this.setSuccessFor(this.password);
        }

        if (password2Value === '') {
            this.setErrorFor(this.password2, 'Password cannot be blank');
        } else if (passwordValue !== password2Value) {
            this.setErrorFor(this.password2, 'Passwords does not match');
        } else {
            this.setSuccessFor(this.password2);
        }

        if (mobileValue === '') {
            this.setErrorFor(this.mobile, 'Please specify your Mobile number');
        } else {
            this.setSuccessFor(this.mobile);
        }

        // this.success();
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

    addUser() {
        let user = {
            name: this.name.value,
            email: this.email.value,
            mobile: this.mobile.value,
            password: this.password.value,
        }
        this.users.push(user);
        // this.form.reset();

        console.log("added", this.users);
        //saving to localStorage
        localStorage.setItem('Users_List', JSON.stringify(this.users));
    }

    success() {
        if (this.isSuccess) {
            document.getElementById('successful').style.display = "block";
            document.getElementById('register-content').style.display = "none";
        }
    }
}

const form = document.getElementById('register-form');
const name = document.getElementById('name');
const password = document.getElementById('password');
const password2 = document.getElementById('cpassword');
const mobile = document.getElementById('mobile');
const email = document.getElementById('email');

let register = new Register(form, name, email, mobile, password, password2);