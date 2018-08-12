var login=angular.module('chatpersonal',['ngCookies']);



login.controller('perCrtl',['$scope','$http','$cookies',function($scope , $http, $cookies ) {
  var ht=window.location.href;
  var ar=ht.split('/');
  $http.get(ar[0]+"//"+ar[2]+"/users/list").then(function(response){
  console.log(response.data);
  $scope.contacts=response.data;
console.log($scope.contacts);
});

var show=ar[0]+'//'+ar[2]+'/personalchat/getlist/chats/'+sessionStorage.getItem('getid');
$http.get(show).then(function(response){

console.log(response);
$scope.obj=response.data;
});
$scope.sho=function(item){
var check;
console.log(sessionStorage.getItem('getid'));
console.log(item.user1[0].user_id);
if(sessionStorage.getItem('getid')==item.user1[0].user_id)
check=item.user2[0].user_id;
else
check=item.user1[0].user_id

console.log(check);
var disp;
for(var i=0;i<$scope.contacts.length;i++){
  if($scope.contacts[i]._id==check)
  disp=$scope.contacts[i].firstname;
}
console.log(disp);
return disp;
}
$scope.action=function(item){
  document.location.href = ar[0]+'//'+ar[2]+'/personalchat/'+sessionStorage.getItem('getid')+"/"+item._id;
};

}]);
