const axios = require('axios');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();
var mysql = require('mysql');
var cors = require('cors');
var path = require('path');
// var morgan  = require('morgan');
// Application initialization
// Object.assign=require('object-assign')
var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0',
    mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL,
    mongoURLLabel = "", hellostring = process.env.SOMEFAX;
var connection = mysql.createConnection({
        host     : 'hsunaing.heliohost.org',
        user     : 'hsunaing',
        password : process.env.DBPW
    });
    
var graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
};

var sess;
var globEmailIdvar,managerIndicator;


app.set('views', __dirname + '/views');
app.use('/js',express.static(path.join(__dirname, '/views/js')));
app.use('/css',express.static(path.join(__dirname, '/views/css')));
app.use('/fonts',express.static(path.join(__dirname, '/views/fonts')));
app.use('/vendor',express.static(path.join(__dirname, '/views/vendor')));
app.use('/images',express.static(path.join(__dirname, '/views/images')));

app.engine('html', require('ejs').renderFile);
//app.use(morgan('combined'))


app.use(session({
    secret: 'ssshhhhh',
    proxy: true,
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.get('/',function(req,res){
    
    sess=req.session;
    console.log('inside /'+sess.email+' & '+sess.managr)
    //Session set when user Request our app via URL
    if(sess.email && sess.managr == 'Y'){
        res.redirect('/manager');
    }
    else if(sess.email && sess.managr != 'Y'){
        res.redirect('/leaveApply');
    }
    else{
        console.log('render login.html')
        res.render('login.html');
    }
});


app.get('/test', function (req,res){
    sess=req.session;
    var t = {'e':sess.email,'s':sess.managr};
    res.send({json:t});
});

app.get('/manager',function(req,res){
    sess=req.session;
    console.log(sess.empId, sess.managr, managerIndicator +" for this manager /manager");




    if(sess.email && sess.managr == 'Y'){
        res.render('manage.html');
    }
    else{
        console.log("not logged in. Redirect to login page from /manager route");
        res.render('login.html');
    }
});

app.get('/leav/Applications',function(req,res){
    sess=req.session;
    var returnVals = {};
    console.log(sess.empId, sess.managr, managerIndicator +" for this manager");
    //check if he is logged in and he is not manager
    if(sess.email && sess.managr == 'Y'){
        connection.query('USE hsunaing_mysqldb', function (err) {
            if (err) throw err;
            connection.query('SELECT * FROM leav_requests as A JOIN employee as B on A.Emp_ID=B.Emp_ID WHERE Mngr_emp_id="'+sess.empId+'"',
                function(err, rows, fields) {
                    if (err) {
                        console.error(err);
                        res.statusCode = 500;
                        res.send({
                            result: 'Error in getting leave Applications',
                            err:    err.code,
                            msg: 'fail'
                        });
                    }
                    console.log(rows.length + "no of rows");
                     if (rows.length) {
                        for (var i = 0, len = rows.length; i < len; i++) {
                            var row = rows[i];
                            console.log(row.Emp_ID +" printing rows");
                            returnVals[i] = {'id':row.id,'EmployeeId':row.Emp_ID,'Name':row.Name,'Email':row.Email,'No_of_days':row.no_of_days,'from':row.from_date,'to':row.to_date,'reason':row.reason,'status':row.status};
                            console.log(row.id,row.from_date,row.to_date,row.reason,row.status);
                        }
                        res.send({
                            result: 'leav applications retrieved successfully',
                            json: returnVals,
                            msg:'success',
                            length: rows.length,
                            loginas:sess.email
                        });
                    }
                    else{
                        res.statusCode = 401;
                        res.send({
                            result: 'There are No leave Applications',
                            msg:'fail',
                            id:sess.empId
                        });
                    }
                });
        });
    }
    else{
        console.log("not logged in. Redirect to login page from /leav/Applications route");
        res.redirect('/');
    }
});

app.post('/change/leaveStatus',function(req,res){
    sess=req.session;
    var emplytobeApprove = req.body.eid;
    var fromDate = req.body.fromdt;
    var statustoBeset = req.body.setStatus;
    console.log(sess.empId, sess.managr, managerIndicator, statustoBeset, fromDate, emplytobeApprove   +" for this manager");
    //check if he is logged in and he is not manager
    if(sess.email && sess.managr == 'Y'){
        connection.query('USE hsunaing_mysqldb', function (err) {
            if (err) throw err;
                connection.query('update  leav_requests set status="'+statustoBeset+'"  WHERE Emp_ID="'+emplytobeApprove+'" AND from_date="STR_TO_DATE('+fromDate+')"',
                function(err, result){
                    if(err){
                        console.error(err +" Update error");
                        res.statusCode = 500;
                        res.send({
                            result: 'Error in updating leave status',
                            err: err.code,
                            msg: 'fail'
                        });
                    }

                    else{
                        console.log('updated status of leave for ! ' + emplytobeApprove);
                        res.send({
                            result: 'leav applications status changed to'+statustoBeset,
                            json: result,
                            msg:'success',
                        });
                    }
                });
        });
    }
    else{
        console.log("not logged in. Redirect to login page from /approve/leave route");
        res.redirect('/');
    }
});

app.post('/change/leaveStatus2',function(req,res){
    sess=req.session;
    var emplytobeApprove = req.body.eid;
    var fromDate = req.body.fromdt;
    var statustoBeset = req.body.setStatus;

    //check if he is logged in and he is not manager
    if(sess.email && sess.managr == 'Y'){
        connection.query('USE hsunaing_mysqldb', function (err) {
            if (err) throw err;
                connection.query('update  leav_requests set status="'+statustoBeset+'"  WHERE Emp_ID="'+emplytobeApprove+'" AND id="'+req.body.rowid+'"',
                function(err, result){
                    if(err){
                        console.error(err +" Update error");
                        res.statusCode = 500;
                        res.send({
                            result: 'Error in updating leave status',
                            err: err.code,
                            msg: 'fail'
                        });
                    }

                    else{
                        console.log('updated status of leave for ! ' + emplytobeApprove);
                        res.send({
                            result: 'leav applications status changed to'+statustoBeset,
                            json: result,
                            msg:'success',
                        });
                    }
                });
        });
    }
    else{
        console.log("not logged in. Redirect to login page from /approve/leave route");
        res.redirect('/');
    }
});

app.post('/change/leaveStatus3',function(req,res){
    sess=req.session;
    var emplytobeApprove = req.body.eid;
    //var fromDate = req.body.fromdt;
    var statustoBeset = req.body.setStatus;
    console.log(req.body.eid.length,req.body.rowid.length);
    var rids = [];
    rids = req.body.rowid;
    var eids = [];
    eids = req.body.eid;
    var errors = [];
    var successfulUpdates = [];
    //console.log(sess.empId, sess.managr, managerIndicator, statustoBeset, fromDate, emplytobeApprove   +" for this manager");
    //check if he is logged in and he is not manager
    if(sess.email && sess.managr == 'Y'){
        connection.query('USE hsunaing_mysqldb', function (err) {
            if (err) throw err;
            var temp = 1;
               for(var i = 0;i<req.body.eid.length;i++){
                   var rowidtobeUpdated = rids[i],eidtobeUpdated = eids[i];
                  connection.query('update  leav_requests set status="'+statustoBeset+'"  WHERE Emp_ID="'+eids[i]+'" AND id="'+rids[i]+'"',
                  function(err, result){
                      temp += 1;
                      if(err){
                          console.error(err +" Update error for "+rids[temp-1]);
                         errors.push(rids[temp-1]);
                      }

                      else{
                          console.log('updated status of leave for row id  ' + rids[temp-1]);
                          successfulUpdates.push(rids[temp-1]);
                          res.send({
                            result: { 'updated':successfulUpdates,'errors':errors},
                            json: result,
                            msg:'success',
                        });
                      }
                      if(temp == req.body.eid.length){
                        console.log('updated status for ' + successfulUpdates.length +"  rows");
                        res.send({
                            result: { 'updated':successfulUpdates,'errors':errors},
                            json: result,
                            msg:'success',
                        });
                      }
                  });

               }

        });
    }
    else{
        console.log("not logged in. Redirect to login page from /change/leaveStatus3 route");
        res.redirect('/');
    }
});


app.get('/leaveApply',function(req,res){
    console.log('inside leaveApply')
    console.log(req.session)
    sess=req.session;
    console.log(sess.empId, sess.managr, managerIndicator +" for this manager");
    if(sess.email && sess.managr != 'Y'){
        res.render('home3.html');
    }
    else{
        console.log("not logged in. Redirect to login page from /leavApply route");
        res.redirect('/');
    }
});

app.post('/requestfor/Leave',function(req,res){
    sess=req.session;
    var from_dt,to_dt,no_of_days,reason;
    from_dt = req.body.frm ,to_dt = req.body.to ,no_of_days = req.body.days,reason=req.body.rsn;
    if(sess.email && sess.managr != 'Y'){
        connection.query('USE hsunaing_mysqldb', function (err) {
            if (err) throw err;
        connection.query('insert into leav_requests (Emp_ID,from_date,to_date,reason,no_of_days,status) value("'+sess.empId+'","'+from_dt+'","'+to_dt+'","'+reason+'","'+no_of_days+'","Pending")',
            function(error, results) {
              if(error) {
                console.log("Leave Application error: " + error.message);
                res.statusCode = 500;
                res.send({
                    result: 'Error in Applying leave',
                    err: errror.code,
                    msg: 'fail'
                });
              }
              else{
                console.log('Inserted: ' + results.affectedRows + ' row. and Id inserted: ' + results.insertId);
                res.send({
                    result: 'leave Requested successfully with id '+results.insertId,
                    json: results,
                    msg:'success',
                });
              }
            });
        });
    }
    else{
        console.log("not logged in. Redirect to login page from /requestfor/leave route");
        res.redirect('/');
    }
});

app.post('/cancel/Leave',function(req,res){
    sess=req.session;
    var emplyId,from_dt;
    emplyId = req.body.emplyid,from_dt = req.body.frm;
    if(sess.email && sess.managr != 'Y'){
        connection.query('USE hsunaing_mysqldb', function (err) {
            if (err) throw err;
            connection.query('DELETE FROM leav_requests  WHERE Emp_ID="'+sess.empId+'" AND id="'+req.body.rid+'"', function(err, rows, fields) {
                if (err) {
                    console.log("Leave Cancellation error: " + err.message);
                    res.statusCode = 500;
                    res.send({
                        result: 'Error while cancelling leave',
                        err: err.code,
                        msg: 'fail'
                    });
                }
                else{
                       res.send({
                           result: 'leav cancelled successfully',
                           json: rows.affectedRows,
                           msg:'success',
                           length: rows.length,

                       });
                }
            });
        });
    }
    else{
        console.log("not logged in. Redirect to login page from /cancel/Leave route");
        res.redirect('/');
    }
});


app.get('/my/email',function(req,res){
    sess=req.session;
    if(sess.email && sess.managr != 'Y'){
        res.send({
            result: 'my email',
            msg: 'success',
            email:sess.email
        });
    }
    else{
        console.log("not logged in. Redirect to login page from /my/email route");
        res.redirect('/');
    }
});

app.get('/my/leaves',function(req,res){
    sess=req.session;
    var returnVals = {};
    console.log(sess.empId, sess.managr, managerIndicator +" for this manager");
    //check if he is logged in and he is not manager
    if(sess.email && sess.managr != 'Y'){
        connection.query('USE hsunaing_mysqldb', function (err) {
            if (err) throw err;
            connection.query('SELECT * FROM leav_requests WHERE Emp_ID = "'+sess.empId+'"',
                function(err, rows, fields) {
                    if (err) {
                        console.error(err);
                        res.statusCode = 500;
                        res.send({
                            result: 'Error in getting my leaves',
                            err:    err.code,
                            msg: 'fail'
                        });
                    }
                    console.log(rows.length + "no of rows");
                     if (rows.length) {
                        for (var i = 0, len = rows.length; i < len; i++) {
                            var row = rows[i];
                            console.log(row.Emp_ID +" printing rows");
                            returnVals[i] = {'id':row.id,'EmployeeId':row.Emp_ID,'No_of_days':row.no_of_days,'from':row.from_date,'to':row.to_date,'reason':row.reason,'status':row.status};
                            console.log(row.id,row.from_date,row.to_date,row.reason,row.status);
                        }
                        res.send({
                            result: 'my leaves retrieved successfully',
                            json: returnVals,
                            msg:'success',
                            length: rows.length,
                            loginas:sess.email
                        });
                    }
                    else{
                        res.statusCode = 401;
                        res.send({
                            result: 'There are No leaves for you',
                            msg:'fail',
                            id:sess.empId
                        });
                    }
                });
        });
    }
    else{
        console.log("not logged in. Redirect to login page from /my/leaves route");
        res.redirect('/');
    }
});


app.get('/logout',function(req,res){
    managerIndicator = '';
    req.session.destroy(function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log("logged out "+sess.email,sess.managr,managerIndicator);
        res.redirect('/');
    }
    });

});



app.post('/login',function(req,res){
    sess=req.session;
    var EmpID,empName,empEmail,empPassword,empMngrIndc,empMngrId;

    globEmailIdvar = req.body.email;
    var pswd = req.body.password;
    console.log(req.body.email,req.body.password);

    //query and check whether he is an Manager
    connection.query('USE hsunaing_mysqldb', function (err) {
        if (err) throw err;
        connection.query('SELECT * FROM employee WHERE Email = "'+req.body.email+'"',
            function(err, rows, fields) {
                if (err) {
                    console.error(err);
                    res.statusCode = 500;
                    res.send({
                        result: 'error',
                        err:    err.code,
                        msg: 'fail'
                    });
                }
                console.log(rows.length + "no of rows");
                 if (rows.length) {
                    for (var i = 0, len = rows.length; i < len; i++) {
                        var row = rows[i];
                        console.log(row.Emp_ID + " " + row.Name + " "+row.Email+ " "+row.Password+ " "+row.Mngr_Indc+ " "+row.Mngr_emp_id);
                        EmpID = row.Emp_ID;
                        empName = row.Name;
                        empEmail = row.Email;
                        empPassword = row.Password;
                        empMngrIndc = row.Mngr_Indc;
                        empMngrId = row.Mngr_emp_id;

                        if(req.body.password == empPassword){
                            sess.email=req.body.email;//In this we are assigning session
                            sess.empId=EmpID;
                            sess.managr=empMngrIndc;
                            managerIndicator = empMngrIndc;
                            console.log("emp id is saved "+EmpID + "mngr indicator "+sess.managr + " Glob var mngr indictr "+managerIndicator);
                            //check who logged in
                            if(empMngrIndc == 'Y'){
                                res.send({
                                    result: '/manager',
                                    msg:'success'
                                });
                            }
                            else if(empMngrIndc == 'N'){
                                res.send({
                                    result: '/leavApply',
                                    msg:'success'
                                });
                            }
                        }
                        else{
                            res.statusCode = 401;
                            res.send({
                                result: 'Sorry Wrong password',
                                msg:'fail'
                            });
                        }
                    }
                }
                else{
                    res.statusCode = 401;
                    res.send({
                        result: 'Sorry You are not an Employee',
                        msg:'fail'
                    });
                }
            });
    });
});

app.post('/adlogin',function(req,res){
    sess=req.session
    var EmpID,empName,empEmail,empPassword,empMngrIndc,empMngrId;
    console.log('req section: ', req.session )
    //+' auth: '+ req.body.authorization
    // console.log('starting:: ',req.headers.msqobj)
    //globEmailIdvar = req.body.email;
    




    var oneObj = req.body.msqObj;
    console.log(req.body.msqObj.id)
    console.log('oneObj printing:')
                        EmpID = oneObj.id;
                        console.log('id is: ' + EmpID);
                        console.log('auth is: ' + req.body.authorization);


                        //  empName = oneObj.displayName;
                        //  empEmail = oneObj.mail;
                         axios({
                            method: 'get',
                            url: graphConfig.graphMeEndpoint,
                            headers: {
                                "authorization": req.body.authorization
                            }
                          })
                        .then(function ({data}) {
                                //let dataP = JSON.stringify(data)
                                //console.log('Success ' + JSON.stringify(data))
                                
                                if (data.mail == empEmail) {
                                    console.log('ready to query!!!')
                                    //queryInternal();
                                }
                                
                                var titleStr = data.jobTitle
                               
                                //var testStrMod = testStr.substr(0, testStr.indexOf(',')); 
                                //var splitArr = strArr[0].includes("Full");
                                //var titleStr = 'Head of IT, IT';
                                var titleStr = titleStr.split(',');
                                var titleDpt = titleStr[1];
                                var titleStr = titleStr[0];
                                var titleBoo;
                                var titleBoo1 = titleStr.includes('Head')
                                console.log('Boo1: ', titleBoo1)
                                var titleBoo2 = titleStr.includes('Lead')
                                console.log('Boo2: ', titleBoo2)
                                var titleBoo3 = titleStr.includes('Assistant')
                                console.log('Boo3: ', titleBoo3)
                                var titleBoo4 = titleStr.includes('Manager')
                                console.log('Boo4: ', titleBoo4)
                    
                                if ((titleBoo1 || titleBoo2 || titleBoo4) && !titleBoo3){
                                    sess.managr='Y';
                                    titleBoo = true
                                } else {
                                    sess.managr='N'
                                    titleBoo = false
                                }
                                console.log('>>',titleStr,' || ',titleBoo,' || ',titleDpt)
                    
                                                sess.email=data.mail;//In this we are assigning session
                                                sess.empId=data.id;    
                                                managerIndicator = sess.managr;
                    
                                                //console.log("emp id is saved "+EmpID + "mngr indicator "+sess.managr + " Glob var mngr indictr "+managerIndicator);
                    
                    
                    
                        if (titleBoo) {
                            console.log('manager', titleBoo)
                            res.send({
                                result: data,
                                tourl: '/manager',
                                msg:'Success'
                            });
                        } else {
                            console.log('leaveApply', titleBoo)
                            res.send({
                                result: data,
                                tourl: '/leaveApply',
                                msg:'Success'
                            });
                        }
                    
                    
                        })
                        .catch(function (error) {
                          console.log('Error ' + error.message)
                          res.send({
                            result: 'Failed ms method! ' + error.message,
                            msg:'Failed'
                        });
                        })

                         //connectToMS();
                        // empEmail = row.Email;
                        // empPassword = row.Password;
                        // empMngrIndc = row.Mngr_Indc;
                        // empMngrId = row.Mngr_emp_id;
function queryInternal() {
            //query and check whether he is an Manager
            connection.query('USE hsunaing_mysqldb', function (err) {
                if (err) throw err;
                connection.query('SELECT * FROM employee WHERE Email = "'+empEmail+'"',
                    function(err, rows, fields) {
                        if (err) {
                            console.error(err);
                            // res.statusCode = 500;
                            // res.send({
                            //     result: 'error',
                            //     err:    err.code,
                            //     msg: 'fail'
                            // });
                        }
                        console.log(rows.length + "no of rows");
                         if (rows.length) {
                            for (var i = 0, len = rows.length; i < len; i++) {
                                var row = rows[i];
                                console.log(row.Emp_ID + " " + row.Name + " "+row.Email+ " "+row.Password+ " "+row.Mngr_Indc+ " "+row.Mngr_emp_id);
                                EmpID = row.Emp_ID;
                                empName = row.Name;
                                empEmail = row.Email;
                                empPassword = row.Password;
                                empMngrIndc = row.Mngr_Indc;
                                empMngrId = row.Mngr_emp_id;
        
                                if(req.body.password == empPassword){
                                    sess.email=req.body.email;//In this we are assigning session
                                    sess.empId=EmpID;
                                    sess.managr=empMngrIndc;
                                    managerIndicator = empMngrIndc;
                                    console.log("emp id is saved "+EmpID + "mngr indicator "+sess.managr + " Glob var mngr indictr "+managerIndicator);
                                    //check who logged in
                                    if(empMngrIndc == 'Y'){
                                        // res.send({
                                        //     result: '/manager',
                                        //     msg:'success'
                                        // });
                                    }
                                    else if(empMngrIndc == 'N'){
                                        // res.send({
                                        //     result: '/leavApply',
                                        //     msg:'success'
                                        // });
                                    }
                                }
                                else{
                                    // res.statusCode = 401;
                                    // res.send({
                                    //     result: 'Sorry Wrong password',
                                    //     msg:'fail'
                                    // });
                                }
                            }
                        }
                        else{


                            //res.statusCode = 401;
                            // res.send({
                            //     result: 'Sorry You are not an Employee',
                            //     msg:'fail'
                            // });
                        }
                    });
            });
}

function connectToMS() {
    axios({
        method: 'get',
        url: graphConfig.graphMeEndpoint,
        headers: {
            "authorization": req.body.authorization
        }
      })
    .then(function ({data}) {
            //let dataP = JSON.stringify(data)
            //console.log('Success ' + JSON.stringify(data))
            
            if (data.mail == empEmail) {
                console.log('ready to query!!!')
                //queryInternal();
            }
            
            var titleStr = data.jobTitle
           
            //var testStrMod = testStr.substr(0, testStr.indexOf(',')); 
            //var splitArr = strArr[0].includes("Full");
            //var titleStr = 'Head of IT, IT';
            var titleStr = titleStr.split(',');
            var titleDpt = titleStr[1];
            var titleStr = titleStr[0];
            var titleBoo;
            var titleBoo1 = titleStr.includes('Head')
            console.log('Boo1: ', titleBoo1)
            var titleBoo2 = titleStr.includes('Lead')
            console.log('Boo2: ', titleBoo2)
            var titleBoo3 = titleStr.includes('Assistant')
            console.log('Boo3: ', titleBoo3)
            var titleBoo4 = titleStr.includes('Manager')
            console.log('Boo4: ', titleBoo4)

            if ((titleBoo1 || titleBoo2 || titleBoo4) && !titleBoo3){
                sess.managr='Y';
                titleBoo = true
            } else {
                sess.managr='N'
                titleBoo = false
            }
            console.log('>>',titleStr,' || ',titleBoo,' || ',titleDpt)

                            sess.email=data.mail;//In this we are assigning session
                            sess.empId=data.id;    
                            managerIndicator = sess.managr;

                            //console.log("emp id is saved "+EmpID + "mngr indicator "+sess.managr + " Glob var mngr indictr "+managerIndicator);



    if (titleBoo) {
        console.log('manager', titleBoo)
        res.send({
            result: data,
            tourl: '/manager',
            msg:'Success'
        });
    } else {
        console.log('leaveApply', titleBoo)
        res.send({
            result: data,
            tourl: '/leaveApply',
            msg:'Success'
        });
    }


    })
    .catch(function (error) {
      console.log('Error ' + error.message)
      res.send({
        result: 'Failed ms method! ' + error.message,
        msg:'Failed'
    });
    })
}
function newUser() {
    connection.query('USE hsunaing_mysqldb', function (err) {
        if (err) throw err;
    connection.query('insert into leav_requests (Emp_ID,from_date,to_date,reason,no_of_days,status) value("'+sess.empId+'","'+from_dt+'","'+to_dt+'","'+reason+'","'+no_of_days+'","Pending")',
        function(error, results) {
          if(error) {
            console.log("Leave Application error: " + error.message);
            res.statusCode = 500;
            res.send({
                result: 'Error in Applying leave',
                err: errror.code,
                msg: 'fail'
            });
          }
          else{
            console.log('Inserted: ' + results.affectedRows + ' row. and Id inserted: ' + results.insertId);
            res.send({
                result: 'leave Requested successfully with id '+results.insertId,
                json: results,
                msg:'success',
            });
          }
        });
    });
}

    
      
    // var resultN = axios.get(graphConfig.graphMeEndpoint, {
    //     params: {
    //         accessToken: req
    //             }
    // })
    

// axios.get(graphConfig.graphMeEndpoint, {
//         params: {
//             accessToken: req
//                 }
//     })
//   .then(response => {
//     console.log(response);
//     console.log(response);
//   })
//   .catch(error => {
//     console.log(error);
//   });

    //callMSGraph(graphConfig.graphMeEndpoint, req, graphAPICallback)
//     request(graphConfig.graphMeEndpoint+'?accessToken'+req, { json: true }, (err, ress, body) => {
//         if (err) { 
//             replyErrorN(err);
//             return console.log(err); 
        
//         }

        

//         console.log(body.url);
//         console.log(body.explanation);
//         replySuccessN(body);
//     // console.log(sess.empId, sess.managr, managerIndicator +" for this manager /manager");
//     // if(sess.email && sess.managr == 'Y'){
//     //     res.send({
//     //         result: 'MS login method.',
//     //         msg:'success'
//     //     });
//     // }
//     // else{
//     //     console.log("not logged in. Redirect to login page from /manager route");
//     //     res.send({
//     //         result: 'Failed ms method!',
//     //         msg:'Failed'
//     //     });
//     // }
// });
// function replyErrorN(err) {
//     res.send({
//                 result: 'Failed ms method!', err,
//                 msg:'Failed'
//             });
// }
// function replySuccessN(body) {
//     res.send({
//         result: 'Success: ', body,
//         msg:'Success'
//     });
// }
});

// function checkMSADauth(req) {
//     axios({
//         method: 'get',
//         url: graphConfig.graphMeEndpoint,
//         headers: {
//             "authorization": req.headers.authorization
//         }
//       })
//     .then(function ({data}) {
//         //let dataP = JSON.stringify(data)
//       console.log('Success ' + JSON.stringify(data))
//       res.send({
//         result: data,
//         msg:'Success'
//     });
//     })
//     .catch(function (error) {
//       console.log('Error ' + error.message)
//       res.send({
//         result: 'Failed ms method! ' + error.message,
//         msg:'Failed'
//     });
//     })
// }

// app.listen(3000,function(){

//     console.log("App Started on PORT 3000 open http://localhost:3000/ in browser");

// });
app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);
console.log('hi there ' + hellostring);
module.exports = app ;