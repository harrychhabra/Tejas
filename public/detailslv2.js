var login=angular.module('details',['ngCookies']);

login.run(['$rootScope','$cookies',function($rootScope,$cookies){

  $rootScope.print=sessionStorage.getItem('check');


}]);

login.controller('detailsCrtl',['$scope','$http','$cookies',function($scope , $http, $cookies ) {

  var ht=window.location.href;
  var ar=ht.split('/');
$http.get(ar[0]+"//"+ar[2]+"/users/list").then(function(response){

 var contacts=response.data;


$scope.logged=sessionStorage.getItem('logged');

$scope.ob=sessionStorage.getItem('cookie');

$scope.print=sessionStorage.getItem('check');

for(var i=0; i<((contacts).length);i++){

  if(contacts[i].username==$scope.ob){
    $scope.dfname=contacts[i].firstname;
    $scope.dmname=contacts[i].middlename;
    $scope.dlname=contacts[i].lastname;
    $scope.dmail=contacts[i].email;
    if(contacts[i].level1==true)
    $scope.drank='1';
    else if(contacts[i].level1==false)
    $scope.drank='2';
    $scope.desg=contacts[i].designation;
    $scope.duse=contacts[i].username;


  }
}
})

$scope.gener=function(){
  console.log("hello");
  var ht=window.location.href;

  var ar=ht.split('/');
  console.log(window.location.href);
  console.log(ar[0]+"//"+ar[2]);


  var obj={
    'user1':[{'user_id':sessionStorage.getItem('getid')}],
    'user2':[{'user_id':sessionStorage.getItem('userid')}]
  }
  console.log(obj);
$http.post((ar[0]+"//"+ar[2]+"/personalchat/"+sessionStorage.getItem('getid')),obj).then(function(response){
  console.log(response);
  var chat=response.data.chatid;
  document.location.href = ar[0]+'//'+ar[2]+'/personalchat/'+sessionStorage.getItem('getid')+"/"+chat;

});

};


}]);
