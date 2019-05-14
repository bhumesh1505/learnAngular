var obj = {"Status": "Success", "body": {"username": "Guest", "weight": 6.0, "dob": "1991-01-01", "gender": "m", "userprofilepic": "https://healthatm.in/djangostatic/uploadedfiles/userprofilepics/ce7c7ebb-2955-4932-b6a2-e132a7b44bb8.png", "userid": 4, "height": 130.0, "phone": "919819368634", "email": "mayuri.dhumal@yolohealth.in", "externalid": "", "kioskid": 101, "iskioskadmin": false, "externalsystem": "", "age": 31}};
/*
app.controller("myCtrl", function($scope) {
    $scope.userprofilepic = obj.body.userprofilepic;
    $scope.name = obj.body.username;
    $scope.age = obj.body.age;
    $scope.gender = obj.body.gender;
    $scope.email = obj.body.email;         
});
*/
app.controller('myCtrl', function ($scope, $http) {

	$scope.phone = null;
	$scope.password = null;
	$scope.postdata = function (phone,password) {
		var data = {
			phone : phone,
			password : password
		};
		//Call the services
		$http.post('https://healthatm.in/api/Platform/loginuser/', JSON.stringify(data)).then(function (response) {
			if (response.data){
				$scope.msg = "Post Data Submitted Successfully!";
				$scope.dataHere = response.data;
				$scope.userid = response.data.body.userlist[0].userid;
				fetch(response.data.body.userlist[0].userid);
			}
		}, 
		function (response) {
			$scope.msg = "Service not Exists";
			$scope.statusval = response.status;
			$scope.statustext = response.statusText;
			$scope.headers = response.headers();
		});
	};
	function fetch(userid){
		$http.get("https://healthatm.in/api/User/getUserDetails/?authkey=temp&authsecret=temp&userid=" + userid)
		.then(function(response){ $scope.details = response.data; });
	}
});

