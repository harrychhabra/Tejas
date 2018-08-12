//
// var login=angular.module('logi',['ngCookies']);
// function checkFirstVisit() {
// if(document.cookie.indexOf('mycookie')==-1) {
//   // cookie doesn't exist, create it now
//   document.cookie = 'mycookie=1';
// }
// else {
//   // not first visit, so alert
//   alert('You refreshed!');
//   var ht=window.location.href;
//   var ar=ht.split('/');
//   document.location.href = ar[0]+'//'+ar[2]+'/login.html';
// }
// }
// login.controller('loginCrtl',['$scope','$http','$cookies','$interval',function($scope , $http, $cookies,$interval ) {
//   $scope.date=new Date();
//   var tick = function() {
//       $scope.clock = Date.now();
//     }
//     tick();
//     $interval(tick, 1000);
//
//   var ht=window.location.href;
//   var ar=ht.split('/');
//   console.log(window.location.href);
//   console.log(ar[0]+"//"+ar[2]);
//   $scope.friends;
// $http.get(ar[0]+"//"+ar[2]+"/users/list").then(function(response){
// console.log(response.data);
// $scope.contacts=response.data;
// $scope.friends=response.data;
// $scope.level1=[];
// $scope.level2=[];
// $scope.rank;
// for(var i=0;i<($scope.contacts.length);i++)
// {
//
//   if(sessionStorage.getItem('getid')==$scope.contacts[i]._id){
//     $scope.obj=$scope.contacts[i];
//   }
//   if($scope.contacts[i].level1==true)
//   $scope.level1.push($scope.contacts[i])
//   else  {
//     $scope.level2.push($scope.contacts[i])
//
//   }
// }
// if(sessionStorage.getItem('loggedin')==1){
// alert("Welcome "+$scope.obj.firstname+"\n Succesfully logged in.");
// document.cookie = "loggedin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
// }
//
// });
//
// $scope.action=function(){
//   sessionStorage.setItem('getid',$scope.obj._id);
// }
// $scope.auser=function(){
//
// sessionStorage.setItem('cookie',$scope.obj.username);
//   sessionStorage.setItem('check',true);
//
//
// }
//
//
// $scope.gen=function(item){
// sessionStorage.setItem('cookie',item.username);
//   console.log("CHeeck cookie");
// sessionStorage.setItem('check',false);
//   sessionStorage.setItem('userid',item._id);
//
// }
//
// }
// ]);

var login=angular.module('logi',['ngCookies']);

function checkFirstVisit() {

if(document.cookie.indexOf('mycookie')==-1) {
  // cookie doesn't exist, create it now
  document.cookie = 'mycookie=1';
}
else {
  // not first visit, so alert
  alert('You refreshed!');
  var ht=window.location.href;
  var ar=ht.split('/');
  document.location.href = ar[0]+'//'+ar[2]+'/login.html';
}
}
login.controller('loginCrtl',['$scope','$http','$cookies','$interval',function($scope , $http, $cookies,$interval ) {
  $scope.date=new Date();
  var tick = function() {
      $scope.clock = Date.now();
    }
    tick();
    $interval(tick, 1000);
  var ht=window.location.href;
  var ar=ht.split('/');
  $http.get(ar[0]+"//"+ar[2]+"/notification/"+sessionStorage.getItem("getid")).then(function(response){

    $scope.notify=response.data.data;
    $scope.uniquenote=[];
    if($scope.notify.length>0)
    {
      for(var i=$scope.notify.length-1;i>-1;i--)
    {
      var check=1;
        for(var j=0;j<$scope.uniquenote.length;j++)
        {
             if($scope.notify[i].name==$scope.uniquenote[j].name)
             {
              check=0;
             }
        }
        if(check==1)
        {
          $scope.uniquenote.push($scope.notify[i]);
        }
    }
  }
  $scope.stat=response.data.status;
  console.log(response.data.data);

  })
  console.log(window.location.href);
  console.log(ar[0]+"//"+ar[2]);
  $scope.friends;
$http.get(ar[0]+"//"+ar[2]+"/users/list").then(function(response){

console.log(response.data);
$scope.contacts=response.data;
$scope.friends=response.data;
$scope.level1=[];
$scope.level2=[];
$scope.rank;
for(var i=0;i<($scope.contacts.length);i++)
{

  if(sessionStorage.getItem("getid")==$scope.contacts[i]._id){
    $scope.obj=$scope.contacts[i];
  }
  if($scope.contacts[i].level1==true)
  $scope.level1.push($scope.contacts[i])
  else  {
    $scope.level2.push($scope.contacts[i])

  }
}
if(sessionStorage.getItem("loggedin")==1){
alert("Welcome "+$scope.obj.firstname+"\n Succesfully logged in.");
document.cookie = "loggedin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
});

$scope.action=function(){
  sessionStorage.setItem("getid",$scope.obj._id);

}
$scope.auser=function(){

  sessionStorage.setItem("cookie",$scope.obj.username);
  sessionStorage.setItem("check",true);


}

$scope.gen=function(item){
  sessionStorage.setItem('cookie',item.username);
  console.log("CHeeck cookie");
  sessionStorage.setItem('check',false);
  sessionStorage.setItem('userid',item._id);

}

}
]);
