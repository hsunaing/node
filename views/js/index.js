function init(){
	document.addEventListener("deviceready", function(){
		$(document).ready(function() {
            
            onDeviceReady();
            //msLogin();
            tokenChk();
            //deviceChk();
//		});
    }, false);
function onDeviceReady() {
    console.log('InApp is working!!!')
    window.open = cordova.InAppBrowser.open;

}

});
 //document.addEventListener("deviceready", onDeviceReady, false);
}
function testExec(){
    console.log('testExecRun')
    cordova.exec(onSuccess,                              //success callback
    onError,                                //error callback
    "MsAdLogin",                                         //class name
    "test",                      //action name 
    ["Dog", "Pig", 42, false]);

 var hello =   cordova.exec(onSuccess, onError,  "MsAdLogin",                                         //class name
"login",                      //action name 
[]);
        console.log('printing hello::', hello)
}
function msLogin() {
cordova.exec(onSuccess, onError,  "MsAdLogin",                                         //class name
"login",                      //action name
[]);
}
function msLogout() {
cordova.exec(onSuccess, onError,  "MsAdLogin",                                         //class name
"logout",                      //action name
[]);
}
//tokenChk
function tokenChk() {
cordova.exec(onSuccess, onError,  "MsAdLogin",                                         //class name
"deviceChk",                      //action name
[]);

cordova.exec(onSuccess, onError,  "MsAdLogin",                                         //class name
"tokenChk",                      //action name
[]);

}
function onSuccess(parameter){
    console.log('success exec cordova', parameter);
}
function onError(error){
    console.log('error exec cordova', error);
}
function forAndroid(data){
    console.log('printing from mobile: ' + data);
}
function gotoInside(data){
    location.replace("leaveApply.html")
}
function gotoHome(data){
    location.replace("login.html")
}
function deviceChk(data){
    deviceOS = data
    console.log("Device OS is: "+data)
}
