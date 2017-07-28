angular
    .module("fireApp", ['firebase', 'ngRoute'])

    .constant('firebaseConfig', {
        apiKey: "AIzaSyD_3WDxhD5CKCS5pq19vGiyxatrJ3-AtWc",
        authDomain: "coworkers-73629.firebaseapp.com",
        databaseURL: "https://coworkers-73629.firebaseio.com",
        projectId: "coworkers-73629",
        storageBucket: "",
        messagingSenderId: "823498735947"
    })

    .run(firebaseConfig => firebase.initializeApp(firebaseConfig))

    .config(function ($routeProvider, $locationProvider) {
        $routeProvider.when('/details/:itemID', {
                templateUrl: 'views/details.html',
                controller: 'coworkerCtrl'
            })
            .when('/', {
                templateUrl: 'views/placeholder.html'
                , controller: 'coworkerCtrl'
            }).when('/details-all', {
                templateUrl: 'views/details-all.html'
                , controller: 'allCoworkerCtrl'
            })
            .when('/createCoworker', {
                templateUrl: 'views/createCoworker.html'
                , controller: 'coworkerCtrl'
            })
            .otherwise({
                redirectTo: '/'
            })
    })

    .controller('allCoworkerCtrl   ', function ($scope, $routeParams) {
        $scope.itemID = $routeParams.itemID
        $scope.showAll = true
    })

    .controller('coworkerCtrl', function (
        $scope,
        $routeParams,
        $firebaseObject,
        $firebaseArray
    ) {
        const dbRef = firebase.database().ref().child('coworkerList')
        const key = $routeParams.itemID
        $scope.coworker = key ? $firebaseObject(dbRef.child(key)) : null

        $scope.coworkerList = $firebaseArray(dbRef)
        this.getBlankCoworker = () => ({
            id: '',
            firstName: '',
            lastName: '',
            nickname: '',
            description: '',
            funFacts: '',
        })

        $scope.newCoworker = this.getBlankCoworker()


        $scope.addCoworker = () => {
            $scope.coworkerList
                .$add($scope.newCoworker)
                .then(ref => {
                    $scope.newCoworker = this.getBlankCoworker()
                    $location.path('/details/' + ref.key)
                })
        }
        $scope.removeCoworker = coworker => {
            if (confirm("Are you sure you want to delete this coworker?")) {
                coworker.$remove()
            }
        }
        //        $scope.nextCoworker = () => {
        //            const nextIndex = $scope.coworkerList.indexFor($scope.coworker.$id) + 1
        //                const nextIndex = (index )
        //            const nextKey = $scope.coworkerList.$keyAt(nextIndex)
        //            $location.path('/details/' + nextKey)
        //        }
    })
