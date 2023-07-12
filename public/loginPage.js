let userForm = new UserForm();
userForm.loginFormCallback = data => {
    //console.log(data);
    ApiConnector.login (data, response => {
        console.log(response);
        if (response.success) {
            location.reload();
        }
    });
}

userForm.registerFormCallback = data => {
    ApiConnector.register(data, response =>{
        if (response.success) {
            location.reload();
        }
    })
}