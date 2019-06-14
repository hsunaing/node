// export const serverURLL = {
//     serverURLdata: "http://10.2.12.31:3000"
//   };
// const FRUIT = "kiwi";
// const VEGETABLE = "carrot";
//const serverURLdata = 'http://10.2.12.45:3000'

const serverURLdata = 'http://leave-nodejs-echo.apps.us-east-2.online-starter.openshift.com'
// const serverURLdata = 'http://localhost:3000';
var currentPage =  window.location.href;
console.log('currentPage: '+currentPage);
function msLogin() {
    cordova.exec(onSuccess, onError, "MsAdLogin",                                         //class name
        "login",                      //action name
        []);
}
function msLogout() {
    if (deviceOS != 'web') {
        cordova.exec(onSuccess, onError, "MsAdLogin",                                         //class name
            "logout",                      //action name
            []);
    }


}
//tokenChk
function tokenChk() {

    

    cordova.exec(onSuccess, onError, "MsAdLogin",                                         //class name
        "deviceChk",                      //action name
        []);

    //cordova.exec(onSuccess, onError,  "MsAdLogin",                                         //class name
    //"tokenChk",                      //action name
    //[]);

}
function onSuccess(parameter) {
    console.log('success exec cordova', parameter);
}
function onError(error) {
    console.log('error exec cordova', error);
}
function forAndroid(data) {
    console.log('printing from mobile: ' + data);
}
function gotoInside(data) {
    if (deviceOS != 'web') {
        location.replace("leaveApply.html")
    }

}
function gotoHome(data) {
    location.replace("login.html")
}
function deviceChk(data){
    deviceOS = data
     localStorage.setItem("deviceOS", deviceOS);
     data = localStorage.getItem("deviceOS");
     console.log("Device OS is: "+data)
 }