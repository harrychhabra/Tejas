var register=angular.module('regs',['ngCookies']);

register.controller('regCrtl',['$scope','$http','$cookies',function($scope , $http, $cookies ) {

console.log("loaded");
  $scope.check=function(){
    console.log("Function");
    var ht=window.location.href;
    var ar=ht.split('/');
    var data={
      username:$scope.username,
      firstname:$scope.firstname,
      middlename:$scope.middlename,
      lastname:$scope.lastname,
      email:$scope.email,
      designation:$scope.designation,
      level1:$scope.level1,
      password:$scope.password
    };
    if((sessionStorage.getItem("admin"))=='true'){
      console.log("Hello");
      $http.post((ar[0]+"//"+ar[2]+"/register/signup"),data).then(function (response) {
            console.log(response);
            alert("Registered");
            document.location.href = ar[0]+'//'+ar[2]+'/register.html';

      });



    }
    else{
      console.log("Bye");
    alert("Admin not logged in");
    document.location.href = ar[0]+'//'+ar[2]+'/admin.html';
    }
  }

}]);
