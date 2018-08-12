var recent=angular.module('recentgroup',['ngCookies']);
recent.run(['$rootScope','$http','$cookies',function($rootScope,$cookies,$http){
}]);

recent.controller('groupCrtl',['$scope','$http','$cookies',function($scope , $http, $cookies ) {
  var ht=window.location.href;
  var ar=ht.split('/');
  $scope.index=0;
  $scope.ide=sessionStorage.getItem('getid');
  $http.get(ar[0]+"//"+ar[2]+"/group/hello/allgroups"+"/"+$scope.ide).then(function(response){
  console.log(response);
  $scope.obj=response.data;
});
  $scope.action=function(item){
    var abc=ar[0]+"//"+ar[2]+"/group/"+$scope.ide+"/"+item._id;
    console.log(abc);
    document.location.href = abc;
  };



}]);
