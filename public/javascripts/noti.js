var not=angular.module('noti',['ngCookies']);

not.controller('notCrtl',['$scope','$http','$cookies',function($scope , $http, $cookies ) {



  var ht=window.location.href;
  var ar=ht.split('/');
  console.log(window.location.href);
  console.log(ar[0]+"//"+ar[2]);
$http.get(ar[0]+"//"+ar[2]+"/users/list").then(function(response){
console.log(response.data);
$scope.contacts=response.data;
});


$http.get(ar[0]+"//"+ar[2]+"/notification/"+sessionStorage.getItem('getid')).then(function(response){
  // $interval(function () {
  //   $scope.notify=response.data;
  // }, 2000);
  console.log("this");

  console.log(response);

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

console.log($scope.uniquenote);
$scope.stat=response.data.status;
})
$scope.action3=function(item){

  if(item.groupornot==false)
  {
    document.location.href = ar[0]+'//'+ar[2]+'/personalchat/'+sessionStorage.getItem('getid')+"/"+item.gettingid;
  }
  else {
    document.location.href = ar[0]+'//'+ar[2]+'/group/'+sessionStorage.getItem('getid')+"/"+item.gettingid;
  }
}
}]);
