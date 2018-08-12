var bot=angular.module('bot',[]);

bot.controller('botCrtl',['$scope','$http','$interval',function($scope, $http, $interval){
  $scope.send=function(){
    $http({
        method : "POST",

		headers: {'Authorization': 'Bearer YWYxZmY0MjAtMGViOS00ZWFmLWI2YTktZTQ4ZjJhZGFkZDNjZThhMmY5NDgtN2Jm'},
		url : "https://api.ciscospark.com/v1/messages",
		data:{toPersonEmail:"justasamplebot@sparkbot.io",text:$scope.ques}
  }).then(function (response) {
    console.log(response);

  })

    var c=$interval(function(){$http({
        method : "GET",
        url : "https://api.ciscospark.com/v1/messages?roomId=Y2lzY29zcGFyazovL3VzL1JPT00vYTE5N2I0N2QtMDYzNC0zZDg0LTljNDQtMzNlNjJlZjNmMzk0&max=1",
		headers: {'Authorization': 'Bearer YWYxZmY0MjAtMGViOS00ZWFmLWI2YTktZTQ4ZjJhZGFkZDNjZThhMmY5NDgtN2Jm'}
    }).then(function mySuccess(response) {
        $scope.myWelcome = response.data;
        console.log($scope.myWelcome);
    }), function myError(response) {
        $scope.myWelcome = response.statusText;
    };
if($scope.myWelcome!=''){
  $interval.cancel(c);
}
}
,5000);





}
}])
