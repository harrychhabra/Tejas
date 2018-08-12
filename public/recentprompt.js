var rprompt=angular.module('rprom',['ngCookies']);

rprompt.controller('rpromCrtl',['$scope','$http','$cookies',function($scope , $http, $

 ) {
  var ht=window.location.href;
  var ar=ht.split('/');
$scope.contacts;
$http.get(ar[0]+"//"+ar[2]+"/users/list").then(function(response){

$scope.contacts=response.data;
$scope.name;
for(var i=0;i<$scope.contacts.length;i++)
{
  if($scope.contacts[i].username==sessionStorage.getItem('logged'))
  {
  $scope.name=$scope.contacts[i].firstname+' '+$scope.contacts[i].lastname;
  }
}
console.log($scope.name);
$scope.level;
$scope.check1=function(item){

  if(item.name==$scope.name )
  {
    $scope.level=false;
  }
  else {
    $scope.level=true
  }
  console.log($scope.level);
  return $scope.level;
}

});
$http.get(ar[0]+"//"+ar[2]+"/prompt/"+sessionStorage.getItem('getid')).then(function(response){
console.log(response);
$scope.pro=response.data.prompts;
$scope.obj=[];

for(var i=0;i<($scope.pro.length);i+=1)
{
$scope.obj.push($scope.pro[i]);
}

});
$scope.stat;
$scope.check=function(item){

  if(item.status==true){
  $scope.stat='attended';
  return true;
}
  else{
    $scope.stat='unattended';
    return false;
  }
return $scope.stat;
}
$scope.action2=function(item)
{
$scope.obj1={
  userId:item.user_id,
}
console.log($scope.obj1);

$scope.promstatus;
  $http.put((ar[0]+"//"+ar[2]+"/prompt/accept/"+sessionStorage.getItem('getid')),$scope.obj1).then(function(response){
        console.log('hello bye');
      console.log(response);
      $scope.promstatus=response.data;



  })
  var obj2={
    'user1':[{'user_id':sessionStorage.getItem('getid')}],
    'user2':[{'user_id':item.user_id}]
  }

$http.post((ar[0]+"//"+ar[2]+"/personalchat/"+sessionStorage.getItem('getid')),obj2).then(function(response){
  console.log(response);
  var chat=response.data.chatid;

  document.location.href = ar[0]+'//'+ar[2]+'/personalchat/'+sessionStorage.getItem('getid')+"/"+chat;
});
};




}]);
