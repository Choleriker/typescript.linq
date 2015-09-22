/**
    Extends the array prototype interface.
**/
interface Array<T> {
    
    // ReSharper disable InconsistentNaming
    
    /**
     * Returns the null based index of the first element which matches with the given expression function.
     * @param expr Function The expression function which is used for item matching.
     * @returns number The index of the item in the element list. If no item matches, -1 is returned.
     */
    IndexOf(expr: (item: T, index: number) => boolean): number;
    
    /**
     * Returns the null based index of the first element which matches with the given expression.
     * @param expr Function The expression function which is used for item matching.
     * @returns number The index of the item in the element list. If no item matches, -1 is returned.
     */
    IndexOf(expr: T): number;

    /**
        Iterates over the array and executes the given method with every item in the array. There is a difference between the C# implementation of ForEach:  when returning false from the method
        the for each iteration is stopped and the method is not executed for all items left. This helps ending the iteration on any place to avoid iterating over not needed items.
        @param Function fn The method which is executed for every item. The item is given in and the index of current touched item.
    **/
    ForEach(fn: (item: T, index: number) => any): boolean;
    
    /**
        Single or default returns the first item which matches the given expression. If no matching item was found, the method returns null.
        @param exp Function The expression function which is used for item matching.
        @param defaultValue object The default value which is given back when no item was found. If this parameter is not given, null is returned.
        @returns The first item which matches the expression function, otherwise null (or the defaultValue).
    **/
    SingleOrDefault(expr?: (item: T, index: number) => boolean, defaultValue?: T): T;
    
    /**
        Single or default returns the first item which matches the given expression. If no matching item was found, the method returns null.
        @param exp object The expression which is used for item matching.
        @param defaultValue object The default value which is given back when no item was found. If this parameter is not given, null is returned.
        @returns The first item which matches the expression, otherwise null (or the defaultValue).
    **/
    SingleOrDefault(matchExp: T, defaultValue?: T): T;

    /**
        Single or default returns the first item which matches the given expression. If no matching item was found, the method returns null.
        @param exp Function The expression function which is used for item matching.
        @param defaultValue object The default value which is given back when no item was found. If this parameter is not given, null is returned.
        @returns The first item which matches the expression function.
    **/
    Single(expr?: (item: T, index: number) => boolean): T;

    /**
        Single returns the first item which matches the given expression. If no matching item was found, an error is thrown.
        @param exp object The expression which is used for item matching.
        @returns The first item which matches the expression.
    **/
    Single(matchExp: T): T;

    /**
        Sums all elements.
        @param selector Function If this method is specified, the selector method is used to get the property which needs to get summed.
    **/
    Sum(selector?: (item: T, index: number) => number): number;

    /**
        Select() method implementation.
        @param selectFn Function Method which is used for build up the selected object.
    **/
    Select<TResult>(selectFn: (item: T, index: number) => TResult): TResult[];

    /**
        Selects the first element which matches the given expression method. If nothing matches or the array does not contain any item, the method throws an error.
        @param expr Function The function which is used for matching. The function needs to return true to let the system know that the current item matches.
        @returns The first matching item.
    **/
    First(expr?: (item: T, index: number) => boolean): T;

    /**
        Selects the first element which matches the given expression method. If nothing matches or the array does not contain any item, the method throws an error.
        @param expr Object The item which is used for matching.
        @returns The first matching item.
    **/
    First(expr: T): T;

    /**
        Selects the last element which matches the given expression method. If nothing matches or the array does not contain any item, the method throws an error.
        @param expr Function The function which is used for matching. The function needs to return true to let the system know that the current item matches.
        @returns The last matching item.
    **/
    Last(expr?: (item: T, index: number) => boolean): T;

    /**
        Selects the last element which matches the given expression method. If nothing matches or the array does not contain any item, the method throws an error.
        @param expr Object The item which is used for matching.
        @returns The last matching item.
    **/
    Last(expr: T): T;

    /**
        Returns an value whenever the array contains the element which returns true when used with expression method.
        @param expr Function The expression method which is used for matching.
        @returns True if in matching element was found, otherwise false.
    **/
    Contains(expr?: (item: T, index: number) => boolean): boolean;

    /**
        Returns an value whenever the array contains the given element.
        @param expr Object The item which is used for matching.
        @returns True if in matching element was found, otherwise false.
    **/
    Contains(expr: T): boolean;

    /**
        Returns an value whenever all array items are matching with the given expression method.
        @param expr Function The expression method which is used for matching.
        @returns True if in matching element was found, otherwise false.
    **/
    All(expr: (item: T, index: number) => boolean): boolean;

    /**
        Returns an value whenever all array items are matching the given element.
        @param expr Object The item which is used for matching.
        @returns True if in matching element was found, otherwise false.
    **/
    All(expr: T): boolean;

    /**
        Returns an value whenever one array items are matching with the given expression method.
        @param expr Function The expression method which is used for matching.
        @returns True if in matching element was found, otherwise false.
    **/
    Any(expr?: (item: T, index: number) => boolean): boolean;

    /**
        Returns an value whenever one array items are matching the given element.
        @param expr Object The item which is used for matching.
        @returns True if in matching element was found, otherwise false.
    **/
    Any(expr?: T): boolean;

    /**
        Selects the last element which matches the given expression method. If nothing matches or the array does not contain any item, the method returns the defaultValue (when specified) otherwise NULL.
        @param expr Function The function which is used for matching. The function needs to return true to let the system know that the current item matches.
        @param defaultValue object The default value which is given back when no item was found. If this parameter is not given, null is returned.
        @returns The last matching item.
    **/
    LastOrDefault(expr?: (item: T, index: number) => boolean, defaultValue?: T): T;

    /**
        Selects the last element which matches the given expression. If nothing matches or the array does not contain any item, the method returns the defaultValue (when specified) otherwise NULL.
        @param expr Object The item which is used for matching.
        @param defaultValue object The default value which is given back when no item was found. If this parameter is not given, null is returned.
        @returns The last matching item.
    **/
    LastOrDefault(expr: T, defaultValue?: T): T;
    
    /**
        Selects the first element which matches the given expression method. If nothing matches or the array does not contain any item, the method returns NULL or the specified defaultValue.
        @param expr Function The expression function which is used for item matching.
        @param defaultValue object The default value which is given back when no item was found. If this parameter is not given, null is returned.
        @returns The first item which matches the expression function or when nothing found the defaultValue (if specified) otherwise null.
    **/
    FirstOrDefault(expr?: T, defaultValue?: T): T;
    
    /**
        Selects the first element which matches the given expression method. If nothing matches or the array does not contain any item, the method returns NULL or the specified defaultValue.
        @param expr Function The expression function which is used for item matching.
        @param defaultValue object The default value which is given back when no item was found. If this parameter is not given, null is returned.
        @returns The first item which matches the expression function or when nothing found the defaultValue (if specified) otherwise null.
    **/
    FirstOrDefault(expr?: (item: T, index: number) => boolean, defaultValue?: T): T;

    /**
     *  Projects each element of a sequence to an array and flattens the resulting sequences into one sequence.
     * @param expr Function The method which flattens the item.
     * @returns {} The flattened array.
     */
    SelectMany<TResult>(expr: (item: T, index: number) => TResult[]): TResult[];

    /**
     * Returns the element at the given position. If there is no element, an error is thrown.
     * @param index Number The index where we want the element from.
     * @returns T The element at the given position.
     */
    ElementAt(index: number): T;

    /**
     * Returns the element at the given position. If there is no element, defaultValue is returned when specified, otherwise null.
     * @param index Number The index where we want the element from.
     * @param (defaulValue) Object The default value which is given back, rather than null.
     * @returns T The element at the given position.
     */
    ElementAtOrDefault(index: number, defaultValue?: T): T;

    /**
     * Casts does nothing rather than makes the compiler happy by transfering the array type.
     */
    Cast<TResult>(): TResult[];

    /**
     * Aggregates the current values with the given aggregate method.
     * If seed is undefined, the first entry of the current list is the first seeding value and will not enumerated, otherwise the aggregate method
     * starts with the first entry in the current list by using the value of seed as the first aggregate value.
     * @param func Function The aggregation method.
     * @param seed The seeding value.
     * @returns The aggregates values.
     */
    Aggregate<TResult>(func: (item1: TResult, item2: T) => T, seed?: TResult): TResult;

    /**
     * Returns all items which are occuring behind the index which is defined by itemsToSkip.
     * @param itemsToSkip Number The items which should not get returned.
     * @returns All items which have an index greater then the itemsToSkip parameter.
     */
    Skip(itemsToSkip: number): T[];

    /**
     * Returns all items until the given count of items is reached.
     * @param itemCount Number The items which should get returned.
     * @returns All items which are in the specified range.
     */
    Take(itemCount: number): T[];

    /**
     * Concats this with the given array. 
     * @param concatWith Array This items will be added after the initial array items.
     * @returns The concatinated array.
     */
    Concat(concatWith: T[]): T[];

    /**
     * Counts the items which are matching the given expression.
     * @param expr T The expression object for comparision.
     * @returns The number of items which are matching the expression.
     */
    Count(expr?: T): number;

    /**
     * Counts the items which are matching the given expression function.
     * @param expr Function The expression function which is used for matching.
     * @returns The count of items matching with the expression function.
     */
    Count(expr?: (item: T, index: number) => boolean): number;

    // ReSharper enable InconsistentNaming
}