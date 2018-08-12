var login=angular.module('newgr',['ngCookies']);

var store,adminid;

login.controller('groupCrtl',['$scope','$filter','$http','$cookies',function($scope ,$filter, $http, $cookies ) {

  var ht=window.location.href;
  var ar=ht.split('/');

$http.get(ar[0]+'//'+ar[2]+'/users/list').then(function(response){

$scope.contacts=response.data;

$scope.logged=sessionStorage.getItem('logged');
var data=[];
var toadd={
  user_id:""
};
$scope.isChecked=function(_id){
  var match=false;
  for(var i=0;i<data.length;i++){
    if(data[i].user_id==_id){
      match=true;
    }
  }
  return match;
};
$scope.level1=[];
$scope.level2=[];
$scope.rank;

for(var i=0;i<($scope.contacts.length);i++)
{

  if(sessionStorage.getItem('getid')==$scope.contacts[i]._id){
    $scope.obj=$scope.contacts[i];
  }
  if($scope.contacts[i].level1==true)
  $scope.level1.push($scope.contacts[i])
  else  {
    $scope.level2.push($scope.contacts[i])

  }
}


$scope.sync=function(bool,item){
  if(bool){
    toadd.user_id=item._id;
    data.push(angular.copy(toadd));
  }
  else{
    for(var i=0;i<data.length;i++){
      if(data[i].user_id==item._id){
        data.splice(i,1);
      }
    }
  }

}




$scope.action=function(){


  var date = ($filter('date')(new Date($scope.date),'yyyy-MM-dd')).toString().split('-');

  var str= $scope.value.toTimeString().split(' ')[0];
  var time;
  time=str.split(':');
  for(var i=0;i<$scope.contacts.length;i++){
    if($scope.contacts[i].username==$scope.logged){
      toadd.user_id=$scope.contacts[i]._id;
      adminid=$scope.contacts[i]._id;

        data.push(angular.copy(toadd));
    }
  }
  $scope.obj={
    username:$scope.meetingname,
    subject:$scope.subject,
    agenda:$scope.agenda,
    adminID:sessionStorage.getItem('logged'),
    users:data,
    hh:time[0],
    min:time[1],
    dd:date[2],
    mm:date[1],
    yyyy:date[0]

};
console.log($scope.obj);

$http.post(ar[0]+'//'+ar[2]+'/group/',$scope.obj).then(function(response){
console.log(response);
if(response.data.status==true){
  store=response.data.groupid;
  document.location.href = ar[0]+'//'+ar[2]+'/group/'+adminid+"/"+store;
}

});


};
});

}]);
