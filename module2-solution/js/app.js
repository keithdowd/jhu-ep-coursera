(function() {

    'use strict';


    // *****************************
    // MODULE
    // *****************************

    var ShoppingListCheckOff = angular.module('ShoppingListCheckOff', []);


    // *****************************
    // CONTROLLERS
    // *****************************

    ShoppingListCheckOff.controller('ToBuyController', ToBuyController );
    ShoppingListCheckOff.controller('AlreadyBoughtController', AlreadyBoughtController);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

    function ToBuyController(ShoppingListCheckOffService) {
        // View model
        var vm = this;
        var service = ShoppingListCheckOffService;

        // Properties
        vm.shoppingList = service.viewShoppingList('buy');
        
        // Methods
        vm.buyItem = service.buyItem;
    }

    function AlreadyBoughtController(ShoppingListCheckOffService) {
        // View model
        var vm = this;
        var service = ShoppingListCheckOffService;

        // Properties
        vm.shoppingList = service.viewShoppingList('bought');
    }


    // *****************************
    // SERVICES
    // *****************************

    ShoppingListCheckOff.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    function ShoppingListCheckOffService() {
        var service = this;

        // Shopping lists
        var _shoppingListBuy = [
            { item: 'cookies', quantity: 5 },
            { item: 'carrots', quantity: 10 },
            { item: 'cakes', quantity: 8 },
            { item: 'cheeses', quantity: 21 },
            { item: 'chocolates', quantity: 2}
        ];

        var _shoppingListBought = [];

        // Shopping lists enumeration
        var shoppingListsEnum = {
            'buy': _shoppingListBuy,
            'bought': _shoppingListBought
        };

        // Private utility methods
        var _addItem = function (item, shoppingList) {
            shoppingListsEnum[shoppingList].push(item);
        };

        var _removeItem = function (index, shoppingList) {
            shoppingListsEnum[shoppingList].splice(index, 1);
        };

        // Public methods
        service.buyItem = function (index) {
            // Store item
            var item = shoppingListsEnum['buy'][index];
            // Remove item from buy shopping list
            _removeItem(index, 'buy');
            // Add item to bought shopping list
            _addItem(item, 'bought');
        };

        service.viewShoppingList = function (shoppingList) {
            return shoppingListsEnum[shoppingList];
        };
    }

}());