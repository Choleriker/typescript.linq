/// <reference path="linqts.d.ts" />
// ReSharper disable InconsistentNaming

/**
    Custom error which implements exception which are thrown by the TsLinq test system.
**/
class LinqTestError extends Error {
    /**
        Constructor.
        @param String message The message which is given by the error.
    **/
    constructor(message: string) {
        super(message);
    }
}

/**
    Logger for logging test messages. 
**/
class Logger {
    /**
        Method which is used for logging.
    **/
    log: (msg: string) => void;

    /**
        Method which is used for error logging.
    **/
    error: (msg: string) => void;

    /**
        Constructor.
        @aram Function log The function which is used for logging.
    **/
    constructor(log: (msg: string) => void) {
        this.log = log;
        this.error = (msg: string) => {
            this.log("Error: " + msg);
            alert("Error found: " + msg);
            throw new LinqTestError(msg);
        };
    }
}

/** 
    Tester for the Linq system.
**/
class TsLinqTester {

    /**
        Starts all tests. Tests are methods which are starting with "test"
    **/
    startTests() {
        this.test_Count();
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
    }

    /**
     * Test method for Count().
     * @returns {} 
     */
    test_Count() {
        this.logger.log('Testing Count() without expression');
        this.assert(() => [1, 2, 3, 4].Count() === 4, "Expected count is wrong.");
        this.logger.log('Testing Count() with expression method');
        this.assert(() => [1, 4, 3, 4].Count(i => i === 4) === 2, "Expected count is wrong.");
        this.logger.log('Testing Count() with expression object');
        this.assert(() => [1, 4, 3, 4].Count(4) === 2, "Expected count is wrong.");
    }

    /**
     * Tests for Concat() method.
     */
    test_Concat() {
        this.logger.log('Testing Concat() on two arrays');
        var res = [1, 2].Concat([3, 4]);
        this.assert(() => res.length === 4, "Length of concatinated array should be 4.");
        this.assert(() => res[0] === 1, "Wrong item on that place.");
        this.assert(() => res[1] === 2, "Wrong item on that place.");
        this.assert(() => res[2] === 3, "Wrong item on that place.");
        this.assert(() => res[3] === 4, "Wrong item on that place.");
    }

    /**
     * Tests for Take() method.
     */
    test_Take() {
        this.logger.log("Testing Take() 3 of 4 items.");
        var items = [1, 2, 3, 4].Take(3);
        this.assert(() => items.length === 3, "Not 3 items where returned as expected.");
        items.forEach(i => this.assert(() => [1, 2, 3].Contains(i), "Item " + i + " was not expected in return."));
        this.logger.log("Testing Take() 2 of 1 items.");
        items = [1].Take(2);
        this.assert(() => items.length === 1, "Not 1 items where returned as expected.");
        this.assert(() => items[0] === 1, "Item " + items[0] + " was not expected in return.");
        this.logger.log("Testing Take() 4 of 4 items.");
        items = [1, 2, 3, 4].Take(4);
        this.assert(() => items.length === 4, "Not 4 items where returned as expected.");
        items.forEach(i => this.assert(() => [1, 2, 3, 4].Contains(i), "Item " + i + " was not expected in return."));
    }

    /**
     * Tests for Aggregate() method.
     */
    test_Aggregate() {
        this.logger.log('Testing Aggregate() method.');
        this.assert(() => 55 === [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].Aggregate<number>((a, b) => a + b), "should return 55");
    }

    /**
     * Tests for Skip() method.
     */
    test_Skip() {
        this.logger.log("Testing Skip() with 2 skipped items");
        var res = [1, 2, 3, 4].Skip(2);
        this.assert(() => res.length === 2, "Length of 2 was expected.");
        res.ForEach(item => this.assert(() => [3, 4].Contains(item), "Items has no correct content."));
        this.logger.log("Testing Skip() more items than I have");
        this.assert(() => [1, 2].Skip(10).length === 0, "Return should be empty.");
    }

    /**
     * Test method for Cast() implementation.
     */
    test_Cast() {
        // This should not give compiler error. Casting is here only used for internal type transfer.
        var casted: Object[] = [1, 2, 3].Cast<Object>();
    }

    /**
     * Test Method for ElementAt().
     * @returns {} 
     */
    test_ElementAt() {
        this.logger.log("Testing ElementAt() with correct index");
        this.assert(() => [1, 2].ElementAt(0) === 1, "Element at with wrong index does not return throw the error.");
        this.logger.log("Testing ElementAt() with wrong index");
        this.expectError(() => [1, 2].ElementAt(5), "Element at with wrong index does not return throw the error.");
    }

    /**
     * Test Method for ElementAtOrDefault().
     * @returns {} 
     */
    test_ElementAtOrDefault() {
        this.logger.log("Testing ElementAtOrDefault() with correct index");
        this.assert(() => [1, 2].ElementAtOrDefault(0) === 1, "Element at with wrong index does not return throw the error.");
        this.logger.log("Testing ElementAtOrDefault() with wrong index, null is returned");
        this.assert(() => [1, 2].ElementAtOrDefault(5) == null, "Null was not returned as expected.");
        this.logger.log("Testing ElementAtOrDefault() with wrong index, defaultValue is returned");
        this.assert(() => [1, 2].ElementAtOrDefault(5, 10) === 10, "10 was not returned as expected.");
    }


    /**
     * Test method for IndexOf()
     */
    test_IndexOf() {
        this.logger.log("Testing IndexOf() where item was found, expression object");
        this.assert(() => [1, 2, 3, 4].IndexOf(2) === 1, "Item was not located correctly.");
        this.logger.log("Testing IndexOf() where item was not found, expression object");
        this.assert(() => [1, 2, 3, 4].IndexOf(5) === -1, "Item was not located correctly.");
        this.logger.log("Testing IndexOf() where item was found, expression method");
        this.assert(() => [1, 2, 3, 4].IndexOf(i => i === 2) === 1, "Item was not located correctly.");
        this.logger.log("Testing IndexOf() where item was not found, expression method");
        this.assert(() => [1, 2, 3, 4].IndexOf(i => i === 5) === -1, "Item was not located correctly.");
    }

    /**
     * Test method for SelectMany().
     */
    test_SelectMany() {
        this.logger.log("Testing SelectMany()");
        var flattened = [{ items: [1, 2] }, { items: [4, 4] }].SelectMany(item => item.items);
        this.assert(() => flattened.length === 4, "Flattened array has an length of " + flattened.length + " but expected was 4");
        var self = this;
        flattened.ForEach(item => {
            self.assert(() => [1,2,3,4].Contains(item), "Item "+item+" was in the array but not expected.");
        });
    }

    /**
        Tests for Any() method.
    **/
    test_Any() {
        this.logger.log("Testing Any() with an empty array");
        this.assert(() => (<any>[]).Any(4) === false, "False was not returned.");
        this.logger.log("Testing Any() with an undefined expression, but with items");
        this.assert(() => [1, 2, 3].Any(), "True was not returned");
        this.logger.log("Testing Any() with an undefined expression, but without items");
        this.assert(() => [].Any() === false, "False was not returned");
        this.logger.log("Testing Any() with an expression method, returns true");
        this.assert(() => [2, 4, 6, 8, 10].Any((item) => item === 4), "True was not returned");
        this.logger.log("Testing Any() with an expression object, returns true");
        this.assert(() => [2, 3, 4, 5].Any(2), "True was not returned");
        this.logger.log("Testing Any() with an expression method, returns false");
        this.assert(() => [1, 3, 5, 7, 9].Any((item) => item === 2) === false, "False was not returned");
        this.logger.log("Testing Any() with an expression object, returns false");
        this.assert(() => [1, 3, 4].Any(2) === false, "False was not returned");
    }

    /**
        Tests for All() method.
    **/
    test_All() {
        this.logger.log("Testing All() with an empty array");
        this.expectError(() => (<any>[]).All(4), "Expected error was not thrown");
        this.logger.log("Testing All() with an undefined expression");
        this.expectError(() => [1, 2, 3].All(undefined), "Expected error was not thrown");
        this.logger.log("Testing All() with an expression method, returns true");
        this.assert(() => [2, 4, 6, 8, 10].All((item) => item % 2 === 0), "True was not returned");
        this.logger.log("Testing All() with an expression object, returns true");
        this.assert(() => [2, 2, 2].All(2), "True was not returned");
        this.logger.log("Testing All() with an expression method, returns false");
        this.assert(() => [1, 3, 5, 7, 9].All((item) => item % 2 === 0) === false, "False was not returned");
        this.logger.log("Testing All() with an expression object, returns false");
        this.assert(() => [1, 1, 1].All(2) === false, "False was not returned");
    }

    /**
        Tests the Contains() method.
    **/
    test_Contains() {
        this.logger.log("Testing contains with unspecified expression");
        this.expectError(() => [].Contains(), "Expected error was not thrown");
        this.logger.log("Testing contains with expression method, found item");
        this.assert(() => [1, 2, 3].Contains((item) => item === 2), "Expected item 2 was not found.");
        this.logger.log('Testing contains with expression object, found item');
        this.assert(() => [1, 2, 3].Contains(2), "Expected item 2 was not found.");
        this.logger.log("Testing contains with expression method, not found item");
        this.assert(() => [1, 2, 3].Contains((item) => item === 4) === false, "Item was found, but false was expected.");
        this.logger.log("Testing contains with expression object, not found item");
        this.assert(() => [1, 2, 3].Contains(20) === false, "Item was found, but false was expected.");
    }

    /**
        Tests for the Last() method.
    **/
    test_Last() {
        this.logger.log("Testing Last() with no expression defined");
        this.assert(() => [1, 2, 3, 4, 5].Last() === 5, "The expected result 5 was not returned");
        this.logger.log("Testing Last() with empty array");
        this.expectError(() => [].Last(), "Expected error was not thrown");
        this.logger.log("Testing Last() with function expression defined");
        this.assert(() => [1, 2, 3, 4, 5].Last((item) => item === 5) === 5, "The expected result 5 was not returned");
        this.logger.log("Testing Last() with object expression defined");
        this.assert(() => [1, 2, 3, 4, 5].Last(5) === 5, "The expected result 5 was not returned");
    }

    /**
        Tests for the Last() method.
    **/
    test_LastOrDefault() {
        this.logger.log("Testing LastOrDefault() with no expression defined");
        this.assert(() => [1, 2, 3, 4, 5].LastOrDefault() === 5, "The expected result 5 was not returned");
        this.logger.log("Testing LastOrDefault() with empty array");
        this.assert(() => [].LastOrDefault() == null, "NULL was not returned");
        this.logger.log("Testing LastOrDefault() with function expression defined");
        this.assert(() => [1, 2, 3, 4, 5].LastOrDefault((item) => item === 5) === 5, "The expected result 5 was not returned");
        this.logger.log("Testing LastOrDefault() with object expression defined");
        this.assert(() => [1, 2, 3, 4, 5].LastOrDefault(5) === 5, "The expected result 5 was not returned");
        this.logger.log("Testing LastOrDefault() with function expression defined which does not match");
        this.assert(() => [1, 2, 3, 4, 5].LastOrDefault((item) => item === 10) == null, "The expected result NULL was not returned");
        this.logger.log("Testing LastOrDefault() with object expression defined which does not match");
        this.assert(() => [1, 2, 3, 4, 5].LastOrDefault(10) == null, "The expected result NULL was not returned");
    }

    /**
        Tests the First() method.
    **/
    test_First() {
        this.logger.log("Testing First() without expression");
        this.assert(() => [1, 2, 3, 4, 5].First() === 1, "First() does not return the correct item");
        this.logger.log("Testing First() with simple object expression");
        this.assert(() => [1, 2, 3, 4, 5].First(5) === 5, "First() does not return the correct item");
        this.logger.log("Testing First() with function expression");
        this.assert(() => [1, 2, 3, 4, 5].First(item => item === 5) === 5, "First() does not return the correct item");
        this.logger.log("Testing First() with an empty array");
        this.expectError(() => [].First(), "Error was not thrown");
        this.logger.log("Testing First() which does not find any items");
        this.expectError(() => [1, 2, 3].First(4), "Error was not thrown");
    }

    /**
        Tests the FirstOrDefault() method.
    **/
    test_FirstOrDefault() {
        this.logger.log("Testing FirstOrDefault() without expression");
        this.assert(() => [1, 2, 3, 4, 5].FirstOrDefault() === 1, "FirstOrDefault() does not return the correct item");
        this.logger.log("Testing FirstOrDefault() with simple object expression");
        this.assert(() => [1, 2, 3, 4, 5].FirstOrDefault(5) === 5, "FirstOrDefault() does not return the correct item");
        this.logger.log("Testing FirstOrDefault() with function expression");
        this.assert(() => [1, 2, 3, 4, 5].FirstOrDefault(item => item === 5) === 5, "FirstOrDefault() does not return the correct item");
        this.logger.log("Testing FirstOrDefault() with an empty array");
        this.assert(() => [].FirstOrDefault()==null, "Null was expected but not returned");
        this.logger.log("Testing FirstOrDefault() which does not find any items");
        this.assert(() => [1, 2, 3].FirstOrDefault(4)==null, "NULL was not returned");
    }

    /**
        Tests for Array forEach.
    **/
    test_ForEach() {
        this.logger.log("Testing ForEach()");
        var cnt = 0;
        [1, 2, 3, 4, 5, 6].ForEach(() => {
            cnt++;
        });
        this.assert(() => cnt === 6, "ForEach() was not triggered 6 times");
        this.logger.log("Testing forEach() whith stepping out on second item.");
        cnt = 0;
        [1, 2, 3, 4, 5, 6].ForEach((item) => {
            cnt++;
            if (item === 2) return false;
            return true;
        });
        this.assert(() => cnt === 2, "ForEach() was not triggered 2 times and then stopped. It was triggered " + cnt + " times");
    }

    /**
        Tests for single or default.
    **/
    test_SingleOrDefault() {
        this.logger.log("Testing SingleOrDefault() with function expression, found item");
        this.assert(() => 2 === [1, 2, 3, 4, 5, 6].SingleOrDefault((item) => {
            if (item === 2) {
                return true;
            }
            return false;
        }), "The result expected was 2");
        this.logger.log("Testing SingleOrDefault() with function expression, not found item");
        this.assert(() => null == [1, 3, 4, 5, 6].SingleOrDefault((item) => {
            if (item === 2) {
                return true;
            }
            return false;
        }), "The result expected was NULL");
        this.logger.log("Testing SingleOrDefault() with function expression, not found item and default value.");
        this.assert(() => 20 === [1, 3, 4, 5, 6].SingleOrDefault((item) => {
            if (item === 2) {
                return true;
            }
            return false;
        }, 20), "The result expected was 20");

        this.logger.log("Testing SingleOrDefault() with expression, found item");
        this.assert(() => 2 === [1, 2, 3, 4, 5, 6].SingleOrDefault(2), "The result expected was 2");

        this.logger.log("Testing SingleOrDefault() with expression, not found item");
        this.assert(() => null == [1, 3, 4, 5, 6].SingleOrDefault(7), "The result expected was NULL");

        this.logger.log("Testing SingleOrDefault() with expression, not found item and default value.");
        this.assert(() => 20 === [1, 3, 4, 5, 6].SingleOrDefault(20, 20), "The result expected was 20");

        this.logger.log("Testing SingleOrDefault() with function expression where more than one items matches");
        this.expectError(() => 2 === [1, 2, 3, 4, 5, 6].SingleOrDefault((item) => {
            if (item % 2 === 0) {
                return true;
            }
            return false;
        }), "The expected error was not thrown.");
    }

    /**
        Tests for single or default.
    **/
    test_Single() {
        this.logger.log("Testing Single() with function expression, found item");
        this.assert(() => 2 === [1, 2, 3, 4, 5, 6].Single((item) => {
            if (item === 2) {
                return true;
            }
            return false;
        }), "The result expected was 2");
        this.logger.log("Testing Single() with function expression where more than one items matches");
        this.expectError(() => 2 === [1, 2, 3, 4, 5, 6].Single((item) => {
            if (item % 2 === 0) {
                return true;
            }
            return false;
        }), "The expected error was not thrown.");
        this.logger.log("Testing Single() with function expression, not found item");
        this.expectError(() => null == [1, 3, 4, 5, 6].Single((item) => {
            if (item === 2) {
                return true;
            }
            return false;
        }), "Single() should not found any item, error expected.");
        this.logger.log("Testing Single() with expression, found item");
        this.assert(() => 2 === [1, 2, 3, 4, 5, 6].Single(2), "The result expected was 2");
        this.logger.log("Testing Single() with expression, not found item");
        this.expectError(() => null == [1, 3, 4, 5, 6].Single(2), "Single() should not found any item, error expected.");
    }

    /**
        Testing Sum() method.
    **/
    test_Sum() {
        this.logger.log("Testing Sum() without selector method");
        this.assert(() => [1, 2, 3, 4, 5].Sum() === 15, "15 was expected for sum method");

        this.logger.log("Testing Sum() with selector method");
        var sumBase = [1, 2, 3, 4, 5].Select(item => { return { item: item };});
        this.assert(() => sumBase.Sum(item => (<any>item).item) === 15, "15 was expected for sum method");
    }

    /**
        Tests for the select method.
    **/
    test_Select() {
        this.logger.log("Testing Select()");
        this.assert(() => {
            var result = [1, 2, 3, 4, 5].Select(i => { return { item: i }; });
            for (var i = 0; i < 5; i++) {
                const item = (<any>result[i]).item;
                const expected = i + 1;
                const res = expected === item;
                if (!res) {
                    return false;   
                }
            }
            return true;
        }, "Error on Select(), wrong items where selected");
    }
    
    /**
        Needed logger instance.
    **/
    logger: Logger;

    /**
        Constructor.
        @param Logger logger The logger which is used for output the 
    **/
    constructor(logger: Logger) {
        this.logger = logger;
    }

    /**
        Asserts the given method. If that fails, it throws an error.
    **/
    assert(val: () => boolean, msg: string) {
        if (val !== undefined && msg != undefined) {
            if (val() === false) {
                this.logger.error(msg);
            }
        }
    }

    /**
        Does an assertion which expect an error.
    **/
    expectError(errorMethod: () => void, msg: string) {
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
    }
}