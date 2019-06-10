//this js has functions necessary for login

var loginFuncs = function(){
var Parent_var=this;
var emal,pswd;
 this.validateCredentials = function (){
    emal = $('#login-username').val();
    pswd = $('#login-password').val();
    if($('#login-username').val().length == 0 && $('#login-password').val().length){
        alert("Please Enter Username and Password");
    }
    else if($('#login-username').val().length == 0 )
        alert('Please Enter Username');

    else if($('#login-password').val().length == 0)
        alert('Please Enter Password');

    else if($('#login-password').val().length < 8)
        alert('Password should not be less than 8 Characters');

    else{
        var validEml = this.validateEmail(emal);
        if(!validEml)
            alert("Email is not valid");

        else{
            this.login(emal,pswd);
        }

    }
 },

this.showWarning = function(errMsg){
   $('.alert-warning').show();
   $('.err-info').text(errMsg);
   setTimeout(function(){
       $('.alert-warning').hide();
       $('.err-info').text("");
   }, 10000);
},

 this.login = function(un,pwd){
        // $.ajax("http://localhost:3000/login",
        $.ajax(serverURLdata+"/login", 
            {
                type: "POST",
                data: {'email':un,'password':pwd},
                statusCode: {
                    404: function (response) {
                        console.log('404', resp);
                        //warning.showWarning(" Server Error");
                        Parent_var.showWarning(" Server Error");
                    },
                    401: function(response){
                        console.log("401");
                        Parent_var.showWarning(response.responseJSON['result'] );
                        //var warning = new showWarning(response.responseJSON['result']);
                    }
                },
                success: function (response) {
                    //console.log(response.msg);
                    var resp = response.msg;
                    if(resp == 'success'){
                        window.location.href = response.result;
                    }
                    else
                        Parent_var.showWarning("Error ");
                        //warning.showWarning("Error ");

                },
                fail : function (response) {
                    //warning.showWarning("Request failed");
                    Parent_var.showWarning("Request failed ");
                }
            });
 },

 this.validateEmail = function(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
    }
}

var ObjVar=new loginFuncs();//object instance to access loginFuncs objec properties


$('#btn-login').click(function(){
    ObjVar.validateCredentials();
})

function loginWithMSAD(accessToken, anotherObj){
    console.log('Obj Print:', accessToken, 'another:: ', anotherObj)
    //$.ajax("http://localhost:3000/adlogin",
    $.ajax(serverURLdata+"/adlogin", 
    {
        type: "POST",
        // headers: {
        //     "authorization": accessToken,
        //     "msqObj": anotherObj.id
        // },
        data: {'authorization':accessToken,'msqObj':anotherObj},
        statusCode: {
            404: function (response) {
                console.log('404', resp);
                //warning.showWarning(" Server Error");
                this.showWarning(" Server Error");
            },
            401: function(response){
                console.log("401");
                this.showWarning(response.responseJSON['result'] );
                //var warning = new showWarning(response.responseJSON['result']);
            }
        },
        success: function (response) {
            console.log('api return:: ',response.result.id);
            console.log('api return:: ',response.result.id+''+response.tourl);
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
        fail : function (response) {
            //warning.showWarning("Request failed");
            this.showWarning("Request failed ");
        }
    });
}