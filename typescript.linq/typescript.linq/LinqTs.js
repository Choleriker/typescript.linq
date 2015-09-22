/// <reference path="linqts.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
    Custom error which implements exception which are thrown by the TsLinq system.
**/
var LinqError = (function (_super) {
    __extends(LinqError, _super);
    /**
        Constructor.
        @param String message The message which is given by the error.
    **/
    function LinqError(message) {
        _super.call(this, message);
    }
    return LinqError;
})(Error);
// ReSharper disable Lambda
// ReSharper disable VariableCanBeMadeConst
Array.prototype.Concat = function (concatWith) {
    var back = [];
    this.forEach(function (i) { return back.push(i); });
    concatWith.forEach(function (i) { return back.push(i); });
    return back;
};
Array.prototype.Skip = function (itemsToSkip) {
    var l = this.length;
    if (itemsToSkip >= l) {
        return [];
    }
    var resultSet = [];
    for (var i = itemsToSkip; i < l; i++) {
        resultSet.push(this[i]);
    }
    return resultSet;
};
Array.prototype.Take = function (itemCount) {
    var back = [];
    var l = this.length < itemCount ? this.length : itemCount;
    for (var i = 0; i < l; i++) {
        back.push(this[i]);
    }
    return back;
};
Array.prototype.Aggregate = function (func, seed) {
    if (!this.Any())
        return null;
    var aggregate = seed || this.First();
    var startSequence = seed === undefined ? this.Skip(1) : this;
    startSequence.ForEach(function (item) {
        aggregate = func(aggregate, item);
    });
    return aggregate;
};
Array.prototype.Cast = function () {
    return this;
};
Array.prototype.ElementAt = function (index) {
    if (index > this.length - 1) {
        throw new LinqError("The index " + index + " is not in the allowed range.");
    }
    return this[index];
};
Array.prototype.ElementAtOrDefault = function (index, defaultValue) {
    var def = defaultValue === undefined ? null : defaultValue;
    if (index > this.length - 1) {
        return def;
    }
    var val = this[index];
    if (val === undefined) {
        return def;
    }
    return val;
};
Array.prototype.IndexOf = function (expr) {
    var foundIndex = -1;
    var fn = function (item, index) {
        if (typeof expr === "function") {
            if (expr(item, index)) {
                foundIndex = index;
                return false;
            }
        }
        else {
            if (item === expr) {
                foundIndex = index;
                return false;
            }
        }
        return true;
    };
    this.ForEach(fn);
    return foundIndex;
};
Array.prototype.SelectMany = function (expr) {
    var back = [];
    this.ForEach(function (item, index) {
        var add = expr(item, index);
        add.ForEach(function (i) {
            back.push(i);
        });
    });
    return back;
};
Array.prototype.All = function (expr) {
    var l = this.length;
    if (l === 0) {
        throw new LinqError('All() failed: collection contains no element');
    }
    if (expr == undefined) {
        throw new LinqError('All() failed: no expression was defined');
    }
    var fn = typeof expr == "function" ? expr : function (item) { return item === expr; };
    for (var i = l - 1; i >= 0; i--) {
        var item = this[i];
        if (!fn(item, i)) {
            return false;
        }
    }
    return true;
};
Array.prototype.Any = function (expr) {
    var l = this.length;
    if (l === 0) {
        return false;
    }
    if (expr == undefined) {
        return this.length > 0;
    }
    var fn = typeof expr == 'function' ? expr : function (item, index) { return item === expr; };
    for (var i = l - 1; i >= 0; i--) {
        var item = this[i];
        if (fn(item, i)) {
            return true;
        }
    }
    return false;
};
Array.prototype.Last = function (expr) {
    var l = this.length;
    if (l === 0) {
        throw new LinqError('Last() failed: collection contains no element');
    }
    if (expr == undefined) {
        return this[this.length - 1];
    }
    var fn = typeof expr == 'function' ? expr : function (item) { return item === expr; };
    for (var i = l - 1; i >= 0; i--) {
        var item = this[i];
        if (fn(item, i))
            return item;
    }
    throw new LinqError('Last() does not fit any element which fits your expression');
};
Array.prototype.Contains = function (expr) {
    var l = this.length;
    if (expr == undefined) {
        throw new LinqError('Contains() needs to get called with an valid function or item.');
    }
    if (l === 0) {
        return false;
    }
    var fn = typeof expr == 'function' ? expr : function (item) { return item === expr; };
    for (var i = l - 1; i >= 0; i--) {
        var item = this[i];
        if (fn(item, i))
            return true;
    }
    return false;
};
Array.prototype.LastOrDefault = function (expr, defaultValue) {
    var l = this.length;
    var def = defaultValue == undefined ? null : defaultValue;
    if (l === 0) {
        return def;
    }
    if (expr == undefined) {
        return this[this.length - 1];
    }
    var fn = typeof expr == 'function' ? expr : function (item) { return item === expr; };
    for (var i = l - 1; i >= 0; i--) {
        var item = this[i];
        if (fn(item, i))
            return item;
    }
    return def;
};
Array.prototype.FirstOrDefault = function (expr, defaultValue) {
    var def = defaultValue == undefined ? null : defaultValue;
    var l = this.length;
    if (l == 0) {
        return def;
    }
    if (expr == undefined) {
        return this[0];
    }
    var fn = typeof expr == 'function' ? expr : function (item) { return item === expr; };
    for (var i = 0; i < l; i++) {
        var item = this[i];
        if (fn(item, i))
            return item;
    }
    return def;
};
Array.prototype.First = function (expr) {
    var l = this.length;
    if (l === 0) {
        throw new LinqError('Collection contains no element');
    }
    if (expr == undefined) {
        return this[0];
    }
    var fn = typeof expr == 'function' ? expr : function (item, index) { return item === expr; };
    for (var i = 0; i < l; i++) {
        var item = this[i];
        if (fn(item, i))
            return item;
    }
    throw new LinqError('first() does not fit any element which fits your expression');
};
Array.prototype.Select = function (selectFn) {
    var back = [];
    this.ForEach(function (item, index) {
        back.push(selectFn(item, index));
    });
    return back;
};
Array.prototype.Sum = function (selector) {
    selector = (selector == undefined ? function (item) { return item; } : selector);
    var summed = 0;
    this.ForEach(function (item, index) { return summed += selector(item, index); });
    return summed;
};
Array.prototype.ForEach = function (fn) {
    if (fn === undefined) {
        throw new LinqError('ForEach() failed because of empty method');
    }
    if (typeof fn !== 'function') {
        throw new LinqError('ForEach() failed because given parameter is not a method.');
    }
    var l = this.length;
    for (var i = 0; i < l; i++) {
        var item = this[i];
        var returnValue = fn(item, i);
        if (returnValue === false) {
            return false;
        }
    }
    return true;
};
Array.prototype.Single = function (expr) {
    var result = this.SingleOrDefault(expr, undefined);
    if (result == undefined) {
        throw new LinqError('Single() has not found any elements');
    }
    return result;
};
Array.prototype.SingleOrDefault = function (expr, defaultValue) {
    defaultValue = defaultValue || null;
    var fn = typeof expr == 'function' ? expr : function (item) { return item === expr; };
    var l = this.length;
    if (l === 0) {
        return defaultValue;
    }
    if (expr == undefined) {
        if (this.length > 1) {
            throw new LinqError('SingleOrDefault() or Single() without expression failed because there are more than one element in the collection.');
        }
        return this[0];
    }
    var foundItem = null;
    for (var i = 0; i < l; i++) {
        var item = this[i];
        if (fn(item, i)) {
            if (foundItem != null) {
                throw new LinqError('SingleOrDefault() or Single() failed because the expression matches more than one element');
            }
            foundItem = item;
        }
    }
    if (foundItem == null) {
        return defaultValue;
    }
    return foundItem;
};
//# sourceMappingURL=LinqTs.js.map