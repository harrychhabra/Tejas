var admin=angular.module('admi',['ngCookies']);

admin.controller('adminCntrl',['$scope','$cookies' ,function( $scope, $cookies )
{
  $scope.show=function(){
    if (x == username && y == password) {
    var ht=window.location.href;
    var ar=ht.split('/');
  var username="tejas";
    var password="tejas";
  var x=$scope.username;
  var y=$scope.password;

    alert("hello")
  document.location.href = ar[0]+'//'+ar[2]+'/register.html';
  sessionStorage.setItem("admin", "true");

  }
  else {
  alert("Incorrect password, please try again.");
  $scope.display=false;
  $scope.username='';
  $scope.password='';

}

};

}
]
);
