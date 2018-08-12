
var login=angular.module('logi',['ngCookies']);
document.cookie = "mycookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = 'loggedin=1';
login.controller('loginCrtl',['$scope','$http','$cookies',function($scope , $http, $cookies ) {
  var ht=window.location.href;
  var ar=ht.split('/');
  console.log(window.location.href);
  console.log(ar[0]+"//"+ar[2]);
  $scope.friends;
  var  setid=0;
$http.get(ar[0]+"//"+ar[2]+"/users/list").then(function(response){
console.log(response.data);
$scope.contacts=response.data;
$scope.friends=response.data;
$scope.level1=[];
$scope.level2=[];
$scope.rank;
for(var i=0;i<($scope.contacts.length);i++)
{

  if($scope.contacts[i].level1==true)
  $scope.level1.push($scope.contacts[i])
  else  {
    $scope.level2.push($scope.contacts[i])

  }
}


var i=0;
$scope.color=function(){
  if(i==1)
return "white";
else {
  return "black";
}}

for(var i=0;i<($scope.contacts.length);i++)
{

  if($scope.contacts[i].username==$scope.username)
  setid=$scope.contacts[i]._id;

}
});
$scope.adduser=function(){
  $scope.user={
    username:$scope.username,
    password:$scope.password,
    _id:setid
  };
  console.log($scope.user);
  $http.post(ar[0]+"//"+ar[2]+"/login/checklogin",$scope.user).then(function successCallback(response){
    console.log("Posted");
  console.log(response);
  $scope.obj=response.data[0];
  sessionStorage.setItem("logged",$scope.obj.username);
  sessionStorage.setItem("getid",$scope.obj._id);
  var check=$scope.obj.level1;

  if(check){
    window.location.href=ar[0]+"//"+ar[2]+"/mainlv1.html";
  }
  else {
    window.location.href=ar[0]+"//"+ar[2]+"/mainlv2.html";

  }
  console.log("Hello"+$scope.obj._id);

  if(response.status==200)
      i=1;

    },
  function errorCallback(response) {
  alert("Error Invalid Details");
  $scope.username='';
  $scope.password='';
});
$scope.show=function(){
  return i;

}
$scope.action=function(){
  sessionStorage.setItem("getid",$scope.obj._id);
}
$scope.auser=function(){

  sessionStorage.setItem("cookie",$scope.obj.username);
  sessionStorage.setItem("check",true);
}


}
}]);
