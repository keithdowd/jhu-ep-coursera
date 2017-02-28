(function() {

    'use strict';

    // *****************************
    // MODULE
    // *****************************

    var myApp = angular.module('MyApp', []);


    // *****************************
    // CONTROLLERS
    // *****************************

    myApp.controller('shoppingListBuyController', shoppingListBuyController);
    myApp.controller('shoppingListBoughtController', shoppingListBoughtController);

    shoppingListBuyController.$inject = ['shoppingListService'];
    shoppingListBoughtController.$inject = ['shoppingListService'];

    function shoppingListBuyController (shoppingListService) {
        // View model
        var vm = this;
        var service = shoppingListService;

        // Properties
        vm.shoppingList = service.viewShoppingList('buy');
        vm.numberOfItems = vm.shoppingList.length + 1;

        // Methods
        vm.boughtItem = service.boughtItem;
    }

    function shoppingListBoughtController(shoppingListService) {
        // View model
        var vm = this;
        var service = shoppingListService;

        // Properties
        vm.shoppingList = service.viewShoppingList('bought');
    }


    // *****************************
    // SERVICES
    // *****************************

    myApp.service('shoppingListService', shoppingListService);

    function shoppingListService() {
        var service = this;

        var _shoppingListBuy = [
            { item: 'widget', quantity: 5 },
            { item: 'widget', quantity: 5 },
        ];

        var _shoppingListBought = [
            { item: 'widget', quantity: 10 }
        ];

        var _addItem = function (item, shoppingList) {
            _whichShoppingList(shoppingList).push(item);
        };

        var _removeItem = function (index, shoppingList) {
            _whichShoppingList(shoppingList).splice(index, 1);
        };

        var _whichShoppingList = function (shoppingList) {
            if (shoppingList === 'buy') {
                return _shoppingListBuy;
            }
            
            if (shoppingList === 'bought') {
                return _shoppingListBought;
            }

            // Return buy shopping list if no shopping list is explicitly passed
            return _shoppingListBuy;
        };

        service.boughtItem = function (index) {
            // Store item
            var item = _shoppingListBuy[index];
            // Remove item from buy shopping list
            _removeItem(index, 'buy');
            // Add item to bought shopping list
            _addItem(item, 'bought');
        };

        service.viewShoppingList = function (shoppingList) {
            return _whichShoppingList(shoppingList);
        };
    }

}());