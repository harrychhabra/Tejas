var login=angular.module('details',['ngCookies']);
login.value('che',{
  value:0,
  chat:0});
login.controller('detailsCrtl',['$scope','$http','$cookies','che',function($scope , $http, $cookies,che ) {
  var contacts;
  var ht=window.location.href;
  var ar=ht.split('/');
$http.get(ar[0]+'//'+ar[2]+'/users/list').then(function(response){

  contacts=response.data;
 $scope.recname;
for(var i=0;i<contacts.length;i++)
{
   if(contacts[i]._id==sessionStorage.getItem('userid'))
   {
     console.log(sessionStorage.getItem('userid'));
     $scope.recname=contacts[i].username;
   }

}
$scope.logged=sessionStorage.getItem('logged');

$scope.ob=sessionStorage.getItem('cookie');

$scope.print=sessionStorage.getItem('check');

for(var i=0; i<((contacts).length);i++){

  if(contacts[i].username==$scope.ob){
    $scope.dfname=contacts[i].firstname;
    $scope.dlname=contacts[i].lastname;
    $scope.dmail=contacts[i].email;
    $scope.desg=contacts[i].designation;


  }
}
});

var show=ar[0]+'//'+ar[2]+'/personalchat/getlist/chats/'+sessionStorage.getItem('getid');
$http.get(show).then(function successCallback(response){

console.log(response);
var chats=response.data;

for(var i=0;i<chats.length;i++){
  if(chats[i].user2[0].user_id==sessionStorage.getItem('userid') ||chats[i].user1[0].user_id==sessionStorage.getItem('userid')){
    che.value=1;
    che.chat=chats[i]._id;
    console.log("chat there");
  }
}

console.log(che.value);

},
function errorCallback(response){
che.value=0;
console.log(che.value);
console.log("No chat");

});

$scope.gener=function($scope){

console.log(che.value);

var ht=window.location.href;

var ar=ht.split('/');
if(che.value==1){
  console.log("Chat exists");
  document.location.href = ar[0]+'//'+ar[2]+'/personalchat/'+sessionStorage.getItem('getid')+"/"+che.chat;
}
else {



  console.log("hello");
  var ht=window.location.href;

  var ar=ht.split('/');
  console.log(window.location.href);
  console.log(ar[0]+"//"+ar[2]);


  var recname;
 for(var i=0;i<contacts.length;i++)
 {
    if(contacts[i]._id==sessionStorage.getItem('userid'))
    {
      recname=contacts[i].username;
    }

 }
 console.log(recname);
  var obj={
    'user1':[{'user_id':sessionStorage.getItem('getid'),'name':sessionStorage.getItem('logged')}],
    'user2':[{'user_id':sessionStorage.getItem('userid'),'name':recname}],
  }
  console.log(obj);
  if(che.value==0){
$http.post((ar[0]+"//"+ar[2]+"/personalchat/"+sessionStorage.getItem('getid')),obj).then(function(response){
  console.log(response);
  var chat=response.data.chatid;
  document.location.href = ar[0]+'//'+ar[2]+'/personalchat/'+sessionStorage.getItem('getid')+"/"+chat;

});
}
}

};


}]);
