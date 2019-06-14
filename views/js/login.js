
//this js has functions necessary for login
loggedIN = "MS";
var loggedIN;

var loginFuncs = function () {
    var Parent_var = this;
    var emal, pswd;
    this.validateCredentials = function () {
        emal = $('#login-username').val();
        pswd = $('#login-password').val();
        if ($('#login-username').val().length == 0 && $('#login-password').val().length) {
            alert("Please Enter Username and Password");
        }
        else if ($('#login-username').val().length == 0)
            alert('Please Enter Username');

        else if ($('#login-password').val().length == 0)
            alert('Please Enter Password');

        else if ($('#login-password').val().length < 8)
            alert('Password should not be less than 8 Characters');

        else {
            var validEml = this.validateEmail(emal);
            if (!validEml)
                alert("Email is not valid");

            else {
                this.login(emal, pswd);
            }

        }
    },

        this.showWarning = function (errMsg) {
            $('.alert-warning').show();
            $('.err-info').text(errMsg);
            setTimeout(function () {
                $('.alert-warning').hide();
                $('.err-info').text("");
            }, 10000);
        },

        this.login = function (un, pwd) {
            console.log('this.login: ' + un + 'another:: ' + pwd)
            // $.ajax("http://localhost:3000/login",
            //    $.ajax(serverURLdata+"/login",
            //        {
            //            type: "POST",
            //            data: {'email':un,'password':pwd},
            //            statusCode: {
            //                404: function (response) {
            //                    console.log('404', resp);
            //                    //warning.showWarning(" Server Error");
            //                    Parent_var.showWarning(" Server Error");
            //                },
            //                401: function(response){
            //                    console.log("401");
            //                    Parent_var.showWarning(response.responseJSON['result'] );
            //                    //var warning = new showWarning(response.responseJSON['result']);
            //                }
            //            },
            //            success: function (response) {
            //                //console.log(response.msg);
            //                var resp = response.msg;
            //                if(resp == 'success'){
            //                    window.location.href = response.result;
            //                }
            //                else
            //                    Parent_var.showWarning("Error ");
            //                    //warning.showWarning("Error ");

            //            },
            //            fail : function (response) {
            //                //warning.showWarning("Request failed");
            //                Parent_var.showWarning("Request failed ");
            //            }
            //        });
        },

        this.validateEmail = function (email) {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }
}

var ObjVar = new loginFuncs();//object instance to access loginFuncs objec properties


$('#btn-loginn').click(function () {
    ObjVar.validateCredentials();
})

function loginDebugNow(un, pwd) {

    var Parent_var = this;
    var emal, pswd;

    this.validateCredentials = function () {
        emal = $('#login-username').val();
        pswd = $('#login-password').val();
        un = emal;
        pwd = pswd;
        if ($('#login-username').val().length == 0 && $('#login-password').val().length) {
            alert("Please Enter Username and Password");
        }
        else if ($('#login-username').val().length == 0)
            alert('Please Enter Username');

        else if ($('#login-password').val().length == 0)
            alert('Please Enter Password');

        else if ($('#login-password').val().length < 8)
            alert('Password should not be less than 8 Characters');

        else {
            var validEml = this.validateEmail(emal);
            if (!validEml)
                alert("Email is not valid");

            else {
                this.login(emal, pswd);
            }

        }
    },

        this.showWarning = function (errMsg) {
            $('.alert-warning').show();
            $('.err-info').text(errMsg);
            setTimeout(function () {
                $('.alert-warning').hide();
                $('.err-info').text("");
            }, 10000);
        },

        this.login = function (un, pwd) {
            console.log('this.login: ' + un + 'another:: ' + pwd)
            // $.ajax("http://localhost:3000/login",
            $.ajax(serverURLdata + "/login",
                {
                    type: "POST",
                    data: { 'email': un, 'password': pwd },
                    statusCode: {
                        404: function (response) {
                            console.log('404', resp);
                            //warning.showWarning(" Server Error");
                            Parent_var.showWarning(" Server Error");
                        },
                        401: function (response) {
                            console.log("401");
                            Parent_var.showWarning(response.responseJSON['result']);
                            //var warning = new showWarning(response.responseJSON['result']);
                        }
                    },
                    success: function (response) {
                        //console.log(response.msg);
                        var resp = response.msg;
                        if (resp == 'success') {
                            localStorage.setItem("loggedIN", "OK");
                            let tmp = localStorage.getItem("deviceOS");
                            if (tmp == 'web') {
                                window.location.href = response.result;
                            } else {
                                let tmp = response.result;
                                tmp = tmp.substring(1);
                                console.log('after trim: ' + tmp);
                                location.replace(tmp + '.html');
                            }

                        }
                        else
                            Parent_var.showWarning("Error ");
                        //warning.showWarning("Error ");

                    },
                    fail: function (response) {
                        //warning.showWarning("Request failed");
                        Parent_var.showWarning("Request failed ");
                    }
                });
        },

        this.validateEmail = function (email) {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }
    this.validateCredentials();
    console.log('loginDebugNow: ' + un + 'another:: ' + pwd)

}

//var deviceOSin = deviceOS;
function loginWithMSAD(accessToken, anotherObj) {
    let tmp = localStorage.getItem("deviceOS");
    if (tmp == 'droid') {
        console.log('inside droid converting!');
        anotherObj = JSON.parse(anotherObj);
    }


    console.log(serverURLdata)
    console.log('Obj Print:', accessToken, 'another:: ', anotherObj)
    //$.ajax("http://localhost:3000/adlogin",
    $.ajax(serverURLdata + "/adlogin",
        {
            type: "POST",
            // headers: {
            //     "authorization": accessToken,
            //     "msqObj": anotherObj.id
            // },
            data: { 'authorization': accessToken, 'msqObj': anotherObj },
            statusCode: {
                404: function (response) {
                    console.log('404', resp);
                    //warning.showWarning(" Server Error");
                    this.showWarning(" Server Error");
                },
                401: function (response) {
                    console.log("401");
                    this.showWarning(response.responseJSON['result']);
                    //var warning = new showWarning(response.responseJSON['result']);
                }
            },
            success: function (response) {
                var deviceOSin = '';
                console.log('api return:: ', response.result.id);
                console.log('api return:: ', response.result.id + '' + response.tourl);
                //location.replace("leaveApply.html")
                let tmp = localStorage.getItem("deviceOS");
                if (tmp == 'droid') {
                    localStorage.setItem("loggedIN", "MS");
                    let tmp = response.tourl;
                    tmp = tmp.substring(1);
                    console.log('after trim: ' + tmp);
                    location.replace(tmp + '.html');
                } else {
                    //loggedIN = "MS"


                    localStorage.setItem("loggedIN", "MS");
                    window.location.href = response.tourl;
                }

                //var strArr = "Full Stack Developer, Technology Transformation".split(",");
                // window.location.href = response.tourl;
                //var resp = response.msg;
                // if(resp == 'success'){
                //     window.location.href = response.result;
                // }
                // else
                //     this.showWarning("Error ");
                //warning.showWarning("Error ");

            },
            fail: function (response) {
                //warning.showWarning("Request failed");
                this.showWarning("Request failed ");
            }
        });
}
function logoutWithMSAD() {
    console.log(serverURLdata)
    //$.ajax("http://localhost:3000/adlogin",
    $.ajax(serverURLdata + "/logout",
        {
            type: "GET",
            // headers: {
            //     "authorization": accessToken,
            //     "msqObj": anotherObj.id
            // },
            // data: { 'authorization': accessToken, 'msqObj': anotherObj },
            statusCode: {
                404: function (response) {
                    console.log('404', resp);
                    //warning.showWarning(" Server Error");
                    this.showWarning(" Server Error");
                },
                401: function (response) {
                    console.log("401");
                    this.showWarning(response.responseJSON['result']);
                    //var warning = new showWarning(response.responseJSON['result']);
                }
            },
            success: function (response) {
                // localStorage.setItem("loggedIN", "MS");
                loggedIN = localStorage.getItem("loggedIN");
                if (loggedIN == "MS") {
                    signOutIn();
                    console.log('working signout!!')
                    localStorage.setItem("loggedIN", "");
                } else {
                    let tmp = localStorage.getItem("deviceOS");
                            if (tmp == 'web') {
                                window.location.href = "/";
                            } else {
                                // let tmp = response.result;
                                // tmp = tmp.substring(1);
                                // console.log('after trim: ' + tmp);
                                location.replace('login.html');
                            }
                }

                // var deviceOSin = '';
                // console.log('api return:: ', response.result.id);
                // console.log('api return:: ', response.result.id + '' + response.tourl);
                // //location.replace("leaveApply.html")
                // if (deviceOSin == 'wb') {
                //     var tmp = response.tourl;
                //     tmp = tmp.substring(1);
                //     console.log('after trim: ' + tmp);
                //     location.replace(tmp + '.html');
                // } else {
                //     window.location.href = response.tourl;
                // }

                //var strArr = "Full Stack Developer, Technology Transformation".split(",");
                // window.location.href = response.tourl;
                //var resp = response.msg;
                // if(resp == 'success'){
                //     window.location.href = response.result;
                // }
                // else
                //     this.showWarning("Error ");
                //warning.showWarning("Error ");

            },
            fail: function (response) {
                //warning.showWarning("Request failed");
                this.showWarning("Request failed ");
            }
        });
}