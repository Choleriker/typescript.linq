/// <reference path="linqts.d.ts" />
// ReSharper disable InconsistentNaming
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
    Custom error which implements exception which are thrown by the TsLinq test system.
**/
var LinqTestError = (function (_super) {
    __extends(LinqTestError, _super);
    /**
        Constructor.
        @param String message The message which is given by the error.
    **/
    function LinqTestError(message) {
        _super.call(this, message);
    }
    return LinqTestError;
})(Error);
/**
    Logger for logging test messages.
**/
var Logger = (function () {
    /**
        Constructor.
        @aram Function log The function which is used for logging.
    **/
    function Logger(log) {
        var _this = this;
        this.log = log;
        this.error = function (msg) {
            _this.log("Error: " + msg);
            alert("Error found: " + msg);
            throw new LinqTestError(msg);
        };
    }
    return Logger;
})();
/**
    Tester for the Linq system.
**/
var TsLinqTester = (function () {
    /**
        Constructor.
        @param Logger logger The logger which is used for output the
    **/
    function TsLinqTester(logger) {
        this.logger = logger;
    }
    /**
        Starts all tests. Tests are methods which are starting with "test"
    **/
    TsLinqTester.prototype.startTests = function () {
        this.test_Concat();
        this.test_Take();
        this.test_Aggregate();
        this.test_Skip();
        this.test_ElementAtOrDefault();
        this.test_ElementAt();
        this.test_IndexOf();
        this.test_SelectMany();
        this.test_All();
        this.test_Any();
        this.test_Contains();
        this.test_Last();
        this.test_LastOrDefault();
        this.test_FirstOrDefault();
        this.test_First();
        this.test_Sum();
        this.test_ForEach();
        this.test_Select();
        this.test_Single();
        this.test_SingleOrDefault();
    };
    /**
     * Tests for Concat() method.
     */
    TsLinqTester.prototype.test_Concat = function () {
        this.logger.log('Testing Concat() on two arrays');
        var res = [1, 2].Concat([3, 4]);
        this.assert(function () { return res.length === 4; }, "Length of concatinated array should be 4.");
        this.assert(function () { return res[0] === 1; }, "Wrong item on that place.");
        this.assert(function () { return res[1] === 2; }, "Wrong item on that place.");
        this.assert(function () { return res[2] === 3; }, "Wrong item on that place.");
        this.assert(function () { return res[3] === 4; }, "Wrong item on that place.");
    };
    /**
     * Tests for Take() method.
     */
    TsLinqTester.prototype.test_Take = function () {
        var _this = this;
        this.logger.log("Testing Take() 3 of 4 items.");
        var items = [1, 2, 3, 4].Take(3);
        this.assert(function () { return items.length === 3; }, "Not 3 items where returned as expected.");
        items.forEach(function (i) { return _this.assert(function () { return [1, 2, 3].Contains(i); }, "Item " + i + " was not expected in return."); });
        this.logger.log("Testing Take() 2 of 1 items.");
        items = [1].Take(2);
        this.assert(function () { return items.length === 1; }, "Not 1 items where returned as expected.");
        this.assert(function () { return items[0] === 1; }, "Item " + items[0] + " was not expected in return.");
        this.logger.log("Testing Take() 4 of 4 items.");
        items = [1, 2, 3, 4].Take(4);
        this.assert(function () { return items.length === 4; }, "Not 4 items where returned as expected.");
        items.forEach(function (i) { return _this.assert(function () { return [1, 2, 3, 4].Contains(i); }, "Item " + i + " was not expected in return."); });
    };
    /**
     * Tests for Aggregate() method.
     */
    TsLinqTester.prototype.test_Aggregate = function () {
        this.logger.log('Testing Aggregate() method.');
        this.assert(function () { return 55 === [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].Aggregate(function (a, b) { return a + b; }); }, "should return 55");
    };
    /**
     * Tests for Skip() method.
     */
    TsLinqTester.prototype.test_Skip = function () {
        var _this = this;
        this.logger.log("Testing Skip() with 2 skipped items");
        var res = [1, 2, 3, 4].Skip(2);
        this.assert(function () { return res.length === 2; }, "Length of 2 was expected.");
        res.ForEach(function (item) { return _this.assert(function () { return [3, 4].Contains(item); }, "Items has no correct content."); });
        this.logger.log("Testing Skip() more items than I have");
        this.assert(function () { return [1, 2].Skip(10).length === 0; }, "Return should be empty.");
    };
    /**
     * Test method for Cast() implementation.
     */
    TsLinqTester.prototype.test_Cast = function () {
        // This should not give compiler error. Casting is here only used for internal type transfer.
        var casted = [1, 2, 3].Cast();
    };
    /**
     * Test Method for ElementAt().
     * @returns {}
     */
    TsLinqTester.prototype.test_ElementAt = function () {
        this.logger.log("Testing ElementAt() with correct index");
        this.assert(function () { return [1, 2].ElementAt(0) === 1; }, "Element at with wrong index does not return throw the error.");
        this.logger.log("Testing ElementAt() with wrong index");
        this.expectError(function () { return [1, 2].ElementAt(5); }, "Element at with wrong index does not return throw the error.");
    };
    /**
     * Test Method for ElementAtOrDefault().
     * @returns {}
     */
    TsLinqTester.prototype.test_ElementAtOrDefault = function () {
        this.logger.log("Testing ElementAtOrDefault() with correct index");
        this.assert(function () { return [1, 2].ElementAtOrDefault(0) === 1; }, "Element at with wrong index does not return throw the error.");
        this.logger.log("Testing ElementAtOrDefault() with wrong index, null is returned");
        this.assert(function () { return [1, 2].ElementAtOrDefault(5) == null; }, "Null was not returned as expected.");
        this.logger.log("Testing ElementAtOrDefault() with wrong index, defaultValue is returned");
        this.assert(function () { return [1, 2].ElementAtOrDefault(5, 10) === 10; }, "10 was not returned as expected.");
    };
    /**
     * Test method for IndexOf()
     */
    TsLinqTester.prototype.test_IndexOf = function () {
        this.logger.log("Testing IndexOf() where item was found, expression object");
        this.assert(function () { return [1, 2, 3, 4].IndexOf(2) === 1; }, "Item was not located correctly.");
        this.logger.log("Testing IndexOf() where item was not found, expression object");
        this.assert(function () { return [1, 2, 3, 4].IndexOf(5) === -1; }, "Item was not located correctly.");
        this.logger.log("Testing IndexOf() where item was found, expression method");
        this.assert(function () { return [1, 2, 3, 4].IndexOf(function (i) { return i === 2; }) === 1; }, "Item was not located correctly.");
        this.logger.log("Testing IndexOf() where item was not found, expression method");
        this.assert(function () { return [1, 2, 3, 4].IndexOf(function (i) { return i === 5; }) === -1; }, "Item was not located correctly.");
    };
    /**
     * Test method for SelectMany().
     */
    TsLinqTester.prototype.test_SelectMany = function () {
        this.logger.log("Testing SelectMany()");
        var flattened = [{ items: [1, 2] }, { items: [4, 4] }].SelectMany(function (item) { return item.items; });
        this.assert(function () { return flattened.length === 4; }, "Flattened array has an length of " + flattened.length + " but expected was 4");
        var self = this;
        flattened.ForEach(function (item) {
            self.assert(function () { return [1, 2, 3, 4].Contains(item); }, "Item " + item + " was in the array but not expected.");
        });
    };
    /**
        Tests for Any() method.
    **/
    TsLinqTester.prototype.test_Any = function () {
        this.logger.log("Testing Any() with an empty array");
        this.assert(function () { return [].Any(4) === false; }, "False was not returned.");
        this.logger.log("Testing Any() with an undefined expression, but with items");
        this.assert(function () { return [1, 2, 3].Any(); }, "True was not returned");
        this.logger.log("Testing Any() with an undefined expression, but without items");
        this.assert(function () { return [].Any() === false; }, "False was not returned");
        this.logger.log("Testing Any() with an expression method, returns true");
        this.assert(function () { return [2, 4, 6, 8, 10].Any(function (item) { return item === 4; }); }, "True was not returned");
        this.logger.log("Testing Any() with an expression object, returns true");
        this.assert(function () { return [2, 3, 4, 5].Any(2); }, "True was not returned");
        this.logger.log("Testing Any() with an expression method, returns false");
        this.assert(function () { return [1, 3, 5, 7, 9].Any(function (item) { return item === 2; }) === false; }, "False was not returned");
        this.logger.log("Testing Any() with an expression object, returns false");
        this.assert(function () { return [1, 3, 4].Any(2) === false; }, "False was not returned");
    };
    /**
        Tests for All() method.
    **/
    TsLinqTester.prototype.test_All = function () {
        this.logger.log("Testing All() with an empty array");
        this.expectError(function () { return [].All(4); }, "Expected error was not thrown");
        this.logger.log("Testing All() with an undefined expression");
        this.expectError(function () { return [1, 2, 3].All(undefined); }, "Expected error was not thrown");
        this.logger.log("Testing All() with an expression method, returns true");
        this.assert(function () { return [2, 4, 6, 8, 10].All(function (item) { return item % 2 === 0; }); }, "True was not returned");
        this.logger.log("Testing All() with an expression object, returns true");
        this.assert(function () { return [2, 2, 2].All(2); }, "True was not returned");
        this.logger.log("Testing All() with an expression method, returns false");
        this.assert(function () { return [1, 3, 5, 7, 9].All(function (item) { return item % 2 === 0; }) === false; }, "False was not returned");
        this.logger.log("Testing All() with an expression object, returns false");
        this.assert(function () { return [1, 1, 1].All(2) === false; }, "False was not returned");
    };
    /**
        Tests the Contains() method.
    **/
    TsLinqTester.prototype.test_Contains = function () {
        this.logger.log("Testing contains with unspecified expression");
        this.expectError(function () { return [].Contains(); }, "Expected error was not thrown");
        this.logger.log("Testing contains with expression method, found item");
        this.assert(function () { return [1, 2, 3].Contains(function (item) { return item === 2; }); }, "Expected item 2 was not found.");
        this.logger.log('Testing contains with expression object, found item');
        this.assert(function () { return [1, 2, 3].Contains(2); }, "Expected item 2 was not found.");
        this.logger.log("Testing contains with expression method, not found item");
        this.assert(function () { return [1, 2, 3].Contains(function (item) { return item === 4; }) === false; }, "Item was found, but false was expected.");
        this.logger.log("Testing contains with expression object, not found item");
        this.assert(function () { return [1, 2, 3].Contains(20) === false; }, "Item was found, but false was expected.");
    };
    /**
        Tests for the Last() method.
    **/
    TsLinqTester.prototype.test_Last = function () {
        this.logger.log("Testing Last() with no expression defined");
        this.assert(function () { return [1, 2, 3, 4, 5].Last() === 5; }, "The expected result 5 was not returned");
        this.logger.log("Testing Last() with empty array");
        this.expectError(function () { return [].Last(); }, "Expected error was not thrown");
        this.logger.log("Testing Last() with function expression defined");
        this.assert(function () { return [1, 2, 3, 4, 5].Last(function (item) { return item === 5; }) === 5; }, "The expected result 5 was not returned");
        this.logger.log("Testing Last() with object expression defined");
        this.assert(function () { return [1, 2, 3, 4, 5].Last(5) === 5; }, "The expected result 5 was not returned");
    };
    /**
        Tests for the Last() method.
    **/
    TsLinqTester.prototype.test_LastOrDefault = function () {
        this.logger.log("Testing LastOrDefault() with no expression defined");
        this.assert(function () { return [1, 2, 3, 4, 5].LastOrDefault() === 5; }, "The expected result 5 was not returned");
        this.logger.log("Testing LastOrDefault() with empty array");
        this.assert(function () { return [].LastOrDefault() == null; }, "NULL was not returned");
        this.logger.log("Testing LastOrDefault() with function expression defined");
        this.assert(function () { return [1, 2, 3, 4, 5].LastOrDefault(function (item) { return item === 5; }) === 5; }, "The expected result 5 was not returned");
        this.logger.log("Testing LastOrDefault() with object expression defined");
        this.assert(function () { return [1, 2, 3, 4, 5].LastOrDefault(5) === 5; }, "The expected result 5 was not returned");
        this.logger.log("Testing LastOrDefault() with function expression defined which does not match");
        this.assert(function () { return [1, 2, 3, 4, 5].LastOrDefault(function (item) { return item === 10; }) == null; }, "The expected result NULL was not returned");
        this.logger.log("Testing LastOrDefault() with object expression defined which does not match");
        this.assert(function () { return [1, 2, 3, 4, 5].LastOrDefault(10) == null; }, "The expected result NULL was not returned");
    };
    /**
        Tests the First() method.
    **/
    TsLinqTester.prototype.test_First = function () {
        this.logger.log("Testing First() without expression");
        this.assert(function () { return [1, 2, 3, 4, 5].First() === 1; }, "First() does not return the correct item");
        this.logger.log("Testing First() with simple object expression");
        this.assert(function () { return [1, 2, 3, 4, 5].First(5) === 5; }, "First() does not return the correct item");
        this.logger.log("Testing First() with function expression");
        this.assert(function () { return [1, 2, 3, 4, 5].First(function (item) { return item === 5; }) === 5; }, "First() does not return the correct item");
        this.logger.log("Testing First() with an empty array");
        this.expectError(function () { return [].First(); }, "Error was not thrown");
        this.logger.log("Testing First() which does not find any items");
        this.expectError(function () { return [1, 2, 3].First(4); }, "Error was not thrown");
    };
    /**
        Tests the FirstOrDefault() method.
    **/
    TsLinqTester.prototype.test_FirstOrDefault = function () {
        this.logger.log("Testing FirstOrDefault() without expression");
        this.assert(function () { return [1, 2, 3, 4, 5].FirstOrDefault() === 1; }, "FirstOrDefault() does not return the correct item");
        this.logger.log("Testing FirstOrDefault() with simple object expression");
        this.assert(function () { return [1, 2, 3, 4, 5].FirstOrDefault(5) === 5; }, "FirstOrDefault() does not return the correct item");
        this.logger.log("Testing FirstOrDefault() with function expression");
        this.assert(function () { return [1, 2, 3, 4, 5].FirstOrDefault(function (item) { return item === 5; }) === 5; }, "FirstOrDefault() does not return the correct item");
        this.logger.log("Testing FirstOrDefault() with an empty array");
        this.assert(function () { return [].FirstOrDefault() == null; }, "Null was expected but not returned");
        this.logger.log("Testing FirstOrDefault() which does not find any items");
        this.assert(function () { return [1, 2, 3].FirstOrDefault(4) == null; }, "NULL was not returned");
    };
    /**
        Tests for Array forEach.
    **/
    TsLinqTester.prototype.test_ForEach = function () {
        this.logger.log("Testing ForEach()");
        var cnt = 0;
        [1, 2, 3, 4, 5, 6].ForEach(function () {
            cnt++;
        });
        this.assert(function () { return cnt === 6; }, "ForEach() was not triggered 6 times");
        this.logger.log("Testing forEach() whith stepping out on second item.");
        cnt = 0;
        [1, 2, 3, 4, 5, 6].ForEach(function (item) {
            cnt++;
            if (item === 2)
                return false;
            return true;
        });
        this.assert(function () { return cnt === 2; }, "ForEach() was not triggered 2 times and then stopped. It was triggered " + cnt + " times");
    };
    /**
        Tests for single or default.
    **/
    TsLinqTester.prototype.test_SingleOrDefault = function () {
        this.logger.log("Testing SingleOrDefault() with function expression, found item");
        this.assert(function () { return 2 === [1, 2, 3, 4, 5, 6].SingleOrDefault(function (item) {
            if (item === 2) {
                return true;
            }
            return false;
        }); }, "The result expected was 2");
        this.logger.log("Testing SingleOrDefault() with function expression, not found item");
        this.assert(function () { return null == [1, 3, 4, 5, 6].SingleOrDefault(function (item) {
            if (item === 2) {
                return true;
            }
            return false;
        }); }, "The result expected was NULL");
        this.logger.log("Testing SingleOrDefault() with function expression, not found item and default value.");
        this.assert(function () { return 20 === [1, 3, 4, 5, 6].SingleOrDefault(function (item) {
            if (item === 2) {
                return true;
            }
            return false;
        }, 20); }, "The result expected was 20");
        this.logger.log("Testing SingleOrDefault() with expression, found item");
        this.assert(function () { return 2 === [1, 2, 3, 4, 5, 6].SingleOrDefault(2); }, "The result expected was 2");
        this.logger.log("Testing SingleOrDefault() with expression, not found item");
        this.assert(function () { return null == [1, 3, 4, 5, 6].SingleOrDefault(7); }, "The result expected was NULL");
        this.logger.log("Testing SingleOrDefault() with expression, not found item and default value.");
        this.assert(function () { return 20 === [1, 3, 4, 5, 6].SingleOrDefault(20, 20); }, "The result expected was 20");
        this.logger.log("Testing SingleOrDefault() with function expression where more than one items matches");
        this.expectError(function () { return 2 === [1, 2, 3, 4, 5, 6].SingleOrDefault(function (item) {
            if (item % 2 === 0) {
                return true;
            }
            return false;
        }); }, "The expected error was not thrown.");
    };
    /**
        Tests for single or default.
    **/
    TsLinqTester.prototype.test_Single = function () {
        this.logger.log("Testing Single() with function expression, found item");
        this.assert(function () { return 2 === [1, 2, 3, 4, 5, 6].Single(function (item) {
            if (item === 2) {
                return true;
            }
            return false;
        }); }, "The result expected was 2");
        this.logger.log("Testing Single() with function expression where more than one items matches");
        this.expectError(function () { return 2 === [1, 2, 3, 4, 5, 6].Single(function (item) {
            if (item % 2 === 0) {
                return true;
            }
            return false;
        }); }, "The expected error was not thrown.");
        this.logger.log("Testing Single() with function expression, not found item");
        this.expectError(function () { return null == [1, 3, 4, 5, 6].Single(function (item) {
            if (item === 2) {
                return true;
            }
            return false;
        }); }, "Single() should not found any item, error expected.");
        this.logger.log("Testing Single() with expression, found item");
        this.assert(function () { return 2 === [1, 2, 3, 4, 5, 6].Single(2); }, "The result expected was 2");
        this.logger.log("Testing Single() with expression, not found item");
        this.expectError(function () { return null == [1, 3, 4, 5, 6].Single(2); }, "Single() should not found any item, error expected.");
    };
    /**
        Testing Sum() method.
    **/
    TsLinqTester.prototype.test_Sum = function () {
        this.logger.log("Testing Sum() without selector method");
        this.assert(function () { return [1, 2, 3, 4, 5].Sum() === 15; }, "15 was expected for sum method");
        this.logger.log("Testing Sum() with selector method");
        var sumBase = [1, 2, 3, 4, 5].Select(function (item) { return { item: item }; });
        this.assert(function () { return sumBase.Sum(function (item) { return item.item; }) === 15; }, "15 was expected for sum method");
    };
    /**
        Tests for the select method.
    **/
    TsLinqTester.prototype.test_Select = function () {
        this.logger.log("Testing Select()");
        this.assert(function () {
            var result = [1, 2, 3, 4, 5].Select(function (i) { return { item: i }; });
            for (var i = 0; i < 5; i++) {
                var item = result[i].item;
                var expected = i + 1;
                var res = expected === item;
                if (!res) {
                    return false;
                }
            }
            return true;
        }, "Error on Select(), wrong items where selected");
    };
    /**
        Asserts the given method. If that fails, it throws an error.
    **/
    TsLinqTester.prototype.assert = function (val, msg) {
        if (val !== undefined && msg != undefined) {
            if (val() === false) {
                this.logger.error(msg);
            }
        }
    };
    /**
        Does an assertion which expect an error.
    **/
    TsLinqTester.prototype.expectError = function (errorMethod, msg) {
        var hasErrors = true;
        if (errorMethod != undefined) {
            try {
                errorMethod();
                hasErrors = false;
            }
            catch (e) { }
            if (!hasErrors) {
                this.logger.error("Error was expected but not thrown: " + msg);
            }
        }
    };
    return TsLinqTester;
})();
//# sourceMappingURL=app.js.map