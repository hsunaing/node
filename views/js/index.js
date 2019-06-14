function init(){
    // var deviceOS = 'web'

    // console.log("Device OS is: "+deviceOS)
    // silentCallMSGraph();
	document.addEventListener("deviceready", function(){
		$(document).ready(function() {
            
            onDeviceReady();
            //msLogin();
            tokenChk();
            //deviceChk();
//		});
    }, false);
function onDeviceReady() {
    console.log('InApp is working.mobile!!!')
    window.open = cordova.InAppBrowser.open;
}

});
 //document.addEventListener("deviceready", onDeviceReady, false);
 localStorage.setItem("deviceOS", "web");
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

