var prompt=angular.module('prom',['ngCookies']);

prompt.controller('promCrtl',['$scope','$http','$cookies',function($scope , $http, $cookies ) {
  var ht=window.location.href;
  var ar=ht.split('/');
  $http.get(ar[0]+"//"+ar[2]+"/users/list").then(function(response){
 $scope.receiver;
  $scope.contacts=response.data;
  $scope.level1=[];

  $scope.rank;
  for(var i=0;i<($scope.contacts.length);i++)
  {

    if($scope.contacts[i].level1==true)
    $scope.level1.push($scope.contacts[i])

  }
$scope.add=function(item){

   $scope.receiver=item.firstname+' '+item.lastname;

}
$scope.action1=function(){
$scope.obj=
{
name:$scope.receiver,
user_id:sessionStorage.getItem('getid'),
status:false,
message:$scope.message,

}
$http.post(ar[0]+'//'+ar[2]+'/prompt/send'+'/'+sessionStorage.getItem('getid'),$scope.obj).then(function(response){
console.log(response);
alert('prompt sent successfully')
})
}



})

}]);
