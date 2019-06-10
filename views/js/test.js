//var disabledDays = ['3-5-2015','3-28-2015','4-3-2015','5-1-2015','7-18-2015','8-15-2015','10-2-2015','11-11-2015','12-25-2015'];
var disabledDays = ['3-5-2015','3-28-2015','4-3-2015','5-1-2015','6-20-2015','6-27-2015','7-18-2015','7-24-2015','8-15-2015','8-22-2015','9-12-2015','9-16-2015','10-2-2015','10-20-2015','11-3-2015','11-11-2015','12-5-2015','12-25-2015'];
var availableDates = [];
var leaves = {};
function availDateChange1()
{
    var strDate = new Date($('#datepicker1').val());
    var availDate = new Date(strDate);
    var endDate = "", noOfDaysToAdd = 15, count = 0,holiday = 0;
    console.log(disabledDays.length);
    while(count < noOfDaysToAdd)
    {
        endDate = new Date(strDate.setDate(strDate.getDate() + 1));
        if(endDate.getDay() != 0 && endDate.getDay() != 6)
        {
            //disabledDays.length;
            disabledDays.forEach(function(item){
                //console.log(item + "array");
                var thisDay = endDate.getMonth()+1 +"-"+endDate.getDate()+"-"+endDate.getFullYear();
                if(item == thisDay){
                    alert(" Holiday "+ thisDay);
                    holiday += 1;
                    count -= 1;
                    //console.log(holiday);
                }
                else {
                    availableDates.push(endDate.getMonth() +1+"-"+endDate.getDate()+"-"+endDate.getFullYear());
                    //leaves[count] = { "count-"+count : endDate.getMonth() +1+"-"+endDate.getDate()+"-"+endDate.getFullYear()};
                    leaves[count] = endDate.getMonth() +1+"-"+endDate.getDate()+"-"+endDate.getFullYear();
                }


            })
            count++;
            var month = endDate.getMonth() +1;
            var day = endDate.getDate();
            var year = endDate.getFullYear();
            endDate = month + '/' + day + '/' + year;
            //SetFieldValue("END_DATE", endDate, "true"); alert(endDate);

        }
    }
    alert(endDate);//You can format this date as per your requirement
    //console.log(availableDates.length + " available dates ");
    //console.log(leaves);
    availableDates.forEach(function(itm){
        console.log("available "+itm);
    });
}
DELETE FROM `company`.`leav_requests` WHERE `leav_requests`.`id` = 2;
INSERT INTO `leav_requests`(`id`, `Emp_ID`, `from_date`, `to_date`, `reason`, `no_of_days`, `status`) VALUES ([value-1],[value-2],[value-3],[value-4],[value-5],[value-6],[value-7])
insert into leav_requests(Emp_ID,from_date,to_date,reason,no_of_days,status) values("4",'2015-03-14','2015-04-16',"going to native","7","pending");
insert into leav_requests(Emp_ID,from_date,to_date,reason,no_of_days,status) values("4",'2015-03-14','2015-04-16',"going to native","7","pending");
select * from leav_requests;
select * from employee where email = "muthurajbharathi@gmail.com";
 Emp_ID | Name  | Email                      | Password   | Mngr_Indc | Mngr_emp_id
  id | Emp_ID | from_date  | to_date    | reason          | no_of_days | status

select * from employee as A JOIN leav_requests as B ON A.Emp_ID=B.Emp_ID WHERE Mngr_Indc='Y' AND Email='muthurajbharathi@gmail.com';
DELETE FROM `company`.`leav_requests` WHERE `leav_requests`.`id` = 2;

//oo js
var funvar=function(A)
{
 alert(A);
 this.fun1=function()
 {
  alert("This function call without argument");
 },
 this.fun2=function(arg1)
 {
  alert(arg1);
 }
}

var ObjVar=new funvar("Constructor call creating time");

ObjVar.fun1();
ObjVar.fun2("Function 2 Arugument")
INSERT INTO `company`.`leav_requests` (`id`, `Emp_ID`, `from_date`, `to_date`, `reason`, `no_of_days`, `status`) VALUES (NULL, '1', '2015-7-23', '2015-7-29', 'g d hgg hfghfghgfh', '6', 'pending');
INSERT INTO `company`.`leav_requests` (`id`, `Emp_ID`, `from_date`, `to_date`, `reason`, `no_of_days`, `status`) VALUES (NULL, '1', '2015-7-23', '2015-7-29', 'g d hgg hfghfghgfh', '6', 'pending');
SELECT * FROM leav_requests as A JOIN employee as B on A.Emp_ID=B.Emp_ID WHERE Mngr_emp_id=4;
DELETE FROM leav_requests WHERE from_date='0000-00-00';

<html>
<head>
<script>

var funvar=function(A)
{
 var Parent_var=this;
 this.name = "Merbin Joe";
    this.email = "merbin2010@gmail.com";
    this.quizScores = [];
    this.currentScore = 0;


 this.fun1=function()
 {
  alert("This function call without argument")
  alert(this.name);
  Parent_var.fun2("hi test");
 },
 this.fun2=function(arg1)
 {
  alert(arg1);
 },

 this.colanfun= {
  constructor: funvar,
  saveScore:function (theScoreToAdd)  {
   Parent_var.quizScores.push(theScoreToAdd);
  },
  showNameAndScores:function ()  {
   var scores = Parent_var.quizScores.length > 0 ? Parent_var.quizScores.join(",") : "No Scores Yet";
   return Parent_var.name + " Scores: " + scores;
  },
  changeEmail:function (newEmail) {
   Parent_var.email = newEmail;
   return "New Email Saved: " + Parent_var.email;
  }
 }
}

function clfun()
{
 var firstUser = new funvar("Merbin", "merbin@examnple.com");
 firstUser.fun1();

 firstUser.colanfun.changeEmail("merbin2@examnple.com");
 firstUser.colanfun.saveScore(114);
 firstUser.colanfun.saveScore(150);
 alert(firstUser.colanfun.showNameAndScores());
}
</script>

</head>
<body>
 <input type="button" value="Call Function" onclick="clfun();">
</body>
</html>

delete cancel leave
response
{
result: "leav cancelled successfully"
json: {
fieldCount: 0
affectedRows: 1
insertId: 0
serverStatus: 2
warningCount: 0
message: ""
protocol41: true
changedRows: 0
}-
msg: "success"
}
//var d = ['2','5','7','10','0'];$.inArray('7',d);
CREATE TABLE Orders
(
O_Id int NOT NULL PRIMARY KEY,
OrderNo int NOT NULL,
P_Id int FOREIGN KEY REFERENCES Persons(P_Id)
)

var s = ['2','3','4','5','6','14'];s.splice( 3, 1 );
