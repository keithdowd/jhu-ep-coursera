(function () {

    "use strict";

    var myApp = angular.module("NarrowItDownApp", []);

    myApp.controller("NarrowItDownController", NarrowItDownController);
    myApp.service("MenuSearchService", MenuSearchService);
    myApp.directive("foundItems", FoundItemsDirective);

    NarrowItDownController.$inject = ['MenuSearchService'];

    function NarrowItDownController(MenuSearchService) {
        var vm = this;
        var service = MenuSearchService;

        vm.searched = false;
        vm.found = [];

        vm.getMenuItems = function (searchTerm) {
            vm.searched = true;
            
            if (searchTerm === '') {
                vm.found = [];
            } else {
                var promise = service.getMatchedMenuItems(searchTerm);

                promise.then(function (response) {
                    vm.found = response;
                });
            }
        }

        vm.onRemove = function (index) {
            vm.found.splice(index, 1);
        }
    }

    MenuSearchService.$inject = ['$http'];

    function MenuSearchService($http) {
        var service = this;
        var url = 'https://davids-restaurant.herokuapp.com/menu_items.json';

        service.getMatchedMenuItems = function (searchTerm) {
            var config = {
                method: 'GET',
                url: url
            };

            var response = $http(config).then(function (response) {
                var term = searchTerm.toLowerCase();
                var menuItems = response.data.menu_items;
                var foundItems = [];

                menuItems.forEach(function (value) {
                    var description = value.description.toLowerCase();

                    if (description.indexOf(term, 0) !== -1) {
                        foundItems.push(value);
                    }
                });

                return foundItems;

            }).catch(function (error) {
                console.log('error');
            });

            return response;
        };
    }

    function FoundItemsDirective() {
        var ddo = {
            templateUrl: "views/shoppingList.html",
            scope: {
                items: '<',
                onRemove: '&'
            }
        };

        return ddo;
    }

})();