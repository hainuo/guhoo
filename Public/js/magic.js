//依赖包
// Copyright (c) 2009-2012, Baidu Inc. All rights reserved.
//
// Licensed under the BSD License
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//      http://tangram.baidu.com/license.html
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


















var T, baidu = T = baidu || function(q, c) { return baidu.dom ? baidu.dom(q, c) : null; };

baidu.version = '2.0.2.5';
baidu.guid = "$BAIDU$";
baidu.key = "tangram_guid";

// Tangram 可能被放在闭包中
// 一些页面级别唯一的属性，需要挂载在 window[baidu.guid]上

var _ = window[ baidu.guid ] = window[ baidu.guid ] || {};
(_.versions || (_.versions = [])).push(baidu.version);

// 20120709 mz 添加参数类型检查器，对参数做类型检测保护
baidu.check = baidu.check || function(){};



 
baidu.lang = baidu.lang || {};













baidu.forEach = function( enumerable, iterator, context ) {
    var i, n, t;

    if ( typeof iterator == "function" && enumerable) {

        // Array or ArrayLike or NodeList or String or ArrayBuffer
        n = typeof enumerable.length == "number" ? enumerable.length : enumerable.byteLength;
        if ( typeof n == "number" ) {

            // 20121030 function.length
            //safari5.1.7 can not use typeof to check nodeList - linlingyu
            if (Object.prototype.toString.call(enumerable) === "[object Function]") {
                return enumerable;
            }

            for ( i=0; i<n; i++ ) {
                
                t = enumerable[ i ]
                t === undefined && (t = enumerable.charAt && enumerable.charAt( i ));

                // 被循环执行的函数，默认会传入三个参数(array[i], i, array)
                iterator.call( context || null, t, i, enumerable );
            }
        
        // enumerable is number
        } else if (typeof enumerable == "number") {

            for (i=0; i<enumerable; i++) {
                iterator.call( context || null, i, i, i);
            }
        
        // enumerable is json
        } else if (typeof enumerable == "object") {

            for (i in enumerable) {
                if ( enumerable.hasOwnProperty(i) ) {
                    iterator.call( context || null, enumerable[ i ], i, enumerable );
                }
            }
        }
    }

    return enumerable;
};




baidu.type = (function() {
    var objectType = {},
        nodeType = [, "HTMLElement", "Attribute", "Text", , , , , "Comment", "Document", , "DocumentFragment", ],
        str = "Array Boolean Date Error Function Number RegExp String",
        retryType = {'object': 1, 'function': '1'},//解决safari对于childNodes算为function的问题
        toString = objectType.toString;

    // 给 objectType 集合赋值，建立映射
    baidu.forEach(str.split(" "), function(name) {
        objectType[ "[object " + name + "]" ] = name.toLowerCase();

        baidu[ "is" + name ] = function ( unknow ) {
            return baidu.type(unknow) == name.toLowerCase();
        }
    });

    // 方法主体
    return function ( unknow ) {
        var s = typeof unknow;
        return !retryType[s] ? s
            : unknow == null ? "null"
            : unknow._type_
                || objectType[ toString.call( unknow ) ]
                || nodeType[ unknow.nodeType ]
                || ( unknow == unknow.window ? "Window" : "" )
                || "object";
    };
})();

// extend
baidu.isDate = function( unknow ) {
    return baidu.type(unknow) == "date" && unknow.toString() != 'Invalid Date' && !isNaN(unknow);
};

baidu.isElement = function( unknow ) {
    return baidu.type(unknow) == "HTMLElement";
};

// 20120818 mz 检查对象是否可被枚举，对象可以是：Array NodeList HTMLCollection $DOM
baidu.isEnumerable = function( unknow ){
    return unknow != null
        && (typeof unknow == "object" || ~Object.prototype.toString.call( unknow ).indexOf( "NodeList" ))
    &&(typeof unknow.length == "number"
    || typeof unknow.byteLength == "number"     //ArrayBuffer
    || typeof unknow[0] != "undefined");
};
baidu.isNumber = function( unknow ) {
    return baidu.type(unknow) == "number" && isFinite( unknow );
};

// 20120903 mz 检查对象是否为一个简单对象 {}
baidu.isPlainObject = function(unknow) {
    var key,
        hasOwnProperty = Object.prototype.hasOwnProperty;

    if ( baidu.type(unknow) != "object" ) {
        return false;
    }

    //判断new fn()自定义对象的情况
    //constructor不是继承自原型链的
    //并且原型中有isPrototypeOf方法才是Object
    if ( unknow.constructor &&
        !hasOwnProperty.call(unknow, "constructor") &&
        !hasOwnProperty.call(unknow.constructor.prototype, "isPrototypeOf") ) {
        return false;
    }
    //判断有继承的情况
    //如果有一项是继承过来的，那么一定不是字面量Object
    //OwnProperty会首先被遍历，为了加速遍历过程，直接看最后一项
    for ( key in unknow ) {}
    return key === undefined || hasOwnProperty.call( unknow, key );
};

baidu.isObject = function( unknow ) {
    return typeof unknow === "function" || ( typeof unknow === "object" && unknow != null );
};





baidu.global = baidu.global || (function() {
    var me = baidu._global_ = window[ baidu.guid ],
        // 20121116 mz 在多个tangram同时加载时有互相覆写的风险
        global = me._ = me._ || {};

    return function( key, value, overwrite ) {
        if ( typeof value != "undefined" ) {
            overwrite || ( value = typeof global[ key ] == "undefined" ? value : global[ key ] );
            global[ key ] =  value;

        } else if (key && typeof global[ key ] == "undefined" ) {
            global[ key ] = {};
        }

        return global[ key ];
    }
})();












baidu.extend = function(depthClone, object) {
    var second, options, key, src, copy,
        i = 1,
        n = arguments.length,
        result = depthClone || {},
        copyIsArray, clone;
    
    baidu.isBoolean( depthClone ) && (i = 2) && (result = object || {});
    !baidu.isObject( result ) && (result = {});

    for (; i<n; i++) {
        options = arguments[i];
        if( baidu.isObject(options) ) {
            for( key in options ) {
                src = result[key];
                copy = options[key];
                // Prevent never-ending loop
                if ( src === copy ) {
                    continue;
                }
                
                if(baidu.isBoolean(depthClone) && depthClone && copy
                    && (baidu.isPlainObject(copy) || (copyIsArray = baidu.isArray(copy)))){
                        if(copyIsArray){
                            copyIsArray = false;
                            clone = src && baidu.isArray(src) ? src : [];
                        }else{
                            clone = src && baidu.isPlainObject(src) ? src : {};
                        }
                        result[key] = baidu.extend(depthClone, clone, copy);
                }else if(copy !== undefined){
                    result[key] = copy;
                }
            }
        }
    }
    return result;
};





baidu.browser = baidu.browser || function(){
    var ua = navigator.userAgent;
    
    var result = {
        isStrict : document.compatMode == "CSS1Compat"
        ,isGecko : /gecko/i.test(ua) && !/like gecko/i.test(ua)
        ,isWebkit: /webkit/i.test(ua)
    };

    try{/(\d+\.\d+)/.test(external.max_version) && (result.maxthon = + RegExp['\x241'])} catch (e){};

    // 蛋疼 你懂的
    switch (true) {
        case /msie (\d+\.\d+)/i.test(ua) :
            result.ie = document.documentMode || + RegExp['\x241'];
            break;
        case /chrome\/(\d+\.\d+)/i.test(ua) :
            result.chrome = + RegExp['\x241'];
            break;
        case /(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(ua) && !/chrome/i.test(ua) :
            result.safari = + (RegExp['\x241'] || RegExp['\x242']);
            break;
        case /firefox\/(\d+\.\d+)/i.test(ua) : 
            result.firefox = + RegExp['\x241'];
            break;
        
        case /opera(?:\/| )(\d+(?:\.\d+)?)(.+?(version\/(\d+(?:\.\d+)?)))?/i.test(ua) :
            result.opera = + ( RegExp["\x244"] || RegExp["\x241"] );
            break;
    }
           
    baidu.extend(baidu, result);

    return result;
}();




baidu.id = function() {
    var maps = baidu.global("_maps_id")
        ,key = baidu.key;

    // 2012.12.21 与老版本同步
    window[ baidu.guid ]._counter = window[ baidu.guid ]._counter || 1;

    return function( object, command ) {
        var e
            ,str_1= baidu.isString( object )
            ,obj_1= baidu.isObject( object )
            ,id = obj_1 ? object[ key ] : str_1 ? object : "";

        // 第二个参数为 String
        if ( baidu.isString( command ) ) {
            switch ( command ) {
            case "get" :
                return obj_1 ? id : maps[id];
//            break;
            case "remove" :
            case "delete" :
                if ( e = maps[id] ) {
                    // 20120827 mz IE低版本(ie6,7)给 element[key] 赋值时会写入DOM树，因此在移除的时候需要使用remove
                    if (baidu.isElement(e) && baidu.browser.ie < 8) {
                        e.removeAttribute(key);
                    } else {
                        delete e[ key ];
                    }
                    delete maps[ id ];
                }
                return id;
//            break;
            default :
                if ( str_1 ) {
                    (e = maps[ id ]) && delete maps[ id ];
                    e && ( maps[ e[ key ] = command ] = e );
                } else if ( obj_1 ) {
                    id && delete maps[ id ];
                    maps[ object[ key ] = command ] = object;
                }
                return command;
            }
        }

        // 第一个参数不为空
        if ( obj_1 ) {
            !id && (maps[ object[ key ] = id = baidu.id() ] = object);
            return id;
        } else if ( str_1 ) {
            return maps[ object ];
        }

        return "TANGRAM_" + baidu._global_._counter ++;
    };
}();

//TODO: mz 20120827 在低版本IE做delete操作时直接 delete e[key] 可能出错，这里需要重新评估，重写





baidu.base = baidu.base || {blank: function(){}};







baidu.base.Class = (function() {
    var instances = (baidu._global_ = window[baidu.guid])._instances;
    instances || (instances = baidu._global_._instances = {});

    // constructor
    return function() {
        this.guid = baidu.id();
        this._decontrol_ || (instances[this.guid] = this);
    }
})();


baidu.extend(baidu.base.Class.prototype, {
    
    toString: baidu.base.Class.prototype.toString = function(){
        return "[object " + ( this._type_ || "Object" ) + "]";
    }

    
    ,dispose: function() {
        // 2013.1.11 暂时关闭此事件的派发
        // if (this.fire("ondispose")) {
            // decontrol
            delete baidu._global_._instances[this.guid];

            if (this._listeners_) {
                for (var item in this._listeners_) {
                    this._listeners_[item].length = 0;
                    delete this._listeners_[item];
                }
            }

            for (var pro in this) {
                if ( !baidu.isFunction(this[pro]) ) delete this[pro];
                else this[pro] = baidu.base.blank;
            }

            this.disposed = true;   //20100716
        // }
    }

    
    ,fire: function(event, options) {
        baidu.isString(event) && (event = new baidu.base.Event(event));

        var i, n, list, item
            , t=this._listeners_
            , type=event.type
            // 20121023 mz 修正事件派发多参数时，参数的正确性验证
            , argu=[event].concat( Array.prototype.slice.call(arguments, 1) );
        !t && (t = this._listeners_ = {});

        // 20100603 添加本方法的第二个参数，将 options extend到event中去传递
        baidu.extend(event, options || {});

        event.target = event.target || this;
        event.currentTarget = this;

        type.indexOf("on") && (type = "on" + type);

        baidu.isFunction(this[type]) && this[type].apply(this, argu);
        (i=this._options) && baidu.isFunction(i[type]) && i[type].apply(this, argu);

        if (baidu.isArray(list = t[type])) {
            for ( i=list.length-1; i>-1; i-- ) {
                item = list[i];
                item && item.handler.apply( this, argu );
                item && item.once && list.splice( i, 1 );
            }
        }

        return event.returnValue;
    }

    
    ,on: function(type, handler, once) {
        if (!baidu.isFunction(handler)) {
            return this;
        }

        var list, t = this._listeners_;
        !t && (t = this._listeners_ = {});

        type.indexOf("on") && (type = "on" + type);

        !baidu.isArray(list = t[type]) && (list = t[type] = []);
        t[type].unshift( {handler: handler, once: !!once} );

        return this;
    }
    // 20120928 mz 取消on()的指定key

    ,once: function(type, handler) {
        return this.on(type, handler, true);
    }
    ,one: function(type, handler) {
        return this.on(type, handler, true);
    }

    
    ,off: function(type, handler) {
        var i, list,
            t = this._listeners_;
        if (!t) return this;

        // remove all event listener
        if (typeof type == "undefined") {
            for (i in t) {
                delete t[i];
            }
            return this;
        }

        type.indexOf("on") && (type = "on" + type);

        // 移除某类事件监听
        if (typeof handler == "undefined") {
            delete t[type];
        } else if (list = t[type]) {

            for (i = list.length - 1; i >= 0; i--) {
                list[i].handler === handler && list.splice(i, 1);
            }
        }

        return this;
    }
});
baidu.base.Class.prototype.addEventListener = 
baidu.base.Class.prototype.on;
baidu.base.Class.prototype.removeEventListener =
baidu.base.Class.prototype.un =
baidu.base.Class.prototype.off;
baidu.base.Class.prototype.dispatchEvent =
baidu.base.Class.prototype.fire;



window["baiduInstance"] = function(guid) {
    return window[baidu.guid]._instances[ guid ];
}




baidu.base.Event = function(type, target) {
    this.type = type;
    this.returnValue = true;
    this.target = target || null;
    this.currentTarget = null;
    this.preventDefault = function() {this.returnValue = false;};
};


//  2011.11.23  meizz   添加 baiduInstance 这个全局方法，可以快速地通过guid得到实例对象
//  2011.11.22  meizz   废除创建类时指定guid的模式，guid只作为只读属性


/// support magic - Tangram 1.x Code Start




baidu.lang.Class = baidu.base.Class;
//  2011.11.23  meizz   添加 baiduInstance 这个全局方法，可以快速地通过guid得到实例对象
//  2011.11.22  meizz   废除创建类时指定guid的模式，guid只作为只读属性
//  2011.11.22  meizz   废除 baidu.lang._instances 模块，由统一的global机制完成；


/// support magic - Tangram 1.x Code End

/// support magic - Tangram 1.x Code Start


baidu.lang.Event = baidu.base.Event;





//  2011.12.19  meizz   很悲剧，第三个参数 key 还需要支持一段时间，以兼容老版本脚本
//  2011.11.24  meizz   事件添加监听方法 addEventListener 移除第三个参数 key，添加返回值 handler
//  2011.11.23  meizz   事件handler的存储对象由json改成array，以保证注册函数的执行顺序
//  2011.11.22  meizz   将 removeEventListener 方法分拆到 baidu.lang.Class.removeEventListener 中，以节约主程序代码

/// support magic - Tangram 1.x Code End















baidu.createClass = function(constructor, type, options) {
    constructor = baidu.isFunction(constructor) ? constructor : function(){};
    options = typeof type == "object" ? type : options || {};

    // 创建新类的真构造器函数
    var fn = function(){
        var me = this;

        // 20101030 某类在添加该属性控制时，guid将不在全局instances里控制
        options.decontrolled && (me._decontrol_ = true);

        // 继承父类的构造器
        fn.superClass.apply(me, arguments);

        // 全局配置
        for (var i in fn.options) me[i] = fn.options[i];

        constructor.apply(me, arguments);

        for (var i=0, reg=fn._reg_; reg && i<reg.length; i++) {
            reg[i].apply(me, arguments);
        }
    };

    baidu.extend(fn, {
        superClass: options.superClass || baidu.base.Class

        ,inherits: function(superClass){
            if (typeof superClass != "function") return fn;

            var C = function(){};
            C.prototype = (fn.superClass = superClass).prototype;

            // 继承父类的原型（prototype)链
            var fp = fn.prototype = new C();
            // 继承传参进来的构造器的 prototype 不会丢
            baidu.extend(fn.prototype, constructor.prototype);
            // 修正这种继承方式带来的 constructor 混乱的问题
            fp.constructor = constructor;

            return fn;
        }

        ,register: function(hook, methods) {
            (fn._reg_ || (fn._reg_ = [])).push( hook );
            methods && baidu.extend(fn.prototype, methods);
            return fn;
        }
        
        ,extend: function(json){baidu.extend(fn.prototype, json); return fn;}
    });

    type = baidu.isString(type) ? type : options.className || options.type;
    baidu.isString(type) && (constructor.prototype._type_ = type);
    baidu.isFunction(fn.superClass) && fn.inherits(fn.superClass);

    return fn;
};

// 20111221 meizz   修改插件函数的存放地，重新放回类构造器静态属性上
// 20121105 meizz   给类添加了几个静态属性方法：.options .superClass .inherits() .extend() .register()


/// support magic - Tangram 1.x Code Start






baidu.lang.createClass = baidu.createClass;

// 20111221 meizz   修改插件函数的存放地，重新放回类构造器静态属性上

/// support magic - Tangram 1.x Code End










baidu.merge = function(first, second) {
    var i = first.length,
        j = 0;

    if ( typeof second.length === "number" ) {
        for ( var l = second.length; j < l; j++ ) {
            first[ i++ ] = second[ j ];
        }

    } else {
        while ( second[j] !== undefined ) {
            first[ i++ ] = second[ j++ ];
        }
    }

    first.length = i;

    return first;
};




















baidu.createChain = function(chainName, fn, constructor) {
    // 创建一个内部类名
    var className = chainName=="dom"?"$DOM":"$"+chainName.charAt(0).toUpperCase()+chainName.substr(1),
        slice = Array.prototype.slice,
        chain = baidu[chainName];
    if(chain){return chain}
    // 构建链头执行方法
    chain = baidu[chainName] = fn || function(object) {
        return baidu.extend(object, baidu[chainName].fn);
    };

    // 扩展 .extend 静态方法，通过本方法给链头对象添加原型方法
    chain.extend = function(extended) {
        var method;

        // 直接构建静态接口方法，如 baidu.array.each() 指向到 baidu.array().each()
        for (method in extended) {
            (function(method){//解决通过静态方法调用的时候，调用的总是最后一个的问题。
                // 20121128 这个if判断是防止console按鸭子判断规则将本方法识别成数组
                if (method != "splice") {
                    chain[method] = function() {
                        var id = arguments[0];

                        // 在新版接口中，ID选择器必须用 # 开头
                        chainName=="dom" && baidu.type(id)=="string" && (id = "#"+ id);

                        var object = chain(id);
                        var result = object[method].apply(object, slice.call(arguments, 1));

                        // 老版接口返回实体对象 getFirst
                        return baidu.type(result) == "$DOM" ? result.get(0) : result;
                    }
                }
            })(method);
        }
        return baidu.extend(baidu[chainName].fn, extended);
    };

    // 创建 链头对象 构造器
    baidu[chainName][className] = baidu[chainName][className] || constructor || function() {};

    // 给 链头对象 原型链做一个短名映射
    chain.fn = baidu[chainName][className].prototype;

    return chain;
};


baidu.overwrite = function(Class, list, fn) {
    for (var i = list.length - 1; i > -1; i--) {
        Class.prototype[list[i]] = fn(list[i]);
    }

    return Class;
};





baidu.createChain("array", function(array){
    var pro = baidu.array.$Array.prototype
        ,ap = Array.prototype
        ,key;

    baidu.type( array ) != "array" && ( array = [] );

    for ( key in pro ) {
        //ap[key] || (array[key] = pro[key]);
        array[key] = pro[key];
    }

    return array;
});

// 对系统方法新产生的 array 对象注入自定义方法，支持完美的链式语法
baidu.overwrite(baidu.array.$Array, "concat slice".split(" "), function(key) {
    return function() {
        return baidu.array( Array.prototype[key].apply(this, arguments) );
    }
});







baidu.array.extend({
    unique : function (fn) {
        var len = this.length,
            result = this.slice(0),
            i, datum;
            
        if ('function' != typeof fn) {
            fn = function (item1, item2) {
                return item1 === item2;
            };
        }
        
        // 从后往前双重循环比较
        // 如果两个元素相同，删除后一个
        while (--len > 0) {
            datum = result[len];
            i = len;
            while (i--) {
                if (fn(datum, result[i])) {
                    result.splice(len, 1);
                    break;
                }
            }
        }

        len = this.length = result.length;
        for ( i=0; i<len; i++ ) {
            this[ i ] = result[ i ];
        }

        return this;
    }
});




baidu.query = baidu.query || function(){
    var rId = /^(\w*)#([\w\-\$]+)$/
       ,rId0= /^#([\w\-\$]+)$/
       ,rTag = /^\w+$/
       ,rClass = /^(\w*)\.([\w\-\$]+)$/
       ,rComboClass = /^(\.[\w\-\$]+)+$/
       ,rDivider = /\s*,\s*/
       ,rSpace = /\s+/g
       ,slice = Array.prototype.slice;

    // selector: #id, .className, tagName, *
    function query(selector, context) {
        var t, x, id, dom, tagName, className, arr, list, array = [];

        // tag#id
        if (rId.test(selector)) {
            id = RegExp.$2;
            tagName = RegExp.$1 || "*";

            // 本段代码效率很差，不过极少流程会走到这段
            baidu.forEach(context.getElementsByTagName(tagName), function(dom) {
                dom.id == id && array.push(dom);
            });

        // tagName or *
        } else if (rTag.test(selector) || selector == "*") {
            baidu.merge(array, context.getElementsByTagName(selector));

        // .className
        } else if (rClass.test(selector)) {
            arr = [];
            tagName = RegExp.$1;
            className = RegExp.$2;
            t = " " + className + " ";
            // bug: className: .a.b

            if (context.getElementsByClassName) {
                arr = context.getElementsByClassName(className);
            } else {
                baidu.forEach(context.getElementsByTagName("*"), function(dom) {
                    dom.className && ~(" " + dom.className + " ").indexOf(t) && (arr.push(dom));
                });
            }

            if (tagName && (tagName = tagName.toUpperCase())) {
                baidu.forEach(arr, function(dom) {
                    dom.tagName.toUpperCase() === tagName && array.push(dom);
                });
            } else {
                baidu.merge(array, arr);
            }
        
        // IE 6 7 8 里组合样式名(.a.b)
        } else if (rComboClass.test(selector)) {
            list = selector.substr(1).split(".");

            baidu.forEach(context.getElementsByTagName("*"), function(dom) {
                if (dom.className) {
                    t = " " + dom.className + " ";
                    x = true;

                    baidu.forEach(list, function(item){
                        ~t.indexOf(" "+ item +" ") || (x = false);
                    });

                    x && array.push(dom);
                }
            });
        }

        return array;
    }

    // selector 还可以是上述四种情况的组合，以空格分隔
    // @return ArrayLike
    function queryCombo(selector, context) {
        var a, s = selector, id = "__tangram__", array = [];

        // 在 #id 且没有 context 时取 getSingle，其它时 getAll
        if (!context && rId0.test(s) && (a=document.getElementById(s.substr(1)))) {
            return [a];
        }

        context = context || document;

        // 用 querySelectorAll 时若取 #id 这种唯一值时会多选
        if (context.querySelectorAll) {
            // 在使用 querySelectorAll 时，若 context 无id将貌似 document 而出错
            if (context.nodeType == 1 && !context.id) {
                context.id = id;
                a = context.querySelectorAll("#" + id + " " + s);
                context.id = "";
            } else {
                a = context.querySelectorAll(s);
            }
            return a;
        } else {
            if (!~s.indexOf(" ")) {
                return query(s, context);
            }

            baidu.forEach(query(s.substr(0, s.indexOf(" ")), context), function(dom) { // 递归
                baidu.merge(array, queryCombo(s.substr(s.indexOf(" ") + 1), dom));
            });
        }

        return array;
    }

    return function(selector, context, results) {
        if (!selector || typeof selector != "string") {
            return results || [];
        }

        var arr = [];
        selector = selector.replace(rSpace, " ");
        results && baidu.merge(arr, results) && (results.length = 0);

        baidu.forEach(selector.indexOf(",") > 0 ? selector.split(rDivider) : [selector], function(item) {
            baidu.merge(arr, queryCombo(item, context));
        });

        return baidu.merge(results || [], baidu.array(arr).unique());
    };
}();















baidu.createChain("dom",

// method function


function(selector, context) {
    var e, me = new baidu.dom.$DOM(context);

    // Handle $(""), $(null), or $(undefined)
    if (!selector) {
        return me;
    }

    // Handle $($DOM)
    if (selector._type_ == "$DOM") {
        return selector;

    // Handle $(DOMElement)
    } else if (selector.nodeType || selector == selector.window) {
        me[0] = selector;
        me.length = 1;
        return me;

    // Handle $(Array) or $(Collection) or $(NodeList)
    } else if (selector.length && me.toString.call(selector) != "[object String]") {
        return baidu.merge(me, selector);

    } else if (typeof selector == "string") {
        // HTMLString
        if (selector.charAt(0) == "<" && selector.charAt(selector.length - 1) == ">" && selector.length > 2) {
            // Match a standalone tag
            var rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
                doc = context && context._type_ === '$DOM' ? context[0] : context,
                ret = rsingleTag.exec(selector);
            doc = doc && doc.nodeType ? doc.ownerDocument || doc : document;
            ret = ret ? [doc.createElement(ret[1])] : (baidu.dom.createElements ? baidu.dom.createElements( selector ) : []);
            baidu.merge( me, ret);
        // baidu.query
        } else {
            baidu.query(selector, context, me);
        }
    
    // document.ready
    } else if (typeof selector == "function") {
        return me.ready ? me.ready(selector) : me;
    }

    return me;
},

// constructor
function(context) {
    this.length = 0;
    this._type_ = "$DOM";
    this.context = context || document;
}

).extend({


    
    size: function() {
        return this.length;
    }

    // 2012.11.27 mz 拥有 .length 和 .splice() 方法，console.log() 就认为该对象是 ArrayLike
    ,splice : function(){}

    
    ,get: function(index) {

        if ( typeof index == "number" ) {
            return index < 0 ? this[this.length + index] : this[index];
        }

        return Array.prototype.slice.call(this, 0);
    }

    // 将 $DOM 转换成 Array(dom, dom, ...) 返回
    ,toArray: function(){
        return this.get();
    }

});







baidu.dom.extend({

    pushStack : function ( elems ) {
        var ret = baidu.dom();

        baidu.merge(ret, elems);

        ret.prevObject = this;
        ret.context = this.context;

        return ret;
    }
});

















baidu.dom.match = function(){
    var reg = /^[\w\#\-\$\.\*]+$/,

        // 使用这个临时的 div 作为CSS选择器过滤
        div = document.createElement("DIV");
        div.id = "__tangram__";

    return function( array, selector, context ){
        var root, results = baidu.array();

        switch ( baidu.type(selector) ) {
            // 取两个 TangramDom 的交集
            case "$DOM" :
                for (var x=array.length-1; x>-1; x--) {
                    for (var y=selector.length-1; y>-1; y--) {
                        array[x] === selector[y] && results.push(array[x]);
                    }
                }
                break;

            // 使用过滤器函数，函数返回值是 Array
            case "function" :
                baidu.forEach(array, function(item, index){
                    selector.call(item, index) && results.push(item);
                });
                break;
            
            case "HTMLElement" :
                baidu.forEach(array, function(item){
                    item == selector && results.push(item);
                });
                break;

            // CSS 选择器
            case "string" :
                var da = baidu.query(selector, context || document);
                baidu.forEach(array, function(item){
                    if ( root = getRoot(item) ) {
                        var t = root.nodeType == 1
                            // in DocumentFragment
                            ? baidu.query(selector, root)
                            : da;

                        for (var i=0, n=t.length; i<n; i++) {
                            if (t[i] === item) {
                                results.push(item);
                                break;
                            }
                        }
                    }
                });
                results = results.unique();
                break;

            default :
                results = baidu.array( array ).unique();
                break;
        }
        return results;

    };

    function getRoot(dom) {
        var result = [], i;

        while(dom = dom.parentNode) {
            dom.nodeType && result.push(dom);
        }

        for (var i=result.length - 1; i>-1; i--) {
            // 1. in DocumentFragment
            // 9. Document
            if (result[i].nodeType == 1 || result[i].nodeType == 9) {
                return result[i];
            }
        }
        return null;
    }
}();












baidu.dom.extend({
    filter : function (selector) {
        return this.pushStack( baidu.dom.match(this, selector) );
    }
});





















baidu.createChain("event",

    // method
    function(){
        var lastEvt = {};
        return function( event, json ){
            switch( baidu.type( event ) ){
                // event
                case "object":
                    return lastEvt.originalEvent === event ? 
                        lastEvt : lastEvt = new baidu.event.$Event( event );

                case "$Event":
                    return event;

                // event type
//                case "string" :
//                    var e = new baidu.event.$Event( event );
//                    if( typeof json == "object" ) 
//                        baidu.forEach( e, json );
//                    return e;
            }
        }
    }(),

    // constructor
    function( event ){
        var e, t, f;
        var me = this;

        this._type_ = "$Event";

        if( typeof event == "object" && event.type ){

            me.originalEvent = e = event;

            for( var name in e )
                if( typeof e[name] != "function" )
                    me[ name ] = e[ name ];

            if( e.extraData )
                baidu.extend( me, e.extraData );

            me.target = me.srcElement = e.srcElement || (
                ( t = e.target ) && ( t.nodeType == 3 ? t.parentNode : t )
            );

            me.relatedTarget = e.relatedTarget || (
                ( t = e.fromElement ) && ( t === me.target ? e.toElement : t )
            );

            me.keyCode = me.which = e.keyCode || e.which;

            // Add which for click: 1 === left; 2 === middle; 3 === right
            if( !me.which && e.button !== undefined )
                me.which = e.button & 1 ? 1 : ( e.button & 2 ? 3 : ( e.button & 4 ? 2 : 0 ) );

            var doc = document.documentElement, body = document.body;

            me.pageX = e.pageX || (
                e.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0)
            );

            me.pageY = e.pageY || (
                e.clientY + (doc && doc.scrollTop  || body && body.scrollTop  || 0) - (doc && doc.clientTop  || body && body.clientTop  || 0)
            );

            me.data;
        }

        // event.type
//        if( typeof event == "string" )
//            this.type = event;

        // event.timeStamp
        this.timeStamp = new Date().getTime();
    }

).extend({
    stopPropagation : function() {
        var e = this.originalEvent;
        e && ( e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true );
    },

    preventDefault : function() {
        var e = this.originalEvent;
        e && ( e.preventDefault ? e.preventDefault() : e.returnValue = false );
    }
});







baidu._util_ = baidu._util_ || {};


baidu._util_.eventBase = baidu._util_.eventBase || {};




void function( base, listener ){
    if( base.listener )return ;
    
    listener = base.listener = {};
    
    if( window.addEventListener )
        listener.add = function( target, name, fn ){
            target.addEventListener( name, fn, false );
        };
    else if( window.attachEvent )
        listener.add = function( target, name, fn ){
            target.attachEvent( "on" + name, fn );
        };
}( baidu._util_.eventBase );


void function( base, be ){
    if( base.queue )return ;

    var I = baidu.id;
    var queue = base.queue = {};
    var attaCache = queue.attaCache = baidu.global( "eventQueueCache" );
    var listener = base.listener;

    queue.get = function( target, type, bindType, attachElements ){
        var id = I( target ), c;

        if( !attaCache[id] )
            attaCache[id] = {};

        c = attaCache[id];

        if( type ){
            if( !c[type] && bindType ){
                this.setupCall( target, type, bindType, c[ type ] = [], attachElements );
            }
            return c[type] || [];
        }else return c;
    };

    queue.add = function( target, type, bindType, item, attachElements ){
        this.get( target, type, bindType, attachElements ).push( item );
    };

    queue.remove = function( target, type, fn ){
        var arr, c;
        if( type ){
            var arr = this.get( target, type );
            if( fn ){
                for(var i = arr.length - 1; i >= 0; i --)
                    if( arr[i].orig == fn )
                        arr.splice( i, 1 );
            }else{
                arr.length = 0;
            }
        }else{
            var c = this.get( target );
            for(var i in c)
                c[i].length = 0;
        }
    };
    
    queue.handlerList = function(target, fnAry){
        var handlerQueue = [];
        //对delegate进行处理，这里牺牲性能换取事件执行顺序
        for(var i = 0, item; item = fnAry[i]; i++){
            if(item.delegate
                && baidu.dom(item.delegate, target).size() < 1){
                continue;
            }
            handlerQueue.push(item);
        }
        return handlerQueue;
    }

    queue.call = function( target, type, fnAry, e ){
        if( fnAry ){
            if( !fnAry.length )
                return ;

            var args = [].slice.call( arguments, 1 ), one = [];
                args.unshift( e = baidu.event( e || type ) );          
                e.type = type;

            if( !e.currentTarget )
                e.currentTarget = target;

            if( !e.target )
                e.target = target;
                
            //这里加入判断处理delegate 过滤fnAry 类似jq的功能
            fnAry = queue.handlerList(target, fnAry);
            
            for( var i = 0, r, l = fnAry.length; i < l; i ++ )
                if(r = fnAry[i]){
                    r.pkg.apply( target, args );
                    if( r.one )
                        one.unshift( i );
                }

            if( one.length )
                for(var i = 0, l = one.length; i < l; i ++)
                    this.remove( target, type, fnAry[i].fn );
                
        }else{
            fnAry = this.get( target, type );
            this.call( target, type, fnAry, e );
        }
    };

    queue.setupCall = function(){
        var add = function( target, type, bindType, fnAry ){
            listener.add( target, bindType, function( e ){
                queue.call( target, type, fnAry, e );
            } );
        };
        return function( target, type, bindType, fnAry, attachElements ){
            if( !attachElements )
                add( target, type, bindType, fnAry );
            else{
                target = baidu.dom( attachElements, target );
                for(var i = 0, l = target.length; i < l; i ++)
                    add( target[i], type, bindType, fnAry );
            }
        };
    }();

}( baidu._util_.eventBase, baidu.event );


baidu._util_.cleanData = function(array){
    var tangId;
    for(var i = 0, ele; ele = array[i]; i++){
        tangId = baidu.id(ele, 'get');
        if(!tangId){continue;}
        baidu._util_.eventBase.queue.remove(ele);
        baidu.id(ele, 'remove');
    }
};




baidu.dom.extend({
    remove: function(selector, keepData){
        arguments.length > 0
            && baidu.check('^string(?:,boolean)?$', 'baidu.dom.remove');
        var array = selector ? this.filter(selector) : this;
        for(var i = 0, ele; ele = array[i]; i++){
           if(!keepData && ele.nodeType === 1){
               baidu._util_.cleanData(ele.getElementsByTagName('*'));
               baidu._util_.cleanData([ele]);
            }
            ele.parentNode && ele.parentNode.removeChild(ele);
        }
        return this;
    }
});

if(typeof magic != "function"){
    var magic = function(){
        // TODO: 
    };
}

magic.resourcePath = "";
magic.skinName = "default";
magic.version = "1.1.0.4";

/msie 6/i.test(navigator.userAgent) && 
document.execCommand("BackgroundImageCache", false, true);












baidu.base.inherits = function (subClass, superClass, type) {
    var key, proto, 
        selfProps = subClass.prototype, 
        clazz = new Function();
        
    clazz.prototype = superClass.prototype;
    proto = subClass.prototype = new clazz();

    for (key in selfProps) {
        proto[key] = selfProps[key];
    }
    subClass.prototype.constructor = subClass;
    subClass.superClass = superClass.prototype;

    // 类名标识，兼容Class的toString，基本没用
    typeof type == "string" && (proto._type_ = type);

    subClass.extend = function(json) {
        for (var i in json) proto[i] = json[i];
        return subClass;
    }
    
    return subClass;
};

//  2011.11.22  meizz   为类添加了一个静态方法extend()，方便代码书写


/// support magic - Tangram 1.x Code Start





baidu.lang.inherits = baidu.base.inherits;

//  2011.11.22  meizz   为类添加了一个静态方法extend()，方便代码书写
/// support magic - Tangram 1.x Code End







//baidu.lang.isString = function (source) {
//    return '[object String]' == Object.prototype.toString.call(source);
//};
baidu.lang.isString = baidu.isString;



magic.Base = function(){
    baidu.lang.Class.call(this);

    this._ids = {};
    this._eid = this.guid +"__";
}
baidu.lang.inherits(magic.Base, baidu.lang.Class, "magic.Base").extend(

{
    
    getElement : function(id) {
        return document.getElementById(this.$getId(id));
    },

    
    getElements: function(){
        var result = {};
        var _ids = this._ids;
        for(var key in _ids)
            result[key] = this.getElement(key);
        return result;
    },

    
    $getId : function(key) {
        key = baidu.lang.isString(key) ? key : "";
        // 2012-3-23: 使 _ids 存入所以可能被建立映射的 key
        return this._ids[key] || (this._ids[key] = this._eid + key);
    }

    
    ,$mappingDom : function(key, dom){
        if (baidu.lang.isString(dom)) {
            this._ids[key] = dom;
        } else if (dom && dom.nodeType) {
            dom.id ? this._ids[key] = dom.id : dom.id = this.$getId(key);
        }
        return this;
    }

    
    ,$dispose : function() {
        this.fire("ondispose") && baidu.lang.Class.prototype.dispose.call(this);
    }
});

//  20120110    meizz   简化eid去掉其中的__type部分；事件派发使用fire方法替换原来 dispatchEvent
//  20111129    meizz   实例化效率大比拼
//                      new ui.Base()           效率为 1
//                      new ui.control.Layer()  效率为 2
//                      new ui.Dialog()         效率为 3.5





magic.control = magic.control || {};










baidu.dom.extend({
    each : function (iterator) {
        baidu.check("function", "baidu.dom.each");
        var i, result,
            n = this.length;

        for (i=0; i<n; i++) {
            result = iterator.call( this[i], i, this[i], this );

            if ( result === false || result == "break" ) { break;}
        }

        return this;
    }
});




baidu._util_.access = function(tang, key, value, callback, pass){
    if(tang.size() <= 0){return tang;}
    switch(baidu.type(key)){
        case 'string': //高频
            if(value === undefined){
                return callback.call(tang, tang[0], key);
            }else{
                tang.each(function(index, item){
                    callback.call(tang, item, key,
                        (baidu.type(value) === 'function' ? value.call(item, index, callback.call(tang, item, key)) : value),
                        pass);
                });
            }
            break;
        case 'object':
            for(var i in key){
                baidu._util_.access(tang, i, key[i], callback, value);
            }
            break;
    }
    return tang;
};





baidu.dom.extend({
    getComputedStyle: function(key){
        if(!this[0].ownerDocument){return;}// document can not get style;
        var defaultView = this[0].ownerDocument.defaultView,
            computedStyle = defaultView && defaultView.getComputedStyle
                && defaultView.getComputedStyle(this[0], null),
            val = computedStyle ? (computedStyle.getPropertyValue(key) || computedStyle[key]) : '';
        return val || this[0].style[key];
    }
});



baidu.dom.extend({
    getCurrentStyle: function(){
        var css = document.documentElement.currentStyle ?
            function(key){return this[0].currentStyle ? this[0].currentStyle[key] : this[0].style[key];}
                : function(key){return this.getComputedStyle(key);}
        return function(key){
            return css.call(this, key);
        }
    }()
});








baidu.each = function( enumerable, iterator, context ) {
    var i, n, t, result;

    if ( typeof iterator == "function" && enumerable) {

        // Array or ArrayLike or NodeList or String or ArrayBuffer
        n = typeof enumerable.length == "number" ? enumerable.length : enumerable.byteLength;
        if ( typeof n == "number" ) {

            // 20121030 function.length
            //safari5.1.7 can not use typeof to check nodeList - linlingyu
            if (Object.prototype.toString.call(enumerable) === "[object Function]") {
                return enumerable;
            }

            for ( i=0; i<n; i++ ) {
                //enumerable[ i ] 有可能会是0
                t = enumerable[ i ];
                t === undefined && (t = enumerable.charAt && enumerable.charAt( i ));
                // 被循环执行的函数，默认会传入三个参数(i, array[i], array)
                result = iterator.call( context || t, i, t, enumerable );

                // 被循环执行的函数的返回值若为 false 和"break"时可以影响each方法的流程
                if ( result === false || result == "break" ) {break;}
            }
        
        // enumerable is number
        } else if (typeof enumerable == "number") {

            for (i=0; i<enumerable; i++) {
                result = iterator.call( context || i, i, i, i);
                if ( result === false || result == "break" ) { break;}
            }
        
        // enumerable is json
        } else if (typeof enumerable == "object") {

            for (i in enumerable) {
                if ( enumerable.hasOwnProperty(i) ) {
                    result = iterator.call( context || enumerable[ i ], i, enumerable[ i ], enumerable );

                    if ( result === false || result == "break" ) { break;}
                }
            }
        }
    }

    return enumerable;
};










baidu._util_.getWidthOrHeight = function(){
    var ret = {},
        cssShow = {position: 'absolute', visibility: 'hidden', display: 'block'},
        rdisplayswap = /^(none|table(?!-c[ea]).+)/;
    function swap(ele, options){
        var defaultVal = {};
        for(var i in options){
            defaultVal[i] = ele.style[i];
            ele.style[i] = options[i];
        }
        return defaultVal;
    }
    baidu.forEach(['Width', 'Height'], function(item){
        var cssExpand = {Width: ['Right', 'Left'], Height: ['Top', 'Bottom']}[item];
        ret['get' + item] = function(ele, extra){
            var tang = baidu.dom(ele),
                defaultValue = ele.offsetWidth === 0
                    && rdisplayswap.test(tang.getCurrentStyle('display'))
                    && (swap(ele, cssShow)),
                rect = ele['offset' + item] || parseInt(tang.getCurrentStyle(item.toLowerCase())) || 0,
                delString = 'padding|border';
            extra && baidu.forEach(extra.split('|'), function(val){
                if(!~delString.indexOf(val)){//if val is margin
                    rect += parseFloat(tang.getCurrentStyle(val + cssExpand[0])) || 0;
                    rect += parseFloat(tang.getCurrentStyle(val + cssExpand[1])) || 0;
                }else{//val is border or padding
                    delString = delString.replace(new RegExp('\\|?' + val + '\\|?'), '');
                }
            });
            delString && baidu.forEach(delString.split('|'), function(val){
                rect -= parseFloat(tang.getCurrentStyle(val + cssExpand[0] + (val === 'border' ? 'Width' : ''))) || 0;
                rect -= parseFloat(tang.getCurrentStyle(val + cssExpand[1] + (val === 'border' ? 'Width' : ''))) || 0;
            });
            defaultValue && swap(ele, defaultValue);
            return rect;
        }
    });
    //
    return function(ele, key, extra){
        return ret[key === 'width' ? 'getWidth' : 'getHeight'](ele, extra);
    }
}();



baidu._util_.support = baidu._util_.support || function(){
    var div = document.createElement('div'),
        baseSupport, a, input, select, opt;
    div.setAttribute('className', 't');
    div.innerHTML = ' <link/><table></table><a href="/a">a</a><input type="checkbox"/>';
    a = div.getElementsByTagName('A')[0];
    a.style.cssText = 'top:1px;float:left;opacity:.5';
    select = document.createElement('select');
    opt = select.appendChild(document.createElement('option'));
    input = div.getElementsByTagName('input')[0];
    input.checked = true;
    
    baseSupport = {
        dom: {
            div: div,
            a: a,
            select: select,
            opt: opt,
            input: input
        }
//        radioValue: only import by baidu._util.attr
//        hrefNormalized: only import by baidu._util.attr
//        style: only import by baidu._util.attr
//        optDisabled: only import by baidu.dom.val
//        checkOn: only import by baidu.dom.val
//        noCloneEvent: only import by baidu.dom.clone
//        noCloneChecked: only import by baidu.dom.clone
//        cssFloat: only import baidu.dom.styleFixer
//        htmlSerialize: only import baidu.dom.html
//        leadingWhitespace: only import baidu.dom.html
    };
    return baseSupport;
}();



baidu._util_.setPositiveNumber = function(){
    var core_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        rnumsplit = new RegExp('^(' + core_pnum + ')(.*)$', 'i');
    return function(ele, val, subtract){
        var mc = rnumsplit.exec(val);
        return mc ?
            Math.max(0, mc[1] - (subtract || 0)) + (mc[2] || 'px') : val;
    };
}();


baidu._util_.style = baidu.extend({
    set: function(ele, key, val){ele.style[key] = val;}
}, document.documentElement.currentStyle? {
    get: function(ele, key){
        var val = baidu.dom(ele).getCurrentStyle(key),
            defaultLeft;
        if(/^-?(?:\d*\.)?\d+(?!px)[^\d\s]+$/i.test(val)){
            defaultLeft = ele.style.left;
            ele.style.left = key === 'fontSize' ? '1em' : val;
            val = ele.style.pixelLeft + 'px';
            ele.style.left = defaultLeft;
        }
        return val;
    }
} : {
    get: function(ele, key){
        return baidu.dom(ele).getCurrentStyle(key);
    }
});

baidu._util_.cssHooks = function(){
    var alpha = /alpha\s*\(\s*opacity\s*=\s*([^)]*)/i,
        style = baidu._util_.style,
//        nonpx = /^-?(?:\d*\.)?\d+(?!px)[^\d\s]+$/i,
        anchor = baidu._util_.support.dom.a,
        cssMapping = {
            fontWeight: {normal: 400, bold: 700, bolder: 700, lighter: 100}
        },
        cssHooks = {
            opacity: {},
            width: {},
            height: {},
            fontWeight: {
                get: function(ele, key){
                    var ret = style.get(ele, key);
                    return cssMapping.fontWeight[ret] || ret;
                }
            }
        };
    //
    function setValue(ele, key, val){
        baidu.type(val) === 'string' && (val = baidu._util_.setPositiveNumber(ele, val));
        style.set(ele, key, val);
    }
    //
    baidu.extend(cssHooks.opacity, /^0.5/.test(anchor.style.opacity) ? {
        get: function(ele, key){
            var ret = baidu.dom(ele).getCurrentStyle(key);
            return ret === '' ? '1' : ret;
        }
    } : {
        get: function(ele){
            return alpha.test((ele.currentStyle || ele.style).filter || '') ? (parseFloat(RegExp.$1) / 100) + '' : '1';
        },
        set: function(ele, key, value){
            var filterString = (ele.currentStyle || ele.style).filter || '',
                opacityValue = value * 100;
                ele.style.zoom = 1;
                ele.style.filter = alpha.test(filterString) ? filterString.replace(alpha, 'Alpha(opacity=' + opacityValue)
                    : filterString + ' progid:dximagetransform.microsoft.Alpha(opacity='+ opacityValue +')';
        }
    });
    //
    baidu.forEach(['width', 'height'], function(item){
        cssHooks[item] = {
            get: function(ele){
                return baidu._util_.getWidthOrHeight(ele, item) + 'px';
            },
            set: setValue
        };
    });

    baidu.each({
        padding: "",
        border: "Width"
    }, function( prefix, suffix ) {
        cssHooks[prefix + suffix] = {set: setValue};
        var cssExpand = [ "Top", "Right", "Bottom", "Left" ],
            i=0;
        for ( ; i < 4; i++ ) {
            cssHooks[ prefix + cssExpand[ i ] + suffix ] = {
                set: setValue
            };
        }
    });
    return cssHooks;
}();



baidu._util_.cssNumber = {
    'columnCount': true,
    'fillOpacity': true,
    'fontWeight': true,
    'lineHeight': true,
    'opacity': true,
    'orphans': true,
    'widows': true,
    'zIndex': true,
    'zoom': true
};












baidu.createChain('string',
    // 执行方法
    function(string){
        var type = baidu.type(string),
            str = new String(~'string|number'.indexOf(type) ? string : type),
            pro = String.prototype;
        baidu.forEach(baidu.string.$String.prototype, function(fn, key) {
            pro[key] || (str[key] = fn);
        });
        return str;
    }
);






 //支持单词以“-_”分隔
 //todo:考虑以后去掉下划线支持？
baidu.string.extend({
    toCamelCase : function () {
        var source = this.valueOf();
        //提前判断，提高getStyle等的效率 thanks xianwei
        if (source.indexOf('-') < 0 && source.indexOf('_') < 0) {
            return source;
        }
        return source.replace(/[-_][^-_]/g, function (match) {
            return match.charAt(1).toUpperCase();
        });
    }
});




baidu.dom.styleFixer = function(){
    var style = baidu._util_.style,
        cssHooks = baidu._util_.cssHooks,
        cssNumber = baidu._util_.cssNumber,
        cssProps = {
            'float': !!baidu._util_.support.dom.a.style.cssFloat ? 'cssFloat' : 'styleFloat'
        };
    return function(ele, key, val){
        var origKey = baidu.string.toCamelCase(key),
            method = val === undefined ? 'get' : 'set',
            origVal, hooks;
        origKey = cssProps[origKey] || origKey;
        origVal = baidu.type(val) === 'number' && !cssNumber[origKey] ? val + 'px' : val;
        hooks = cssHooks.hasOwnProperty(origKey) && cssHooks[origKey][method] || style[method];
        return hooks(ele, origKey, origVal);
    }
}();










baidu.dom.extend({
    css: function(key, value){
        baidu.check('^(?:(?:string(?:,(?:number|string|function))?)|object)$', 'baidu.dom.css');
        return baidu._util_.access(this, key, value, function(ele, key, val){
            var styleFixer = baidu.dom.styleFixer;
            return styleFixer ? styleFixer(ele, key, val)
                : (val === undefined ? this.getCurrentStyle(key) : ele.style[key] = val);
        });
    }
});



















//baidu.browser.isStrict = document.compatMode == "CSS1Compat";


baidu._util_.getWindowOrDocumentWidthOrHeight = baidu._util_.getWindowOrDocumentWidthOrHeight || function(){
    var ret = {'window': {}, 'document': {}};
    baidu.forEach(['Width', 'Height'], function(item){
        var clientProp = 'client' + item,
            offsetProp = 'offset' + item,
            scrollProp = 'scroll' + item;
        ret['window']['get' + item] = function(ele){
            var doc = ele.document,
                rectValue = doc.documentElement[clientProp];
            return baidu.browser.isStrict && rectValue
                || doc.body && doc.body[clientProp] || rectValue;
        };
        ret['document']['get' + item] = function(ele){
            var doc = ele.documentElement;
            return doc[clientProp] >= doc[scrollProp] ? doc[clientProp]
                : Math.max(ele.body[scrollProp], doc[scrollProp], ele.body[offsetProp], doc[offsetProp]);
        }
    });
    return function(ele, type, key){
        return ret[type][key === 'width' ? 'getWidth' : 'getHeight'](ele);
    }
}();




baidu.dom.extend({
    width: function(value){
        return baidu._util_.access(this, 'width', value, function(ele, key, val){
            var hasValue = val !== undefined,
                parseValue = hasValue && parseFloat(val),
                type = ele != null && ele == ele.window ? 'window'
                    : (ele.nodeType === 9 ? 'document' : false);
            if(hasValue && parseValue < 0 || isNaN(parseValue)){return;}
            hasValue && /^(?:\d*\.)?\d+$/.test(val += '') && (val += 'px');
            return type ? baidu._util_.getWindowOrDocumentWidthOrHeight(ele, type, key)
                : (hasValue ? ele.style.width = val : baidu._util_.getWidthOrHeight(ele, key));
        });
    }
});









 



baidu.dom.extend({
    height: function(value){
        return baidu._util_.access(this, 'height', value, function(ele, key, val){
            var hasValue = val !== undefined,
                parseValue = hasValue && parseFloat(val),
                type = ele != null && ele == ele.window ? 'window'
                    : (ele.nodeType === 9 ? 'document' : false);
            if(hasValue && parseValue < 0 || isNaN(parseValue)){return;}
            hasValue && /^(?:\d*\.)?\d+$/.test(val += '') && (val += 'px');
            return type ? baidu._util_.getWindowOrDocumentWidthOrHeight(ele, type, key)
                : (hasValue ? ele.style.height = val : baidu._util_.getWidthOrHeight(ele, key));
        });
    }
});




baidu.object = baidu.object || {};





//baidu.object.extend = function (target, source) {
//    for (var p in source) {
//        if (source.hasOwnProperty(p)) {
//            target[p] = source[p];
//        }
//    }
//    
//    return target;
//};
baidu.object.extend = baidu.extend;





magic.control.Layer = baidu.lang.createClass(function(setting){
    this.width = "auto";
    this.height= "auto";

    baidu.object.extend(this, setting||{});
},{
    type : "magic.control.Layer"
    ,superClass : magic.Base
})
.extend(

{
    
    show : function(){
        if (this.fire("onbeforeshow")) {
            this.getElement().style.display = "";
            this.fire("onshow");
        }
    }
    
    ,hide :  function(){
        if (this.fire("onbeforehide")) {
            this.getElement().style.display = "none";
            this.fire("onhide");
        }
    }

    
    ,setWidth :  function(width) {
        this.width = width;
        baidu(this.getElement()).width(width);
    }
    
    
    ,setHeight :  function(height) {
        this.height = height;
        baidu.dom(this.getElement()).height(height);
    }
    
     
    ,setSize : function(size){
        this.setWidth(size.width || size[0]);
        this.setHeight(size.height||size[1]);
    }
});
















void function( base, be ){
    if( base.core )return ;

    var queue = base.queue;
    var core = base.core = {};
    var special = be.special = {};
    var push = [].push;

    var findVestedEl = function( target, parents ){
        for( var i = 0, l = parents.length; i < l; i ++ )
            if( parents.get(i).contains( target ) )
                return parents[i];
    };

    core.build = function( target, name, fn, selector, data ){

        var bindElements;

        if( selector )
            bindElements = baidu.dom( selector, target );

        if( ( name in special ) && special[name].pack )
            fn = special[name].pack( fn );

        return function( e ){ // e is instance of baidu.event()
            var t = baidu.dom( e.target ), args = [ e ], bindElement;

            if( data && !e.data ) 
                e.data = data;
            if( e.triggerData )
                push.apply( args, e.triggerData );

            if( !bindElements )
                return e.result = fn.apply( target, args );

            for(var i = 0; i < 2; i ++){
                if( bindElement = findVestedEl( e.target, bindElements ) )
                    return e.result = fn.apply( bindElement, args );
                bindElements = baidu.dom( selector, target );
            }
        };
    };

    core.add = function( target, type, fn, selector, data, one ){
        var pkg = this.build( target, type, fn, selector, data ), attachElements, bindType;
        bindType = type;
        if(type in special)
            attachElements = special[type].attachElements,
            bindType = special[type].bindType || type;

        queue.add( target, type, bindType, { type: type, pkg: pkg, orig: fn, one: one, delegate: selector }, attachElements );
    };

    core.remove = function( target, type, fn, selector ){
        queue.remove( target, type, fn, selector );
    };

}( baidu._util_.eventBase, baidu.event );







baidu.dom.extend({
    on: function( events, selector, data, fn, _one ){
        var eb = baidu._util_.eventBase.core;
        // var specials = { mouseenter: 1, mouseleave: 1, focusin: 1, focusout: 1 };

        if( typeof selector == "object" && selector )
            fn = data,
            data = selector,
            selector = null;
        else if( typeof data == "function" )
            fn = data,
            data = null;
        else if( typeof selector == "function" )
            fn = selector,
            selector = data = null;

        if( typeof events == "string" ){
            events = events.split(/[ ,]+/);
            this.each(function(){
                baidu.forEach(events, function( event ){
                    // if( specials[ event ] )
                    //     baidu( this )[ event ]( data, fn );
                    // else
                    eb.add( this, event, fn, selector, data, _one );
                }, this);
            });
        }else if( typeof events == "object" ){
            if( fn )
                fn = null;
            baidu.forEach(events, function( fn, eventName ){
                this.on( eventName, selector, data, fn, _one );
            }, this);
        }

        return this;
    }

    // _on: function( name, data, fn ){
    //     var eb = baidu._util_.eventBase;
    //     this.each(function(){
    //         eb.add( this, name, fn, undefined, data );
    //     });
    //     return this;
    // }
});

/// support - magic Tangram 1.x Code Start
/// support magic - Tangram 1.x Code Start







baidu.dom.g = function(id) {
    if (!id) return null; //修改IE下baidu.dom.g(baidu.dom.g('dose_not_exist_id'))报错的bug，by Meizz, dengping
    if ('string' == typeof id || id instanceof String) {
        return document.getElementById(id);
    } else if (id.nodeName && (id.nodeType == 1 || id.nodeType == 9)) {
        return id;
    }
    return null;
};

/// support magic - Tangram 1.x Code End

baidu.event.on = baidu.on = function( element, evtName, handler ){
    if( typeof element == "string" )
        element = baidu.dom.g( element );
    baidu.dom( element ).on( evtName.replace(/^\s*on/, ""), handler );
    return element;
};
/// support - magic Tangram 1.x Code End












baidu.dom.extend({
    off: function( events, selector, fn ){
        var eb = baidu._util_.eventBase.core, me = this;
        if( !events )
            baidu.forEach( this, function( item ){
                eb.remove( item );
            } );
        else if( typeof events == "string" ){
            if( typeof selector == "function" )
                fn = selector,
                selector = null;
            events = events.split(/[ ,]/);
            baidu.forEach( this, function( item ){
                baidu.forEach( events, function( event ){
                    eb.remove( item, event, fn, selector );
                });
            });
        }else if( typeof events == "object" )
            baidu.forEach( events, function(fn, event){
                me.off( event, selector, fn );
            } );

        return this;
    }
});

/// support - magic Tangram 1.x Code Start


baidu.event.un = baidu.un = function(element, evtName, handler){
    if( typeof element == "string" )
        element = baidu.dom.g( element );
    baidu.dom(element).off(evtName.replace(/^\s*on/, ''), handler);
    return element;
 };
 /// support - magic Tangram 1.x Code End








baidu.createChain("fn",

// 执行方法
function(fn){
    return new baidu.fn.$Fn(~'function|string'.indexOf(baidu.type(fn)) ? fn : function(){});
},

// constructor
function(fn){
    this.fn = fn;
});




baidu.fn.extend({
    bind: function(scope){
        var func = this.fn,
            xargs = arguments.length > 1 ? Array.prototype.slice.call(arguments, 1) : null;
        return function(){
            var fn = baidu.type(func) === 'string' ? scope[func] : func,
                args = xargs ? xargs.concat(Array.prototype.slice.call(arguments, 0)) : arguments;
            return fn.apply(scope || fn, args);
        }
    }
});
/// Tangram 1.x Code Start

baidu.fn.bind = function(func, scope) {
    var fn = baidu.fn(func);
    return fn.bind.apply(fn, Array.prototype.slice.call(arguments, 1));
};
/// Tangram 1.x Code End

/// support magic - Tangram 1.x Code Start







/// support magic - Tangram 1.x Code Start








// TODO
// 1. 无法解决px/em单位统一的问题（IE）
// 2. 无法解决样式值为非数字值的情况（medium等 IE）
baidu.dom.getStyle = function (element, key) {
    return baidu.dom(baidu.dom.g(element)).css(key);
};

/// support magic - Tangram 1.x Code End

/// support magic - Tangram 1.x Code Start





/// support magic - Tangram 1.x Code Start


/// support magic - Tangram 1.x Code End

/// support magic - Tangram 1.x Code Start


/// support magic - Tangram 1.x Code Start





baidu.page = baidu.page || {};

/// support magic - Tangram 1.x Code End



baidu.page.getScrollTop = function () {
    var d = document;
    return window.pageYOffset || d.documentElement.scrollTop || d.body.scrollTop;
};
/// support magic - Tangram 1.x Code End

/// support magic - Tangram 1.x Code Start







baidu.page.getScrollLeft = function () {
    var d = document;
    return window.pageXOffset || d.documentElement.scrollLeft || d.body.scrollLeft;
};
/// support magic - Tangram 1.x Code End


(function(){

 baidu.page.getMousePosition = function(){
     return {
        x : baidu.page.getScrollLeft() + xy.x,
        y : baidu.page.getScrollTop() + xy.y
     };
 };

 var xy = {x:0, y:0};

 // 监听当前网页的 mousemove 事件以获得鼠标的实时坐标
 baidu.event.on(document, "onmousemove", function(e){
    e = window.event || e;
    xy.x = e.clientX;
    xy.y = e.clientY;
 });

})();
/// support magic - Tangram 1.x Code End





/// support magic - Tangram 1.x Code Start






baidu.event.preventDefault = function (event) {
    return new baidu.event(event).preventDefault();
};
/// support magic - Tangram 1.x Code End









(function(){
    var dragging = false,
        target, // 被拖曳的DOM元素
        op, ox, oy, timer, left, top, lastLeft, lastTop, mozUserSelect;
    baidu.dom.drag = function(element, options){
        if(!(target = baidu.dom.g(element))){return false;}
        op = baidu.object.extend({
            autoStop: true, // false 用户手动结束拖曳 ｜ true 在mouseup时自动停止拖曳
            capture: true,  // 鼠标拖曳粘滞
            interval: 16    // 拖曳行为的触发频度（时间：毫秒）
        }, options);
        lastLeft = left = parseInt(baidu.dom.getStyle(target, 'left')) || 0;
        lastTop = top = parseInt(baidu.dom.getStyle(target, 'top')) || 0;
        dragging = true;
        setTimeout(function(){
            var mouse = baidu.page.getMousePosition();  // 得到当前鼠标坐标值
            ox = op.mouseEvent ? (baidu.page.getScrollLeft() + op.mouseEvent.clientX) : mouse.x;
            oy = op.mouseEvent ? (baidu.page.getScrollTop() + op.mouseEvent.clientY) : mouse.y;
            clearInterval(timer);
            timer = setInterval(render, op.interval);
        }, 1);
        // 这项为 true，缺省在 onmouseup 事件终止拖曳
        var tangramDom = baidu.dom(document);
        op.autoStop && tangramDom.on('mouseup', stop);
        // 在拖曳过程中页面里的文字会被选中高亮显示，在这里修正
        tangramDom.on('selectstart', unselect);
        // 设置鼠标粘滞
        if (op.capture && target.setCapture) {
            target.setCapture();
        } else if (op.capture && window.captureEvents) {
            window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP);
        }
        // fixed for firefox
        mozUserSelect = document.body.style.MozUserSelect;
        document.body.style.MozUserSelect = 'none';
        baidu.isFunction(op.ondragstart)
            && op.ondragstart(target, op);
        return {
            stop: stop, dispose: stop,
            update: function(options){
                baidu.object.extend(op, options);
            }
        }
    }
    // 停止拖曳
    function stop() {
        dragging = false;
        clearInterval(timer);
        // 解除鼠标粘滞
        if (op.capture && target.releaseCapture) {
            target.releaseCapture();
        } else if (op.capture && window.releaseEvents) {
            window.releaseEvents(Event.MOUSEMOVE|Event.MOUSEUP);
        }
        // 拖曳时网页内容被框选
        document.body.style.MozUserSelect = mozUserSelect;
        var tangramDom = baidu.dom(document);
        tangramDom.off('selectstart', unselect);
        op.autoStop && tangramDom.off('mouseup', stop);
        // ondragend 事件
        baidu.isFunction(op.ondragend)
            && op.ondragend(target, op, {left: lastLeft, top: lastTop});
    }
    // 对DOM元素进行top/left赋新值以实现拖曳的效果
    function render(e) {
        if(!dragging){
            clearInterval(timer);
            return;
        }
        var rg = op.range || [],
            mouse = baidu.page.getMousePosition(),
            el = left + mouse.x - ox,
            et = top  + mouse.y - oy;

        // 如果用户限定了可拖动的范围
        if (baidu.isObject(rg) && rg.length == 4) {
            el = Math.max(rg[3], el);
            el = Math.min(rg[1] - target.offsetWidth, el);
            et = Math.max(rg[0], et);
            et = Math.min(rg[2] - target.offsetHeight, et);
        }
        target.style.left = el + 'px';
        target.style.top  = et + 'px';
        lastLeft = el;
        lastTop = et;
        baidu.isFunction(op.ondrag)
            && op.ondrag(target, op, {left: lastLeft, top: lastTop});
    }
    // 对document.body.onselectstart事件进行监听，避免拖曳时文字被选中
    function unselect(e) {
        return baidu.event.preventDefault(e, false);
    }
})();
// [TODO] 20100625 添加cursorAt属性，absolute定位的定位的元素在不设置top|left值时，初始值有问题，得动态计算
// [TODO] 20101101 在drag方法的返回对象中添加 dispose() 方法析构drag
/// support magic - Tangram 1.x Code End











baidu.dom.extend({
    getDocument: function(){
        if(this.size()<=0){return undefined;}
        var ele = this[0];
        return ele.nodeType == 9 ? ele : ele.ownerDocument || ele.document;
    }
});




baidu.dom.extend({
    getWindow: function(){
        var doc = this.getDocument();
        return (this.size()<=0)? undefined :(doc.parentWindow || doc.defaultView);
    }
});









baidu._util_.contains = document.compareDocumentPosition ?
    function(container, contained){
        return !!(container.compareDocumentPosition( contained ) & 16);
    } : function(container, contained){
        if(container === contained){return false;}
        if(container.contains && contained.contains){
            return container.contains(contained);
        }else{
            while(contained = contained.parentNode){
                if(contained === container){return true;}
            }
            return false;
        }
    };






baidu.dom.extend({
    offset: function(){
        
        function setOffset(ele, options, index){
            var tang = tang = baidu.dom(ele),
                position = tang.getCurrentStyle('position');
            position === 'static' && (ele.style.position = 'relative');
            var currOffset = tang.offset(),
                currLeft = tang.getCurrentStyle('left'),
                currTop = tang.getCurrentStyle('top'),
                calculatePosition = (~'absolute|fixed'.indexOf(position)) && ~('' + currLeft + currTop).indexOf('auto'),
                curPosition = calculatePosition && tang.position();
            currLeft = curPosition && curPosition.left || parseFloat(currLeft) || 0;
            currTop = curPosition && curPosition.top || parseFloat(currTop) || 0;
            baidu.type('options') === 'function' && (options = options.call(ele, index, currOffset));
            options.left != undefined && (ele.style.left = options.left - currOffset.left + currLeft + 'px');
            options.top != undefined && (ele.style.top = options.top - currOffset.top + currTop + 'px');
        }
        
        return function(options){
            if(options){
                baidu.check('^(?:object|function)$', 'baidu.dom.offset');
                for(var i = 0, item; item = this[i]; i++){
                    setOffset(item, options, i);
                }
                return this;
            }
            var ele = this[0],
                doc = this.getDocument(),
                box = {left: 0, top: 0},
                win, docElement;
            if(!doc){return;}
            docElement = doc.documentElement;
            if(!baidu._util_.contains(docElement, ele)){return box;}
            (typeof ele.getBoundingClientRect) !== 'undefined' && (box = ele.getBoundingClientRect());
            win = this.getWindow();
            return {
                left: box.left + (win.pageXOffset || docElement.scrollLeft) - (docElement.clientLeft || 0),
                top: box.top  + (win.pageYOffset || docElement.scrollTop)  - (docElement.clientTop  || 0)
            };
        }
    }()
});











baidu.dom.extend({
    map : function (iterator) {
        baidu.check("function","baidu.dom.map");
        var ret = [],
            i = 0;

        baidu.forEach(this, function( dom, index ){
            ret[ i++ ] = iterator.call( dom, index, dom, dom );
        });

        return this.pushStack( ret );
    }
});





baidu.dom.extend({
    offsetParent: function(){
        return this.map(function(){
            var offsetParent = this.offsetParent || document.body,
                exclude = /^(?:body|html)$/i;
            while(offsetParent && baidu.dom(offsetParent).getCurrentStyle('position') === 'static'
                && !exclude.test(offsetParent.nodeName)){
                    offsetParent = offsetParent.offsetParent;
            }
            return offsetParent;
        });
    }
});




baidu.dom.extend({
    position: function(){
        if(this.size()<=0){return 0;}        
        var patrn = /^(?:body|html)$/i,
            coordinate = this.offset(),
            offsetParent = this.offsetParent(),
            parentCoor = patrn.test(offsetParent[0].nodeName) ? {left: 0, top: 0}
                : offsetParent.offset();
        coordinate.left -= parseFloat(this.getCurrentStyle('marginLeft')) || 0;
        coordinate.top -= parseFloat(this.getCurrentStyle('marginTop')) || 0;
        parentCoor.left += parseFloat(offsetParent.getCurrentStyle('borderLeftWidth')) || 0;
        parentCoor.top += parseFloat(offsetParent.getCurrentStyle('borderTopWidth')) || 0;
        return {
            left: coordinate.left - parentCoor.left,
            top: coordinate.top - parentCoor.top
        }
    }
});











baidu.string.extend({
    encodeHTML : function () {
        return this.replace(/&/g,'&amp;')
                    .replace(/</g,'&lt;')
                    .replace(/>/g,'&gt;')
                    .replace(/"/g, "&quot;")
                    .replace(/'/g, "&#39;");
    }
});


















baidu.string.extend({
    trim: function(){
        var trimer = new RegExp('(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+\x24)', 'g');
        return function(){
            return this.replace(trimer, '');
        }
    }()
});


baidu.dom.extend({
    addClass: function( value ){

        if( !arguments.length )
            return this;

        var t = typeof value, b = " ";

        if( t == "string" ){
            value = baidu.string.trim(value);
            
            var arr = value.split(" ");

            baidu.forEach( this, function(item, index){
                var str = item.className;
                
                for(var i = 0; i < arr.length; i ++)
                    if(!~(b + str + b).indexOf(b + arr[i] + b))
                        str += " " + arr[i];
                
                item.className = str.replace(/^\s+/g, "");
            } );
        }else if( t == "function" )
            baidu.forEach(this, function(item, index){
                baidu.dom(item).addClass(value.call(item, index, item.className));
            });

        return this;
    }
});








baidu.dom.extend({
    removeClass: function(value){

        var type = typeof value, b = " ";

        if( !arguments.length )
            baidu.forEach(this, function(item){
                item.className = "";
            });

        if( type == "string" ){
            value = baidu.string.trim(value);
            var arr = value.split(" ");

            baidu.forEach(this, function(item){
                var str = item.className ;
                for(var i = 0; i < arr.length; i ++)
                    while(~(b + str + b).indexOf(b + arr[i] + b))
                       str = (b + str + b).replace(b + arr[i] + b, b);
                item.className = baidu.string.trim(str);
            });

        }else if(type == "function"){
            baidu.forEach(this, function(item, index ,className){
                baidu.dom(item).removeClass(value.call(item, index, item.className));
            }); 
        }

        return this;
    }
});








baidu.dom.extend({
    hasClass: function(value){
        //异常处理
        if(arguments.length <= 0 || typeof value === 'function'){
            return this;
        };
        
        if(this.size()<=0){
            return false;
        };

        //对输入进行处理
        value = value.replace(/^\s+/g,'').replace(/\s+$/g,'').replace(/\s+/g,' ');
        var arr = value.split(' ');
        var result;
        baidu.forEach(this, function(item){
            var str = item.className;
            for(var i = 0;i<arr.length;i++){
                if(!~(' '+str+' ').indexOf(' '+arr[i]+' ')){
                    //有一个不含有
                    result = false;
                    return;
                };
            };
            if(result!==false){result = true;return;};
        });
        return result;
    }
});



















baidu.dom.createElements = function() {
    var tagReg  = /<(\w+)/i,
        rhtml = /<|&#?\w+;/,
        tagMap  = {
            area    : [1, "<map>", "</map>"],
            col     : [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            legend  : [1, "<fieldset>", "</fieldset>"],
            option  : [1, "<select multiple='multiple'>", "</select>"],
            td      : [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            thead   : [1, "<table>", "</table>"],
            tr      : [2, "<table><tbody>", "</tbody></table>"],
            _default: [0, "", ""]
        };

    // 建立映射
    tagMap.optgroup = tagMap.option;
    tagMap.tbody = tagMap.tfoot = tagMap.colgroup = tagMap.caption = tagMap.thead;
    tagMap.th = tagMap.td;

    // 将<script>解析成正常可执行代码
    function parseScript ( box, doc ) {
        var list = box.getElementsByTagName("SCRIPT"),
            i, script, item;

        for ( i=list.length-1; i>=0; i-- ) {
            item = list[ i ];
            script = doc.createElement( "SCRIPT" );

            item.id && (script.id = item.id);
            item.src && (script.src = item.src);
            item.type && (script.type = item.type);
            script[ item.text ? "text" : "textContent" ] = item.text || item.textContent;

            item.parentNode.replaceChild( script, item );
        }
    }

    return function( htmlstring, doc ) {
        baidu.isNumber( htmlstring ) && ( htmlstring = htmlstring.toString() );
        doc = doc || document;

        var wrap, depth, box,
            hs  = htmlstring,
            n   = hs.length,
            div = doc.createElement("div"),
            df  = doc.createDocumentFragment(),
            result = [];

        if ( baidu.isString( hs ) ) {
            if(!rhtml.test(hs)){// TextNode
                result.push( doc.createTextNode( hs ) );
            }else {//htmlString
                wrap = tagMap[ hs.match( tagReg )[1].toLowerCase() ] || tagMap._default;

                div.innerHTML = "<i>mz</i>" + wrap[1] + hs + wrap[2];
                div.removeChild( div.firstChild );  // for ie (<script> <style>)
                parseScript(div, doc);

                depth = wrap[0];
                box = div;
                while ( depth -- ) { box = box.firstChild; };

                baidu.merge( result, box.childNodes );

                // 去除 item.parentNode
                baidu.forEach( result, function (dom) {
                    df.appendChild( dom );
                } );

                div = box = null;
            }
        }

        div = null;

        return result;
    };
}();















baidu.dom.extend({
    empty: function(){
        for(var i = 0, item; item = this[i]; i++){
            item.nodeType === 1 && baidu._util_.cleanData(item.getElementsByTagName('*'));
            while(item.firstChild){
                item.removeChild(item.firstChild);
            }
        }
        return this;
    }
});

/// Tangram 1.x Code Start



/// Tangram 1.x Code End




baidu.dom.extend({
    html: function(value){

        var bd = baidu.dom,
            bt = baidu._util_,
            me = this,
            isSet = false,
            htmlSerialize = !!bt.support.dom.div.getElementsByTagName('link').length,
            leadingWhitespace = (bt.support.dom.div.firstChild.nodeType === 3),
            result;

        //当dom选择器为空时
        if( !this.size() )
            switch(typeof value){
                case 'undefined':
                    return undefined;
                default:
                    return me;
            }
        
        var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
        "header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
            rnoInnerhtml = /<(?:script|style|link)/i,
            rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
            rleadingWhitespace = /^\s+/,
            rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
            rtagName = /<([\w:]+)/,
            wrapMap = {
                option: [ 1, "<select multiple='multiple'>", "</select>" ],
                legend: [ 1, "<fieldset>", "</fieldset>" ],
                thead: [ 1, "<table>", "</table>" ],
                tr: [ 2, "<table><tbody>", "</tbody></table>" ],
                td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
                col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
                area: [ 1, "<map>", "</map>" ],
                _default: [ 0, "", "" ]
            };
        wrapMap.optgroup = wrapMap.option;
        wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
        wrapMap.th = wrapMap.td;

        // IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
        // unless wrapped in a div with non-breaking characters in front of it.
        if ( !htmlSerialize )
            wrapMap._default = [ 1, "X<div>", "</div>" ];

        baidu.forEach( me, function( elem, index ){
            
            if( result )
                return;

            var tangramDom = bd(elem);

            switch( typeof value ){
                case 'undefined':
                    result = ( elem.nodeType === 1 ? elem.innerHTML : undefined );
                    return ;
 
                case 'number':
                    value = String(value);

                case 'string':
                    isSet = true;

                    // See if we can take a shortcut and just use innerHTML
                    if ( !rnoInnerhtml.test( value ) &&
                        ( htmlSerialize || !rnoshimcache.test( value )  ) &&
                        ( leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
                        !wrapMap[ ( rtagName.exec( value ) || ["", ""] )[1].toLowerCase() ] ) {

                        value = value.replace( rxhtmlTag, "<$1></$2>" );

                        try {

                            // Remove element nodes and prevent memory leaks
                            if ( elem.nodeType === 1 ) {
                                tangramDom.empty();
                                elem.innerHTML = value;
                            }

                            elem = 0;

                        // If using innerHTML throws an exception, use the fallback method
                        } catch(e) {}
                    }

                    if ( elem ) {
                        me.empty().append( value );
                    }

                break;

                case 'function':
                    isSet = true;
                    tangramDom.html(value.call(elem, index, tangramDom.html()));
                break;
            };
        });
        
        return isSet ? me : result;
    }
});


baidu._util_.smartInsert = function(tang, args, callback){
    if(args.length <= 0 || tang.size() <= 0){return;}
    if(baidu.type(args[0]) === 'function'){
        var fn = args[0],
            tangItem;
        return baidu.forEach(tang, function(item, index){
            tangItem = baidu.dom(item);
            args[0] = fn.call(item, index, tangItem.html());
            baidu._util_.smartInsert(tangItem, args, callback);
        });
    }
    var doc = tang.getDocument() || document,
        fragment = doc.createDocumentFragment(),
        len = tang.length - 1,
        firstChild;
    for(var i = 0, item; item = args[i]; i++){
        if(item.nodeType){
            fragment.appendChild(item);
        }else{
            baidu.forEach(~'string|number'.indexOf(baidu.type(item)) ?
                baidu.dom.createElements(item, doc)
                    : item, function(ele){
                        fragment.appendChild(ele);
                    });
        }
    }
    if(!(firstChild = fragment.firstChild)){return;}
    baidu.forEach(tang, function(item, index){
        callback.call(item.nodeName.toLowerCase() === 'table'
            && firstChild.nodeName.toLowerCase() === 'tr' ?
                item.tBodies[0] || item.appendChild(item.ownerDocument.createElement('tbody'))
                    : item, index < len ? fragment.cloneNode(true) : fragment);
    });
};






baidu.dom.extend({
    append: function(){
        baidu.check('^(?:string|function|HTMLElement|\\$DOM)(?:,(?:string|array|HTMLElement|\\$DOM))*$', 'baidu.dom.append');
        baidu._util_.smartInsert(this, arguments, function(child){
            this.nodeType === 1 && this.appendChild(child);
        });
        return this;
    }
});













baidu.dom.extend({
    closest : function (selector, context) {
        var results = baidu.array();

        baidu.forEach ( this, function(dom) {
            var t = [dom];
            while ( dom = dom.parentNode ) {
                dom.nodeType && t.push( dom );
            }
            t = baidu.dom.match( t, selector, context );

            t.length && results.push(t[0]);
        });
        
        return this.pushStack( results.unique() );
    }
});

/// support magic - Tangram 1.x Code Start




/// support magic - Tangram 1.x Code Start






baidu.global.get = function(key){
    return baidu.global(key);
};
/// support magic - Tangram 1.x Code End

/// support magic - Tangram 1.x Code Start






baidu.global.set = function(key, value, overwrite){
    return baidu.global(key, value, !overwrite);
};
/// support magic - Tangram 1.x Code End



baidu.global.getZIndex = function(key, step) {
    var zi = baidu.global.get("zIndex");
    if (key) {
        zi[key] = zi[key] + (step || 1);
    }
    return zi[key];
};
baidu.global.set("zIndex", {popup : 50000, dialog : 1000}, true);
/// support magic - Tangram 1.x Code End

/// support maigc - Tangram 1.x Code Start






baidu.page.getWidth = function () {
    var doc = document,
        body = doc.body,
        html = doc.documentElement,
        client = doc.compatMode == 'BackCompat' ? body : doc.documentElement;

    return Math.max(html.scrollWidth, body.scrollWidth, client.clientWidth);
};
/// support maigc - Tangram 1.x Code End

/// support magic - Tangram 1.x Code Start






baidu.page.getHeight = function () {
    var doc = document,
        body = doc.body,
        html = doc.documentElement,
        client = doc.compatMode == 'BackCompat' ? body : doc.documentElement;

    return Math.max(html.scrollHeight, body.scrollHeight, client.clientHeight);
};
/// support magic - Tangram 1.x Code End







magic.control.Dialog = baidu.lang.createClass(
     function(options){
        var me = this;
        options = baidu.object.extend({
            width: 400,
            height: 300,
            left: 0,
            top: 0,
            contentType: "html",
            draggable: true
        }, options || {});

        baidu.object.extend(me._options || (me._options = {}), options);

        me._footerHeight = 0;

        if(options.width < 100)
            options.width = 100;
        if(options.height < 100)
            options.height = 100;

        this.zIndex = baidu.global.getZIndex("dialog", 5);
        
        this.disposeProcess = [];

        this.on("load", function(){
            var container = this.getElement(), me = this,options = me._options;
            
            if(typeof options.left == "number" || typeof options.top == "number")
                this.setPosition(options);
            if(typeof options.width == "number" || typeof options.height == "number")
                this.setSize(this._options);

            this._isShown = true;
            this.focus();

            // 处理聚焦
            var focusFn = function(e){ me.focus(e); };
            
            
            // baidu(container).on("mousedown", focusFn);
            
            baidu(document).on("mousedown", focusFn);
            
            this.disposeProcess.unshift(function(){
                baidu(document).off("mousedown", focusFn);
            });

            // 定义拖拽事件
            if(options.draggable){
                var title = this.getElement("title"), dragFn;
                var bind = baidu.fn.bind;
                var me = this;
                var container_parent = container.parentNode;
                var parent_position = baidu(container_parent).position();
                title.className += " tang-title-dragable";

                var getRange = {
                    'top': function(){
                        var parent_border_top = baidu(container_parent).css("borderTopWidth");

                        if(!/px/.test(parent_border_top)){
                            parent_border_top = 0;
                        }else{
                            parent_border_top = parseInt(parent_border_top);
                        }

                        if(container_parent == document.body){
                            return 0 - parent_border_top;
                        }else{
                            return 0 - (parent_position.top + parent_border_top);
                        }
                    },
                    'right': function(){
                        //TODO 如果没有background层，会报错
                        var background_inner = baidu(".tang-background-inner", container)[0];
                        var background_inner_ml = baidu(background_inner).css("marginLeft") == "auto" ? background_inner.offsetLeft + "px" : baidu(background_inner).css("marginLeft");
                        return baidu.page.getWidth() + getRange['left']() - parseInt(background_inner_ml);
                    },
                    'bottom': function(){
                        var background_inner = baidu(".tang-background-inner", container)[0];
                        var background_inner_mt = baidu(background_inner).css("marginTop") == "auto" ? background_inner.offsetTop + "px" : baidu(background_inner).css("marginTop");
                        return baidu.page.getHeight() + getRange['top']() - parseInt(background_inner_mt);
                    },
                    'left': function(){
                        var parent_border_left = baidu(container_parent).css("borderLeftWidth");

                        if(!/px/.test(parent_border_left)){
                            parent_border_left = 0;
                        }else{
                            parent_border_left = parseInt(parent_border_left);
                        }

                        if(container_parent == document.body){
                            return 0 - parent_border_left;
                        }else{
                            return 0 - (parent_position.top + parent_border_left);
                        }
                    }
                };

                baidu(title).on("mousedown", dragFn = bind(function(evt){
                    evt.preventDefault();
                    baidu.dom.drag(container, {
                        ondragstart: bind(function(){ this.fire("dragstart"); }, this),
                        ondrag: bind(function(){ this.fire("drag"); }, this),
                        ondragend: bind(function(){ this.fire("dragstop"); }, this),
                        range: [
                            getRange['top'](),
                            getRange['right'](),
                            getRange['bottom'](),
                            getRange['left']()
                        ]
                        
                    });
                }, this));
                this.disposeProcess.unshift(function(){
                    baidu(title).off("mousedown", dragFn);
                });
            }
        });

        this.on("resize", function(event, pos){
           var titleText = this.getElement("titleText");
           var buttons = this.getElement("titleButtons");
           if(typeof pos.width == "number")
                baidu(titleText).css("width", Math.max(0, pos.width - buttons.clientWidth - 20) + "px");   
        });
    }, 

     { 
        type: "magic.control.Dialog",
        superClass: magic.Base
    });

magic.control.Dialog.extend(

{
    

    
    isShowing: function(){
        return this._isShown;
    },

    
    show: function(){
       
        if(this.fire("beforeshow") === false)
            return this;
        this.getElement().style.display = "";
        this._isShown = true;

         
        this.fire("show");
    },

    
    hide: function(){
        
        if(this.fire("beforehide") === false)
            return this;
        this._isShown = false;
        this.getElement().style.display = "none";
         
        
        this.fire("hide");
    },
    
    setTitleText: function(title){
        var titleText = this.getElement("titleText");
          titleText.innerHTML = baidu.string.encodeHTML(title) || "&nbsp;";
          return this;
    },

    
    setContent: function(content, contentType){
        var contentEl = this.getElement("content");

        var lastDom, target, parent;
        if(lastDom = this._lastDom){
           parent = lastDom.parent;
           if(lastDom.content === content)
               return this;
           if(lastDom.target){ // 原还位置
               parent.insertBefore(lastDom.content, lastDom.target);
           }else{
               parent.appendChild(lastDom.content);
           }
           this._lastDom = null;
        }

        switch(contentType){
            case "text":
                contentEl.innerHTML = baidu.string.encodeHTML(content);
                baidu(contentEl).removeClass("contentFrame");
                break;
            case "element":
                if(parent = content.parentNode){ // 做标记
                    parent.insertBefore(target = document.createTextNode(""), content);
                    this._lastDom = { content: content, parent: content.parentNode, target: target };                    
                }
                contentEl.innerHTML = "";
                contentEl.appendChild(content);         
                break;            
            case "frame":
                baidu(contentEl).css("height", baidu(this.getElement('body')).css('height'));
                contentEl.innerHTML = "<iframe frameborder='no' src='" + content + "'></iframe>";
                baidu(contentEl).hasClass("contentFrame") || 
                    baidu(contentEl).addClass("contentFrame");        
                break;
            default:
                contentEl.innerHTML = content;
                baidu(contentEl).removeClass("contentFrame");
                break;
        }

        return this;
    },

    
    focus: function(e){
        var  focusedMap = baidu.global.get("dialogFocused").map,
             idty = this.$getId() + "focus",
             updateStatus = function(){
                for(var attr in focusedMap){
                    attr != idty && (focusedMap[attr] = false);
                }
             };
        focusedMap || (baidu.global.get("dialogFocused").map = focusedMap = {});
        if(arguments.length){
            var target = e.target;
            if(baidu(target).closest(this.getElement()).size() > 0){
                baidu(this.getElement()).css("zIndex", 
                    this.zIndex = baidu.global.getZIndex("dialog", 5));
                if(focusedMap[idty] != true){
                    this.fire("focus");
                    updateStatus();
                    focusedMap[idty] = true;
                }
            }else{
                focusedMap[idty] = false;
            }
        }else{
            baidu(this.getElement()).css("zIndex", 
                    this.zIndex = baidu.global.getZIndex("dialog", 5));
            focusedMap[idty] = true;
            updateStatus();
            this.fire("focus");
        }
        
        
        
        
        
    },

    
    setSize: function(size){
        var foreground = this.getElement("foreground");
        if(typeof size.width == "number")
            baidu(foreground).css("width", (this._options.width = size.width) + "px");
        if(typeof size.height == "number"){
            baidu(foreground).css("height", (this._options.height = size.height) + "px");
            var height = Math.max(0, this._options.height - this._titleHeight - this._footerHeight) + "px",
                contentEl = baidu(this.getElement("content"));
            baidu(this.getElement("body")).css("height", height);
            contentEl.hasClass("contentFrame") && contentEl.css("height", height);
        }
        
        this.fire("resize", size);
    },

    
    getSize: function(){
        return {
            width: this._options.width,
            height: this._options.height
        }
    },

    
    setPosition: function(pos){

        if(typeof pos.left == "number")
            baidu(this.getElement()).css("left", (this._options.left = pos.left) + "px");
        if(typeof pos.top == "number")
            baidu(this.getElement()).css("top", (this._options.top = pos.top) + "px");
        
        this.fire("move", pos);
    },

    
    getPosition: function(){
        return {
            left: this._options.left,
            top: this._options.top
        }
    },

    
    center: function(){
        var body = document[baidu.browser.isStrict ? "documentElement" : "body"];
        var bodyWidth = body.clientWidth;
        var bodyHeight = body.clientHeight;
        //在Chrome下，document.documentElement.scrollTop取值为0，所以改用已经做过兼容的baidu.page.getScrollTop()。
        //scrollLeft同上
        //fixed by Dengping
        var left = (((bodyWidth - this._options.width) / 2) | 0) + baidu.page.getScrollLeft();
        var top = (((bodyHeight - this._options.height) / 2) | 0) + baidu.page.getScrollTop();
        this.setPosition({ left: left, top: top });
    },

    
    $dispose: function(){
        var focusedMap = baidu.global.get("dialogFocused").map;
        if(focusedMap){ delete focusedMap[this.$getId() + "focus"] };
        for(var i = 0, l = this.disposeProcess.length; i < l; i ++)
            this.disposeProcess[i].call(this);
        magic.Base.prototype.$dispose.call(this);
    }
});

















//format(a,a,d,f,c,d,g,c);
baidu.string.extend({
    format : function (opts) {
        var source = this.valueOf(),
            data = Array.prototype.slice.call(arguments,0), toString = Object.prototype.toString;
        if(data.length){
            data = data.length == 1 ? 
                
                (opts !== null && (/\[object Array\]|\[object Object\]/.test(toString.call(opts))) ? opts : data) 
                : data;
            return source.replace(/#\{(.+?)\}/g, function (match, key){
                var replacer = data[key];
                // chrome 下 typeof /a/ == 'function'
                if('[object Function]' == toString.call(replacer)){
                    replacer = replacer(key);
                }
                return ('undefined' == typeof replacer ? '' : replacer);
            });
        }
        return source;
    }
});

























 
baidu.dom.extend({
    data : function () {
        var   guid = baidu.key
            , maps = baidu.global("_maps_HTMLElementData");

        return function( key, value ) {
            baidu.forEach( this, function( dom ) {
                !dom[ guid ] && ( dom[ guid ] = baidu.id() );
            });

            if ( baidu.isString(key) ) {

                // get first
                if ( typeof value == "undefined" ) {
                    var data,result;
                    result = this[0] && (data = maps[ this[0][guid] ]) && data[ key ];
                    if(typeof result != 'undefined'){
                        return result;
                    }else{

                        //取得自定义属性
                        var attr = this[0].getAttribute('data-'+key);
                        return !~String(attr).indexOf('{') ? attr:Function("return "+attr)();
                    }
                }

                // set all
                baidu.forEach(this, function(dom){
                    var data = maps[ dom[ guid ] ] = maps[ dom[ guid ] ] || {};
                    data[ key ] = value;
                });
            
            // json
            } else if ( baidu.type(key) == "object") {

                // set all
                baidu.forEach(this, function(dom){
                    var data = maps[ dom[ guid ] ] = maps[ dom[ guid ] ] || {};

                    baidu.forEach( key , function(item,index) {
                        data[ index ] = key[ index ];
                    });
                });
            }

            return this;
        }
    }()
});










baidu._util_.isHidden = function(ele){
    return baidu.dom(ele).getCurrentStyle('display') === 'none'
        || !baidu._util_.contains(ele.ownerDocument, ele);
}



baidu.dom.extend({
    hide: function(){
        var vals = [],
            tang, isHidden, display;
        return this.each(function(index, ele){
            if(!ele.style){return;}//当前的这个不做操作
            tang = baidu(ele);
            vals[index] = tang.data('olddisplay');
            display = ele.style.display;
            if(!vals[index]){
                isHidden = baidu._util_.isHidden(ele);
                if(display && display !== 'none' || !isHidden){
                    tang.data('olddisplay', isHidden ? display : tang.getCurrentStyle('display'));
                }
            }
            ele.style.display = 'none';
        });
    }
});















baidu._util_.getDefaultDisplayValue = function(){
    var valMap = {};
    return function(tagName){
        if(valMap[tagName]){return valMap[tagName];}
        var ele = document.createElement(tagName),
            val, frame, ownDoc;
        document.body.appendChild(ele);
        val = baidu.dom(ele).getCurrentStyle('display');
        document.body.removeChild(ele);
        if(val === '' || val === 'none'){
            frame = document.body.appendChild(document.createElement('iframe'));
            frame.frameBorder =
            frame.width =
            frame.height = 0;
            ownDoc = (frame.contentWindow || frame.contentDocument).document;
            ownDoc.writeln('<!DOCTYPE html><html><body>');
            ownDoc.close();
            ele = ownDoc.appendChild(ownDoc.createElement(tagName));
            val = baidu.dom(ele).getCurrentStyle('display');
            document.body.removeChild(frame);
            frame = null;
        }
        ele = null;
        return valMap[tagName] = val;
    }
}();






baidu.dom.extend({
    show: function(){
        var vals = [],
            display, tang;
        this.each(function(index, ele){
            if(!ele.style){return;}
            tang = baidu.dom(ele);
            display = ele.style.display;
            vals[index] = tang.data('olddisplay');
            if(!vals[index] && display === 'none'){
                ele.style.display = '';
            }
            if(ele.style.display === ''
                && baidu._util_.isHidden(ele)){
                    tang.data('olddisplay', (vals[index] = baidu._util_.getDefaultDisplayValue(ele.nodeName)));
            }
        });
        
        return this.each(function(index, ele){
            if(!ele.style){return;}
            if(ele.style.display === 'none'
                || ele.style.display === ''){
                    ele.style.display = vals[index] || '';
            }
        });
    }
});









baidu.merge = function(first, second) {
    var i = first.length,
        j = 0;

    if ( typeof second.length === "number" ) {
        for ( var l = second.length; j < l; j++ ) {
            first[ i++ ] = second[ j ];
        }

    } else {
        while ( second[j] !== undefined ) {
            first[ i++ ] = second[ j++ ];
        }
    }

    first.length = i;

    return first;
};




















baidu.createChain = function(chainName, fn, constructor) {
    // 创建一个内部类名
    var className = chainName=="dom"?"$DOM":"$"+chainName.charAt(0).toUpperCase()+chainName.substr(1),
        slice = Array.prototype.slice,
        chain = baidu[chainName];
    if(chain){return chain}
    // 构建链头执行方法
    chain = baidu[chainName] = fn || function(object) {
        return baidu.extend(object, baidu[chainName].fn);
    };

    // 扩展 .extend 静态方法，通过本方法给链头对象添加原型方法
    chain.extend = function(extended) {
        var method;

        // 直接构建静态接口方法，如 baidu.array.each() 指向到 baidu.array().each()
        for (method in extended) {
            (function(method){//解决通过静态方法调用的时候，调用的总是最后一个的问题。
                // 20121128 这个if判断是防止console按鸭子判断规则将本方法识别成数组
                if (method != "splice") {
                    chain[method] = function() {
                        var id = arguments[0];

                        // 在新版接口中，ID选择器必须用 # 开头
                        chainName=="dom" && baidu.type(id)=="string" && (id = "#"+ id);

                        var object = chain(id);
                        var result = object[method].apply(object, slice.call(arguments, 1));

                        // 老版接口返回实体对象 getFirst
                        return baidu.type(result) == "$DOM" ? result.get(0) : result;
                    }
                }
            })(method);
        }
        return baidu.extend(baidu[chainName].fn, extended);
    };

    // 创建 链头对象 构造器
    baidu[chainName][className] = baidu[chainName][className] || constructor || function() {};

    // 给 链头对象 原型链做一个短名映射
    chain.fn = baidu[chainName][className].prototype;

    return chain;
};


baidu.overwrite = function(Class, list, fn) {
    for (var i = list.length - 1; i > -1; i--) {
        Class.prototype[list[i]] = fn(list[i]);
    }

    return Class;
};





baidu.createChain("array", function(array){
    var pro = baidu.array.$Array.prototype
        ,ap = Array.prototype
        ,key;

    baidu.type( array ) != "array" && ( array = [] );

    for ( key in pro ) {
        //ap[key] || (array[key] = pro[key]);
        array[key] = pro[key];
    }

    return array;
});

// 对系统方法新产生的 array 对象注入自定义方法，支持完美的链式语法
baidu.overwrite(baidu.array.$Array, "concat slice".split(" "), function(key) {
    return function() {
        return baidu.array( Array.prototype[key].apply(this, arguments) );
    }
});







baidu.array.extend({
    unique : function (fn) {
        var len = this.length,
            result = this.slice(0),
            i, datum;
            
        if ('function' != typeof fn) {
            fn = function (item1, item2) {
                return item1 === item2;
            };
        }
        
        // 从后往前双重循环比较
        // 如果两个元素相同，删除后一个
        while (--len > 0) {
            datum = result[len];
            i = len;
            while (i--) {
                if (fn(datum, result[i])) {
                    result.splice(len, 1);
                    break;
                }
            }
        }

        len = this.length = result.length;
        for ( i=0; i<len; i++ ) {
            this[ i ] = result[ i ];
        }

        return this;
    }
});




baidu.query = baidu.query || function(){
    var rId = /^(\w*)#([\w\-\$]+)$/
       ,rId0= /^#([\w\-\$]+)$/
       ,rTag = /^\w+$/
       ,rClass = /^(\w*)\.([\w\-\$]+)$/
       ,rComboClass = /^(\.[\w\-\$]+)+$/
       ,rDivider = /\s*,\s*/
       ,rSpace = /\s+/g
       ,slice = Array.prototype.slice;

    // selector: #id, .className, tagName, *
    function query(selector, context) {
        var t, x, id, dom, tagName, className, arr, list, array = [];

        // tag#id
        if (rId.test(selector)) {
            id = RegExp.$2;
            tagName = RegExp.$1 || "*";

            // 本段代码效率很差，不过极少流程会走到这段
            baidu.forEach(context.getElementsByTagName(tagName), function(dom) {
                dom.id == id && array.push(dom);
            });

        // tagName or *
        } else if (rTag.test(selector) || selector == "*") {
            baidu.merge(array, context.getElementsByTagName(selector));

        // .className
        } else if (rClass.test(selector)) {
            arr = [];
            tagName = RegExp.$1;
            className = RegExp.$2;
            t = " " + className + " ";
            // bug: className: .a.b

            if (context.getElementsByClassName) {
                arr = context.getElementsByClassName(className);
            } else {
                baidu.forEach(context.getElementsByTagName("*"), function(dom) {
                    dom.className && ~(" " + dom.className + " ").indexOf(t) && (arr.push(dom));
                });
            }

            if (tagName && (tagName = tagName.toUpperCase())) {
                baidu.forEach(arr, function(dom) {
                    dom.tagName.toUpperCase() === tagName && array.push(dom);
                });
            } else {
                baidu.merge(array, arr);
            }
        
        // IE 6 7 8 里组合样式名(.a.b)
        } else if (rComboClass.test(selector)) {
            list = selector.substr(1).split(".");

            baidu.forEach(context.getElementsByTagName("*"), function(dom) {
                if (dom.className) {
                    t = " " + dom.className + " ";
                    x = true;

                    baidu.forEach(list, function(item){
                        ~t.indexOf(" "+ item +" ") || (x = false);
                    });

                    x && array.push(dom);
                }
            });
        }

        return array;
    }

    // selector 还可以是上述四种情况的组合，以空格分隔
    // @return ArrayLike
    function queryCombo(selector, context) {
        var a, s = selector, id = "__tangram__", array = [];

        // 在 #id 且没有 context 时取 getSingle，其它时 getAll
        if (!context && rId0.test(s) && (a=document.getElementById(s.substr(1)))) {
            return [a];
        }

        context = context || document;

        // 用 querySelectorAll 时若取 #id 这种唯一值时会多选
        if (context.querySelectorAll) {
            // 在使用 querySelectorAll 时，若 context 无id将貌似 document 而出错
            if (context.nodeType == 1 && !context.id) {
                context.id = id;
                a = context.querySelectorAll("#" + id + " " + s);
                context.id = "";
            } else {
                a = context.querySelectorAll(s);
            }
            return a;
        } else {
            if (!~s.indexOf(" ")) {
                return query(s, context);
            }

            baidu.forEach(query(s.substr(0, s.indexOf(" ")), context), function(dom) { // 递归
                baidu.merge(array, queryCombo(s.substr(s.indexOf(" ") + 1), dom));
            });
        }

        return array;
    }

    return function(selector, context, results) {
        if (!selector || typeof selector != "string") {
            return results || [];
        }

        var arr = [];
        selector = selector.replace(rSpace, " ");
        results && baidu.merge(arr, results) && (results.length = 0);

        baidu.forEach(selector.indexOf(",") > 0 ? selector.split(rDivider) : [selector], function(item) {
            baidu.merge(arr, queryCombo(item, context));
        });

        return baidu.merge(results || [], baidu.array(arr).unique());
    };
}();















baidu.createChain("dom",

// method function


function(selector, context) {
    var e, me = new baidu.dom.$DOM(context);

    // Handle $(""), $(null), or $(undefined)
    if (!selector) {
        return me;
    }

    // Handle $($DOM)
    if (selector._type_ == "$DOM") {
        return selector;

    // Handle $(DOMElement)
    } else if (selector.nodeType || selector == selector.window) {
        me[0] = selector;
        me.length = 1;
        return me;

    // Handle $(Array) or $(Collection) or $(NodeList)
    } else if (selector.length && me.toString.call(selector) != "[object String]") {
        return baidu.merge(me, selector);

    } else if (typeof selector == "string") {
        // HTMLString
        if (selector.charAt(0) == "<" && selector.charAt(selector.length - 1) == ">" && selector.length > 2) {
            // Match a standalone tag
            var rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
                doc = context && context._type_ === '$DOM' ? context[0] : context,
                ret = rsingleTag.exec(selector);
            doc = doc && doc.nodeType ? doc.ownerDocument || doc : document;
            ret = ret ? [doc.createElement(ret[1])] : (baidu.dom.createElements ? baidu.dom.createElements( selector ) : []);
            baidu.merge( me, ret);
        // baidu.query
        } else {
            baidu.query(selector, context, me);
        }
    
    // document.ready
    } else if (typeof selector == "function") {
        return me.ready ? me.ready(selector) : me;
    }

    return me;
},

// constructor
function(context) {
    this.length = 0;
    this._type_ = "$DOM";
    this.context = context || document;
}

).extend({


    
    size: function() {
        return this.length;
    }

    // 2012.11.27 mz 拥有 .length 和 .splice() 方法，console.log() 就认为该对象是 ArrayLike
    ,splice : function(){}

    
    ,get: function(index) {

        if ( typeof index == "number" ) {
            return index < 0 ? this[this.length + index] : this[index];
        }

        return Array.prototype.slice.call(this, 0);
    }

    // 将 $DOM 转换成 Array(dom, dom, ...) 返回
    ,toArray: function(){
        return this.get();
    }

});







baidu.dom.extend({

    pushStack : function ( elems ) {
        var ret = baidu.dom();

        baidu.merge(ret, elems);

        ret.prevObject = this;
        ret.context = this.context;

        return ret;
    }
});

















baidu.dom.match = function(){
    var reg = /^[\w\#\-\$\.\*]+$/,

        // 使用这个临时的 div 作为CSS选择器过滤
        div = document.createElement("DIV");
        div.id = "__tangram__";

    return function( array, selector, context ){
        var root, results = baidu.array();

        switch ( baidu.type(selector) ) {
            // 取两个 TangramDom 的交集
            case "$DOM" :
                for (var x=array.length-1; x>-1; x--) {
                    for (var y=selector.length-1; y>-1; y--) {
                        array[x] === selector[y] && results.push(array[x]);
                    }
                }
                break;

            // 使用过滤器函数，函数返回值是 Array
            case "function" :
                baidu.forEach(array, function(item, index){
                    selector.call(item, index) && results.push(item);
                });
                break;
            
            case "HTMLElement" :
                baidu.forEach(array, function(item){
                    item == selector && results.push(item);
                });
                break;

            // CSS 选择器
            case "string" :
                var da = baidu.query(selector, context || document);
                baidu.forEach(array, function(item){
                    if ( root = getRoot(item) ) {
                        var t = root.nodeType == 1
                            // in DocumentFragment
                            ? baidu.query(selector, root)
                            : da;

                        for (var i=0, n=t.length; i<n; i++) {
                            if (t[i] === item) {
                                results.push(item);
                                break;
                            }
                        }
                    }
                });
                results = results.unique();
                break;

            default :
                results = baidu.array( array ).unique();
                break;
        }
        return results;

    };

    function getRoot(dom) {
        var result = [], i;

        while(dom = dom.parentNode) {
            dom.nodeType && result.push(dom);
        }

        for (var i=result.length - 1; i>-1; i--) {
            // 1. in DocumentFragment
            // 9. Document
            if (result[i].nodeType == 1 || result[i].nodeType == 9) {
                return result[i];
            }
        }
        return null;
    }
}();












baidu.dom.extend({
    filter : function (selector) {
        return this.pushStack( baidu.dom.match(this, selector) );
    }
});





















baidu.createChain("event",

    // method
    function(){
        var lastEvt = {};
        return function( event, json ){
            switch( baidu.type( event ) ){
                // event
                case "object":
                    return lastEvt.originalEvent === event ? 
                        lastEvt : lastEvt = new baidu.event.$Event( event );

                case "$Event":
                    return event;

                // event type
//                case "string" :
//                    var e = new baidu.event.$Event( event );
//                    if( typeof json == "object" ) 
//                        baidu.forEach( e, json );
//                    return e;
            }
        }
    }(),

    // constructor
    function( event ){
        var e, t, f;
        var me = this;

        this._type_ = "$Event";

        if( typeof event == "object" && event.type ){

            me.originalEvent = e = event;

            for( var name in e )
                if( typeof e[name] != "function" )
                    me[ name ] = e[ name ];

            if( e.extraData )
                baidu.extend( me, e.extraData );

            me.target = me.srcElement = e.srcElement || (
                ( t = e.target ) && ( t.nodeType == 3 ? t.parentNode : t )
            );

            me.relatedTarget = e.relatedTarget || (
                ( t = e.fromElement ) && ( t === me.target ? e.toElement : t )
            );

            me.keyCode = me.which = e.keyCode || e.which;

            // Add which for click: 1 === left; 2 === middle; 3 === right
            if( !me.which && e.button !== undefined )
                me.which = e.button & 1 ? 1 : ( e.button & 2 ? 3 : ( e.button & 4 ? 2 : 0 ) );

            var doc = document.documentElement, body = document.body;

            me.pageX = e.pageX || (
                e.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0)
            );

            me.pageY = e.pageY || (
                e.clientY + (doc && doc.scrollTop  || body && body.scrollTop  || 0) - (doc && doc.clientTop  || body && body.clientTop  || 0)
            );

            me.data;
        }

        // event.type
//        if( typeof event == "string" )
//            this.type = event;

        // event.timeStamp
        this.timeStamp = new Date().getTime();
    }

).extend({
    stopPropagation : function() {
        var e = this.originalEvent;
        e && ( e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true );
    },

    preventDefault : function() {
        var e = this.originalEvent;
        e && ( e.preventDefault ? e.preventDefault() : e.returnValue = false );
    }
});







baidu._util_ = baidu._util_ || {};


baidu._util_.eventBase = baidu._util_.eventBase || {};




void function( base, listener ){
    if( base.listener )return ;
    
    listener = base.listener = {};
    
    if( window.addEventListener )
        listener.add = function( target, name, fn ){
            target.addEventListener( name, fn, false );
        };
    else if( window.attachEvent )
        listener.add = function( target, name, fn ){
            target.attachEvent( "on" + name, fn );
        };
}( baidu._util_.eventBase );


void function( base, be ){
    if( base.queue )return ;

    var I = baidu.id;
    var queue = base.queue = {};
    var attaCache = queue.attaCache = baidu.global( "eventQueueCache" );
    var listener = base.listener;

    queue.get = function( target, type, bindType, attachElements ){
        var id = I( target ), c;

        if( !attaCache[id] )
            attaCache[id] = {};

        c = attaCache[id];

        if( type ){
            if( !c[type] && bindType ){
                this.setupCall( target, type, bindType, c[ type ] = [], attachElements );
            }
            return c[type] || [];
        }else return c;
    };

    queue.add = function( target, type, bindType, item, attachElements ){
        this.get( target, type, bindType, attachElements ).push( item );
    };

    queue.remove = function( target, type, fn ){
        var arr, c;
        if( type ){
            var arr = this.get( target, type );
            if( fn ){
                for(var i = arr.length - 1; i >= 0; i --)
                    if( arr[i].orig == fn )
                        arr.splice( i, 1 );
            }else{
                arr.length = 0;
            }
        }else{
            var c = this.get( target );
            for(var i in c)
                c[i].length = 0;
        }
    };
    
    queue.handlerList = function(target, fnAry){
        var handlerQueue = [];
        //对delegate进行处理，这里牺牲性能换取事件执行顺序
        for(var i = 0, item; item = fnAry[i]; i++){
            if(item.delegate
                && baidu.dom(item.delegate, target).size() < 1){
                continue;
            }
            handlerQueue.push(item);
        }
        return handlerQueue;
    }

    queue.call = function( target, type, fnAry, e ){
        if( fnAry ){
            if( !fnAry.length )
                return ;

            var args = [].slice.call( arguments, 1 ), one = [];
                args.unshift( e = baidu.event( e || type ) );          
                e.type = type;

            if( !e.currentTarget )
                e.currentTarget = target;

            if( !e.target )
                e.target = target;
                
            //这里加入判断处理delegate 过滤fnAry 类似jq的功能
            fnAry = queue.handlerList(target, fnAry);
            
            for( var i = 0, r, l = fnAry.length; i < l; i ++ )
                if(r = fnAry[i]){
                    r.pkg.apply( target, args );
                    if( r.one )
                        one.unshift( i );
                }

            if( one.length )
                for(var i = 0, l = one.length; i < l; i ++)
                    this.remove( target, type, fnAry[i].fn );
                
        }else{
            fnAry = this.get( target, type );
            this.call( target, type, fnAry, e );
        }
    };

    queue.setupCall = function(){
        var add = function( target, type, bindType, fnAry ){
            listener.add( target, bindType, function( e ){
                queue.call( target, type, fnAry, e );
            } );
        };
        return function( target, type, bindType, fnAry, attachElements ){
            if( !attachElements )
                add( target, type, bindType, fnAry );
            else{
                target = baidu.dom( attachElements, target );
                for(var i = 0, l = target.length; i < l; i ++)
                    add( target[i], type, bindType, fnAry );
            }
        };
    }();

}( baidu._util_.eventBase, baidu.event );


baidu._util_.cleanData = function(array){
    var tangId;
    for(var i = 0, ele; ele = array[i]; i++){
        tangId = baidu.id(ele, 'get');
        if(!tangId){continue;}
        baidu._util_.eventBase.queue.remove(ele);
        baidu.id(ele, 'remove');
    }
};




baidu.dom.extend({
    remove: function(selector, keepData){
        arguments.length > 0
            && baidu.check('^string(?:,boolean)?$', 'baidu.dom.remove');
        var array = selector ? this.filter(selector) : this;
        for(var i = 0, ele; ele = array[i]; i++){
           if(!keepData && ele.nodeType === 1){
               baidu._util_.cleanData(ele.getElementsByTagName('*'));
               baidu._util_.cleanData([ele]);
            }
            ele.parentNode && ele.parentNode.removeChild(ele);
        }
        return this;
    }
});












//IE 8下，以documentMode为准
//在百度模板中，可能会有$，防止冲突，将$1 写成 \x241

//baidu.browser.ie = baidu.ie = /msie (\d+\.\d+)/i.test(navigator.userAgent) ? (document.documentMode || + RegExp['\x241']) : undefined;











baidu.dom.extend({
    prepend: function(){
        baidu.check('^(?:string|function|HTMLElement|\\$DOM)(?:,(?:string|array|HTMLElement|\\$DOM))*$', 'baidu.dom.prepend');
        baidu._util_.smartInsert(this, arguments, function(child){
            this.nodeType === 1 && this.insertBefore(child, this.firstChild);
        });
        return this;
    }
});





magic.Background = baidu.lang.createClass(function(options){
    var opt = options || {}
        ,me = this;

    me.coverable = opt.coverable || false;    // 是否创建<iframe>覆盖<select>|Flash
    me.styleBox  = opt.styleBox;
    me.tagName     = "div";

    // 一个透明的层能够阻止鼠标“穿透”图层
    var _cssText = "filter:progid:DXImageTransform.Microsoft.Alpha(opacity:0);position:absolute;z-index:-1;top:0;left:0;width:100%;height:100%;";
    me._coverDom = "<div style='"+ _cssText +"opacity:0;background-color:#FFFFFF'></div>";

    // 针对IE浏览器需要用一个定时器来维持高宽的正确性
    var bb = baidu.browser;
    bb.ie < 7 && (me._coverDom = "<iframe frameborder='0' style='"+ _cssText +"' src='about:blank'></iframe>");
    if (bb.ie && (!bb.isStrict || bb.ie < 8)) {
        me.size  = [0,0];
        me.timer = setInterval(function(){me._forIE()}, 80);
    }
    this._innerHTML = "<div class='tang-background-inner' style='width:100%;height:100%;' id='"+ this.$getId("inner")+"'></div>";
}, {
    type : "magic.Background"
    ,superClass : magic.Base
})
.extend(

{
    
    render : function(container) {
        var box = baidu.dom(container).get(0);

        box != document.body
            && baidu.dom(box).css('position')=="static"
            && (box.style.position="relative");
        baidu.dom(box).prepend(this.toHTMLString());
    },

    
    $dispose: function(){
        var layer = this.getElement();
        layer.parentNode.removeChild(layer);
        clearInterval(this.timer);
    }

    
    ,toHTMLString : function(tagName) {
        return [
            "<",(tagName||this.tagName)," class='tang-background"
            ,(baidu.browser.ie < 7 ?" ie6__":""),"' id='",this.$getId()
            ,"' style='position:absolute; top:0px; left:0px;"
            ,(this.timer ? "width:10px;height:10px;" : "width:100%;height:100%;")
            ,"z-index:-9; -webkit-user-select:none; -moz-user-select:none;' "
            ,"onselectstart='return false'>", this._innerHTML
            ,(this.coverable ? this._coverDom || "" : "")
            ,"</",(tagName||this.tagName),">"
        ].join("");
    }
    
    ,setContent : function(content){
        this.getElement("inner").innerHTML = content;
    }

    
    ,_forIE : function(){
        if (this.guid && this.layer || ((this.layer = this.getElement()) && this.layer.offsetHeight)) {
            var bgl = this.layer;
            var box = this.container || bgl.parentNode;
            // 在 dispose 后取不到 parentNode 会报错 20120207
            if (box && box.style) {
                var  bs = box.style
                    ,bt = parseInt(bs.borderTopWidth) || 0
                    ,br = parseInt(bs.borderRightWidth) || 0
                    ,bb = parseInt(bs.borderBottomWidth) || 0
                    ,bl = parseInt(bs.borderLeftWidth) || 0

                    ,w = box.offsetWidth  - br - bl
                    ,h = box.offsetHeight - bt - bb;

                if (this.size[0] != w || this.size[1] != h) {
                    bgl.style.width = (this.size[0] = w) + "px";
                    bgl.style.height= (this.size[1] = h) + "px";
                }

                // 20120207 meizz 针对IE对于Table行高分配不公的处理
                if (this.styleBox && this.table || (this.table = this.getElement("table"))) {
                    var h0, h1, h2;
                    h0 = h0 || parseInt(baidu.dom(this.table.rows[0]).getCurrentStyle("height"));
                    h2 = h2 || parseInt(baidu.dom(this.table.rows[2]).getCurrentStyle("height"));
                    this.table.rows[0].style.height = h0 +"px";
                    this.table.rows[2].style.height = h2 +"px";
                    this.table.rows[1].style.height = (this.layer.offsetHeight - h0 - h2) +"px";
                }
            }
        }
    }
});

// 20111214    meizz    添加<iframe>达到在IE6下遮挡<select>和Flash的效果
// 20111215 meizz    添加一个透明的DIV层，阻止鼠标事件“穿透”图层
// 20120105 xzh        修改注释









baidu.object.isPlain  = baidu.isPlainObject;






baidu.fn.blank = function () {};

/// support magic - Tangram 1.x Code Start

/// support magic - Tangram 1.x Code Start




baidu.i18n = baidu.i18n || {};
/// support magic - Tangram 1.x Code End

baidu.i18n.cultures = baidu.i18n.cultures || {};
/// support magic - Tangram 1.x Code End




baidu.i18n.cultures['zh-CN'] = baidu.object.extend(baidu.i18n.cultures['zh-CN'] || {}, function(){
    var numArray = '%u4E00,%u4E8C,%u4E09,%u56DB,%u4E94,%u516D,%u4E03,%u516B,%u4E5D,%u5341'.split(',');
    //
    return {
        calendar: {
            dateFormat: 'yyyy-MM-dd',
            titleNames: '#{yyyy}'+ unescape('%u5E74') +'&nbsp;#{MM}' + unescape('%u6708'),
            monthNamesShort: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            monthNames: function(){
                var len = numArray.length, ret = [];
                for(var i = 0; i < 12; i++){
                    ret.push(unescape(numArray[i] || numArray[len - 1] + numArray[i - len]));
                }
                return ret;
            }(),
            dayNames: function(){
                var key = {mon: 0, tue: 1, wed: 2, thu: 3, fri: 4, sat: 5, sun: '%u65E5'};
                for(var i in key){
                    key[i] = unescape(numArray[key[i]] || key[i]);
                }
                return key;
            }()
        },
        timeZone: 8,
        whitespace: new RegExp("(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+\x24)", "g"),
        number: {
            group: ',',
            groupLength: 3,
            decimal: ".",
            positive: '',
            negative: '-',
    
            _format: function(number, isNegative){
                return baidu.i18n.number._format(number, {
                    group: this.group,
                    groupLength: this.groupLength,
                    decimal: this.decimal,
                    symbol: isNegative ? this.negative : this.positive 
                });
            }
        },
    
        currency: {
            symbol: unescape('%uFFE5')
        },
    
        language: function(){
            var ret = {ok: '%u786E%u5B9A', cancel: '%u53D6%u6D88', signin: '%u6CE8%u518C', signup: '%u767B%u5F55'};
            for(var i in ret){
                ret[i] = unescape(ret[i]);
            }
            return ret;
        }()
    };
}());
baidu.i18n.currentLocale = 'zh-CN';

/// support magic - Tangram 1.x Code Start








baidu.page.getViewHeight = function () {
    var doc = document,
        ie = baidu.browser.ie || 1,
        client = doc.compatMode === 'BackCompat'
            && ie < 9 ? doc.body : doc.documentElement;
        //ie9浏览器需要取得documentElement才能取得到正确的高度
    return client.clientHeight;
};
/// support magic - Tangram 1.x Code End

/// support magic - Tangram 1.x Code Start






baidu.page.getViewWidth = function () {
    var doc = document,
        client = doc.compatMode == 'BackCompat' ? doc.body : doc.documentElement;

    return client.clientWidth;
};
/// support magic - Tangram 1.x Code End















magic.Dialog = baidu.lang.createClass(function(options){
    
}, { type: "magic.Dialog", superClass : magic.control.Dialog });


magic.Dialog.extend(

{
    
    render: function(el){
        var customContainer = true;
        if(baidu.type(el) === "string"){
            el = '#' + el;
        }
        el = baidu(el)[0];
        if(!el)
            document.body.appendChild(el = document.createElement("div")),
            customContainer = false;
        var template = magic.Dialog.template.join(""), options = this._options;
        baidu(el).addClass("tang-ui tang-dialog").css('display', 'block');

        // var content = "";
        // if(typeof this.content == "string")
        //     content = this.content;

        baidu(el).append(baidu.string.format(template, {
            content: "",
            titleId: this.$getId("title"),
            bodyId: this.$getId("body"),
            contentId: this.$getId("content"),
            foregroundId: this.$getId("foreground"),
            footerId: this.$getId("footer"),
            footerContainerId: this.$getId("footerContainer")
        }));
        this._background = new magic.Background({ coverable: true });
        this._background.render(el);

        this.$mappingDom("", el);

        this._renderHeader();
        this._titleHeight = this.getElement("title").offsetHeight || 30;

        baidu(this.getElement("footer")).hide();
        //派发底部渲染事件，仅供内部使用
        this.fire("footer");

        this.setSize(options);
        this.setPosition(options);

        if(options.content)
            this.setContent(options.content, options.contentType);
          
        this.fire("load");
        this.show();

        this.disposeProcess.push(
            function(){
                baidu(this.getElement("closeBtn")).off("click", this._closeBtnFn);
                this._background.$dispose();
                el.innerHTML = "";
                baidu(el).removeClass("tang-ui tang-dialog");
                customContainer || document.body.removeChild(el);
            }
        );
    },
    
    _renderHeader:function(){
        var template = [
            "<div class='buttons' id='",this.$getId("titleButtons"),"'>",
                "<a id='",this.$getId("closeBtn"),"' class='close-btn' href='' onmousedown='event.stopPropagation && event.stopPropagation(); event.cancelBubble = true; return false;' onclick='return false;'></a>",
            "</div>",
            "<span id='",this.$getId("titleText"),"'>",baidu.string.encodeHTML(this._options.titleText || "") || "&nbsp;","</span>"];
        baidu(this.getElement("title")).append(template.join(""));
        baidu(this.getElement("closeBtn")).on("click", this._closeBtnFn = baidu.fn.bind(this.hide, this));
    }
});

magic.Dialog.template = [
    "<div class='tang-foreground' id='#{foregroundId}'>",
        "<div class='tang-title' id='#{titleId}'>",
        "</div>",
        "<div class='tang-body' id='#{bodyId}'>",
            "<div class='tang-content' id='#{contentId}'>#{content}</div>",
        "</div>",
        "<div class='tang-footer' id='#{footerId}'>",
            "<div id='#{footerContainerId}'></div>",
        "</div>",
    "</div>"];





(function(){
    magic.setup = magic.setup || function(el, Type, options){
        // 从HTML标签属性 tang-param 里分解出用户指定的参数
        var opt = parseAttr(el, "tang-param") || {};

        // 脚本里直接指定的参数权重要高于HTML标签属性里的tang-param
        for (var i in options) opt[i] = options[i];

        var ui = new Type(opt);
        ui.$mappingDom("", el);

        // 添加DOM元素直接调用实例方法的模式    20111205 meizz
        // tang-event="onclick:$.hide()"
        attachEvent(el, ui.guid);
        var doms = el.getElementsByTagName("*");
        for (var i = doms.length - 1; i >= 0; i--) {
            attachEvent(doms[i], ui.guid);
        };

        return ui;
    };

    // 解析DOM元素标签自定义属性值，返回 JSON 对象
    function parseAttr(el, attr) {
        var str = el.getAttribute(attr), keys, json = false;

        if (str && (keys = str.match(reg[0]))) {
            json = {};
            for (var i = 0, a; i < keys.length; i++) {
                a = keys[i].match(reg[1]);

                // Number类型的处理
                !isNaN(a[2]) && (a[2] = +a[2]);

                // 去引号
                reg[2].test(a[2]) && (a[2] = a[2].replace(reg[3], "\x242"));

                // Boolean类型的处理
                reg[4].test(a[2]) && (a[2] = reg[5].test(a[2]));

                json[a[1]] = a[2];
            };
        }
        return json;
    }
    var reg = [
        /\b[\w\$\-]+\s*:\s*[^;]+/g         
        ,/([\w\$\-]+)\s*:\s*([^;]+)\s*/    
        ,/\'|\"/                         
        ,/^\s*(\'|\")([^\1]*)\1\s*/        
        ,/^(true|false)\s*$/i            
        ,/\btrue\b/i                     
    ]

    // 解析 DOM 元素标签属性 tang-event ，动态绑定事件
    function attachEvent(el, guid) {
        var json = parseAttr(el, "tang-event");
        if (json) {
            for (var i in json) {
                var method = json[i].substr(1);
                // 如果用户已经指定参数，有效
                method.indexOf("(") < 0 && (method += "()");
                baidu.dom(el).on(i, new Function("baiduInstance('"+guid+"') && baiduInstance('"+guid+"')"+method));
            }
        }
    }
})();







 





baidu.base.register = function (Class, constructorHook, methods) {
    (Class._reg_ || (Class._reg_ = [])).push( constructorHook );

    for (var method in methods) {
        Class.prototype[method] = methods[method];
    }
};

// 20111221 meizz   修改插件函数的存放地，重新放回类构造器静态属性上
// 20111129    meizz    添加第三个参数，可以直接挂载方法到目标类原型链上


/// support magic - Tangram 1.x Code Start





baidu.lang.register = baidu.base.register;

// 20111221 meizz   修改插件函数的存放地，重新放回类构造器静态属性上
// 20111129    meizz    添加第三个参数，可以直接挂载方法到目标类原型链上
/// support magic - Tangram 1.x Code End

 

 

 















baidu.dom.extend({
    children : function (selector) {
        var a = [];

        this.each(function(){
            baidu.forEach(this.children || this.childNodes, function(dom){
                dom.nodeType == 1 && a.push(dom);
            });
        });

        return this.pushStack( baidu.dom.match(a, selector) );
    }
});

/// Tangram 1.x Code Start

baidu.dom.children = function(dom) {
    baidu.check("string|HTMLElement","baidu.dom.children");
    return baidu.dom( baidu.isString(dom) ? "#"+ dom : dom ).children().toArray();
};
/// Tangram 1.x Code End

 

 

 
 

 baidu.lang.register(magic.control.Dialog, 
     function(options){
        options && options.buttons && options.buttons.enable && this.on("footer", function(){
            
            this.buttons = null,
            baidu(this.getElement("footer")).show();
            this._createButton(options.buttons);
            baidu(this.getElement("footerContainer")).addClass("tang-footerContainer");
            var h = this.getElement("footer").offsetHeight;
            (!this.buttons || this.buttons.length == 0) && (h = 30) && baidu(this.getElement("footer")).css('height', 30); 
            this._footerHeight = h;
        });
    },
    {
        
        _createButton: function(){
            var me = this,
                btnConfig = arguments.length > 0 ? arguments[0] : {},
                footerContainer = baidu(me.getElement("footerContainer")),
                buttons = me.buttons || (me.buttons = []),
                hasFocused = false,
                _defaultCreator = (function(){
                    var btnTemplate = ['<a href="#" onClick="return false;" class="tang-dialog-button ','','">',
                                        '<span class="tang-dialog-button-s">',
                                            '<span class="tang-dialog-button-s-space">&nbsp;</span>',
                                            '<span class="tang-dialog-button-s-text">','','</span>',
                                        '</span>',
                                        '</a>'];
                    return function(btnOptions, anchor){
                        btnOptions.disabled ? (btnTemplate[1] = 'tang-dialog-button-disabled') : (btnTemplate[1] = '');
                        btnTemplate[6] = btnOptions.text || '&nbsp;';
                        baidu(anchor).append(btnTemplate.join(''));
                        return     baidu(anchor).children().get(0);                            
                    };
                })();
            baidu.forEach(btnConfig.items || [], function(item, index){
                var clickFn, node;
                footerContainer.append(node = baidu('<span class="tang-dialog-button-carrier"></span>')[0]);
                node = typeof item == "object" ? (item.builder || _defaultCreator).call(this, item, node, me, index) : item;
                !hasFocused && item.focused && !item.disabled && (hasFocused = true) && node.focus();
                buttons.push(node);
                item.disabled || item.click && baidu(node).on('click', clickFn = function(){
                    item.click.call(this, me);
                });
                clickFn && this.disposeProcess.push(function(){
                    baidu(node).off('click', clickFn);
                });
            }, me);
            
            footerContainer.addClass("tang-button-" + (btnConfig.align||'right'));
        }
    }
);

(function(){
    
    var disposeProcess = [];
    
    function dispose(){
        for(var i = 0, l = disposeProcess.length; i < l; i ++)
            disposeProcess[i]();
        disposeProcess = [];
    }

    function createMask(){
        var ie = baidu.browser.ie;
        var mask = document.createElement('div');
        mask.className = 'tang-mask';
        ie == 6 && baidu(mask).css('position', 'absolute');
        baidu(mask).css("zIndex", baidu.global.getZIndex("dialog", -5));
        

        document.body.appendChild(mask);

        function resize(){
            mask.style.display = 'none';
            baidu(mask).css('height', baidu.page.getViewHeight() + 'px');
            baidu(mask).css('width', baidu.page.getViewWidth() + 'px');
            mask.style.display = '';
        }

        function position(){
            mask.style.display = 'none';
            baidu(mask).css('top', baidu.page.getScrollTop() + 'px');
            baidu(mask).css('left', baidu.page.getScrollLeft() + 'px');
            mask.style.display = '';
        }

        resize();
        ie == 6 && position();

        baidu(window).on('resize', resize);
        disposeProcess.push(function(){
            baidu(window).off('resize', resize);
        });
        ie == 6 && baidu(window).on("scroll", position);
        ie == 6 && disposeProcess.push(function(){
            baidu(window).off('scroll', position);
        });

        disposeProcess.push(function(){
            document.body.removeChild(mask);
        });
    }

    
    magic.Dialog.alert = function(){
        
        var okConfig = {},
            defaultOptions = {
                width: 360,
                height: 140,
                titleText: "",
                content: "",
                buttons: {
                    enable: true,
                    items: [
                        okConfig
                    ]
                }
            },
            customOptions = {}, 
            ok_button_callback, closeclickFn, keyFn, alert_el;
        
        //将参数列表转化为配置项
        if(!baidu.object.isPlain(arguments[0])){
            arguments[0] && (customOptions.content = arguments[0]);
            arguments[1] && (customOptions.titleText = arguments[1]);
            arguments[2] && (customOptions.ok = arguments[2]);
        }else{
            customOptions = arguments[0];
        }

        if(baidu.object.isPlain(customOptions.ok)){
            okConfig.text = customOptions.ok.label;
            ok_button_callback = customOptions.ok.callback;
        }else{
            okConfig.text = baidu.i18n.cultures[baidu.i18n.currentLocale].language.ok;
            ok_button_callback = customOptions.ok;
        }
        ok_button_callback || (ok_button_callback = baidu.fn.blank);
        customOptions.ok = null;
        delete customOptions.ok;

        baidu.object.extend(defaultOptions, customOptions || {});

        var instance = new magic.Dialog(defaultOptions);

        okConfig.click = function(){
            dispose();
            ok_button_callback.call(instance);
        };
        
        instance.render();
        instance.center();

        alert_el = baidu('#' + instance.$getId());
        //关闭按钮
        baidu(instance.getElement('closeBtn')).on('click', closeclickFn = function(){
                    dispose();
                    ok_button_callback.call(instance);
                });
        disposeProcess.push(function(){
            baidu(instance.getElement('closeBtn')).off('click', closeclickFn);
        });

        //键盘快捷键
        baidu(document).on("keydown", keyFn = function(e){
            e = e || window.event;
            switch (e.keyCode) {
                case 27:    //esc
                    okConfig.click();
                    break;
                case 13:    //enter
                    e.preventDefault();
                    e.stopPropagation();
                    okConfig.click();
                    break;
                default:
                    break;
            }
        });
        disposeProcess.push(function(){
            baidu(document).off("keydown", keyFn);
        });


        disposeProcess.push(function(){
            instance.$dispose();
        });

        createMask();

        return instance;
    };
    magic.alert = magic.Dialog.alert;


    
    magic.Dialog.confirm = function(){
        
        var okConfig = {},
            cancelConfig = {},
            defaultOptions = {
                width: 360,
                height: 140,
                titleText: "",
                content: "",
                buttons:{
                    enable: true,
                    items: [
                        okConfig,
                        cancelConfig
                    ]
                }
            },
            customOptions = {},
            ok_button_callback,
            cancel_button_callback, 
            closeclickFn, keyFn;
        
        //将参数列表转化为配置项
        if(!baidu.object.isPlain(arguments[0])){
            arguments[0] && (customOptions.content = arguments[0]);
            arguments[1] && (customOptions.titleText = arguments[1]);
            arguments[2] && (customOptions.ok = arguments[2]);
            arguments[3] && (customOptions.cancel = arguments[3]);
        }else{
            customOptions = arguments[0];
        }
        
        if(baidu.object.isPlain(customOptions.ok)){
            okConfig.text = customOptions.ok.label;
            ok_button_callback = customOptions.ok.callback;
        }else{
            okConfig.text = baidu.i18n.cultures[baidu.i18n.currentLocale].language.ok;
            ok_button_callback = customOptions.ok;
        }

        if(baidu.object.isPlain(customOptions.cancel)){
            cancelConfig.text = customOptions.cancel.label;
            cancel_button_callback = customOptions.cancel.callback;
        }else{
            cancelConfig.text = baidu.i18n.cultures[baidu.i18n.currentLocale].language.cancel;
            cancel_button_callback = customOptions.cancel;
        }
        ok_button_callback || (ok_button_callback = baidu.fn.blank);
        customOptions.ok = null;
        delete customOptions.ok;
        cancel_button_callback || (cancel_button_callback = baidu.fn.blank);
        customOptions.cancel = null;
        delete customOptions.cancel;

        baidu.object.extend(defaultOptions, customOptions || {});

        var instance = new magic.Dialog(defaultOptions);

        okConfig.click = function(){
            ok_button_callback.call(instance);
            dispose();
        };
        cancelConfig.click = function(){
            cancel_button_callback.call(instance);
            dispose();
        };

        instance.render();
        instance.center();
        
        var confirm_el = baidu('#' + instance.$getId());

        //关闭按钮
        baidu(instance.getElement('closeBtn')).on('click', closeclickFn = function(){
                    dispose();
                    cancel_button_callback.call(instance);
                });
        disposeProcess.push(function(){
            baidu(instance.getElement('closeBtn')).off('click', closeclickFn);
        });
        //键盘快捷键
        baidu(document).on("keydown", keyFn = function(e){
            e = e || window.event;
            switch (e.keyCode) {
                case 27:    //esc
                    cancelConfig.click();
                    break;
                case 13:    //enter
                    e.preventDefault();
                    e.stopPropagation();
                    okConfig.click();
                    break;
                default:
                    break;
            }
        });
        disposeProcess.push(function(){
            baidu(document).off("keydown", keyFn);
        });
        
        disposeProcess.push(function(){
            instance.$dispose();
        });
        createMask();

        return instance;
    };
    magic.confirm = magic.Dialog.confirm;
})();














magic.setup.background = function(el, options){
    var opt = options || {};

    var bg = magic.setup(baidu.dom(el).get(0)||el, magic.Background, opt);

    var y = bg.getElement(), s=y.style, yp=y.parentNode;
    s.top = "0px";
    s.left = "0px";
    s.width = bg.timer ? "10px" : "100%";
    s.height = bg.timer ? "10px" : "100%";
    s.position = "absolute";
    s.zIndex = -9;

    bg.coverable && baidu.dom(y).append(bg._coverDom||"");
    yp != document.body
        && baidu.dom(yp).css("position")=="static"
        && (yp.style.position="relative");

    return bg;
};









magic.setup.dialog = function(el, options){
    if(baidu.type(el) === "string"){
        el = '#' + el;
    }
    el = baidu(el)[0];
    var opt = options || {};
    
    var instance = magic.setup(el, magic.control.Dialog, opt),
        container = instance.getElement(),
        cls = el.childNodes, node;

    for(var i = 0, l = cls.length; i < l; i ++){
        if(cls[i].nodeType != 3 && ~ cls[i].className.indexOf("tang-background")){
            magic.setup.background(cls[i], { coverable: true });
            break;
        }
    }

    instance.$mappingDom("title", baidu(".tang-title", container)[0]);
    instance.$mappingDom("titleText", baidu("span", instance.getElement("title"))[0]);
    instance.$mappingDom("titleButtons", baidu(".buttons", instance.getElement("title"))[0]);
    instance.$mappingDom("body", baidu(".tang-body", container)[0]);
    instance.$mappingDom("content", baidu(".content", instance.getElement("body"))[0]);
    instance.$mappingDom("closeBtn", baidu(".close-btn", instance.getElement("title"))[0]);
    instance.$mappingDom("foreground", baidu(".tang-foreground", container)[0]);
    instance.$mappingDom("footer", (node = baidu(".tang-footer", container))[0]);
    instance.$mappingDom("footerContainer", node.children()[0]);
    node.hide();

    // instance.$mappingDom("background", baidu(".tang-background", container)[0]);
    instance._titleHeight = instance.getElement("title").offsetHeight || 30;

    //派发底部渲染
    instance.fire("footer");
    
    var opts = instance._options;
    if(typeof opt.left == "undefined")
        opts.left = baidu(container).css("left") == "auto" ? 0 : baidu(container).css("left");
    if(typeof opt.top == "undefined")
        opts.top = baidu(container).css("top") == "auto" ? 0 : baidu(container).css("top");

    if(typeof opts.width != "number")
        opts.width = container.clientWidth;
    if(typeof opts.height != "number")
        opts.height = container.clientHeight;

    if(opts.width < 100)
        opts.width = 100;
    if(opts.height < 100)
        opts.height = 100;

      
    instance.fire("load");
    instance.show();

    if(opts.titleText)
        instance.setTitleText(opts.titleText);
    if(opts.content)
        instance.setContent(opts.content, opts.contentType || "html");
            
    return instance;
};




























//(function(){
//    var ua = navigator.userAgent;
    
    
    
//    baidu.browser.safari = /(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(ua) && !/chrome/i.test(ua) ? + (RegExp['\x241'] || RegExp['\x242']) : undefined;
//})();





magic.Mask = function(options){
    var me = this;
    magic.control.Layer.call(this);

    me.zIndex = 999;
    me.opacity = 0.3;
    me.bgColor = "#000000";
    me.coverable = false;
    me.container = document.body;

    baidu.object.extend(me, options || {});

    var sf = baidu.browser.safari,
        ie = baidu.browser.ie;
        
    baidu.dom(me.container).prepend(me.toHTMLString());
    
    if(ie == 6){
        me.getElement().style.position = "absolute";
    }
    
    
    function resize(){
        if (me.container == document.body) {
            var ls = me.getElement().style;
                
            ls.display = "none";
            me.setSize([baidu.page.getViewWidth(), baidu.page.getViewHeight()]);
            ls.display = "";
        }
    }
    
    
    function scroll(){
        if (me.container == document.body) {
            var ls = me.getElement().style;
            ls.display = "none";
            ls.top = baidu.page.getScrollTop()  + "px";
            ls.left = baidu.page.getScrollLeft() + "px";
            ls.display = "";
        }
    }

    
    function showObjects(bool){
        var objects = document.getElementsByTagName("object");
        var v = bool ? "visible" : "hidden";
        for(var i = 0, o, l = objects.length; i < l; i ++){
            o = objects[i];
            o.style.visibility = v;
        }
    }

    me.on("show", function(){
        resize();
        ie == 6 && scroll();
        baidu.dom(window).on("resize", resize);
        ie == 6 && baidu.dom(window).on("scroll", scroll);

        var es = me.getElement().style;
        es.opacity = me.opacity;
        es.zIndex = me.zIndex;
        es.filter = "alpha(opacity=" + me.opacity * 100 + ")";
        es.backgroundColor = me.bgColor;
        sf && showObjects(false);
    });

    me.on("hide", function(){
        baidu.dom(window).off("resize", resize);
        ie == 6 && baidu.dom(window).off("scroll", scroll);
        sf && showObjects(true);
    });

};
baidu.lang.inherits(magic.Mask, magic.control.Layer, "magic.Mask").extend(

{
    
    toHTMLString : function(){
        return "<div id='"+this.$getId()+"' style='top:0px; left:0px; position:fixed; display:none;'>"
            +("<iframe frameborder='0' style='"
            +"filter:progid:DXImageTransform.Microsoft.Alpha(opacity:0);"
            +"position:absolute;top:0px;left:0px;width:100%;height:100%;z-index:-1' "
            +"src='about:blank'></iframe><div style='position:absolute;top:0px;left:0px;width:100%;height:100%;z-index:-1;'>&nbsp;</div>") +"</div>";
    },
    
    $dispose: function(){
        var layout = this.getElement();

        this.fire('hide');
        // TODO 补充用例
        layout.parentNode.removeChild(layout);
    }
});





baidu.lang.register(magic.control.Dialog, 
     function(options){
        if(options && options.mask && options.mask.enable){
            this.renderMask();

            this.on("load", function(){
                if(! this._options.left )
                    this.center();
            });

            this.on("show", function(){
                this.showMask();
            });

            this.on("hide", function(){
                this.hideMask();
            });

            this.disposeProcess.push(function(){
                this._mask.$dispose();
            });
        }
    },

     {
        
        renderMask: function(){
            if(this._mask)
                return this;
            var maskOpt = this._options.mask;
            this._mask = new magic.Mask({
                opacity: maskOpt.opacity || .15,
                bgColor: maskOpt.bgColor || "#000",
                zIndex: this.zIndex - 1
            });
            return this;
        },

        
        showMask: function(){
            this._mask.show();
            return this;
        },

        
        hideMask: function(){
            this._mask.hide();
            return this;
        }
    }
);

















baidu.dom.extend({
    parent : function (filter) {
        var array = [];

        baidu.forEach(this, function(dom) {
            (dom = dom.parentNode) && dom.nodeType == 1 && array.push(dom);
        });

        return this.pushStack( baidu.dom.match(array, filter) );
    }
});






























baidu.dom.extend({
    outerHeight: function(margin){
        if(this.size()<=0){return 0;}
        var ele = this[0],
            type = ele != null && ele === ele.window ? 'window'
                : (ele.nodeType === 9 ? 'document' : false);
        return type ? baidu._util_.getWindowOrDocumentWidthOrHeight(ele, type, 'height')
            : baidu._util_.getWidthOrHeight(ele, 'height', 'padding|border' + (margin ? '|margin' : ''));
    }
});








baidu.dom.extend({
    outerWidth: function(margin){
        if(this.size()<=0){return 0;}     
        var ele = this[0],
            type = ele != null && ele === ele.window ? 'window'
                : (ele.nodeType === 9 ? 'document' : false);
        return type ? baidu._util_.getWindowOrDocumentWidthOrHeight(ele, type, 'width')
            : baidu._util_.getWidthOrHeight(ele, 'width', 'padding|border' + (margin ? '|margin' : ''));
    }
});



















 
baidu.dom.extend({
    contains : function(contained) {
        var container = this[0];
            contained = baidu.dom(contained)[0];
        if(!container || !contained){return false;}
        return baidu._util_.contains(container, contained);
    }    
});





/// Tangram 1.x Code Start

baidu.dom._g = function(id){
    return baidu.type(id) === 'string' ? document.getElementById(id) : id;
};
/// Tangram 1.x Code End


/// Tangram 1.x Code Start
baidu.dom.contains = function (container, contained) {
    var g = baidu.dom._g;
    return baidu._util_.contains(g(container), g(contained));
};
/// Tangram 1.x Code End










baidu.array.extend({
    indexOf : function (match, fromIndex) {
        baidu.check(".+(,number)?","baidu.array.indexOf");
        var len = this.length;

        // 小于 0
        (fromIndex = fromIndex | 0) < 0 && (fromIndex = Math.max(0, len + fromIndex));

        for ( ; fromIndex < len; fromIndex++) {
            if(fromIndex in this && this[fromIndex] === match) {
                return fromIndex;
            }
        }
        
        return -1;
    }
});









magic.control.Tooltip = baidu.lang.createClass(
    function(options) {
        var me = this,
            opt = me._options = baidu.object.extend({
                autoHide: true,
                hasCloseBtn: true,
                hasArrow: true,
                offsetX: 0,
                offsetY: 0,
                target: null,
                content: "",
                showEvent: 'mouseover,focus',
                hideEvent: 'mouseout,blur',
                position: 'bottom',
                arrowPosition: null
            }, options || {});
        //显示状态
        me._isShow = false;
        me._refresh = false;
        me.styleBox = true;

        me.on("load", function(){
            me._posInfo = baidu.array(['top', 'bottom', 'left', 'right']);
            me._posCache = {};
            me._eventList = [];
            //箭头在背景上产生的间隙
            me.arrowPosGap = {top: 1, bottom: 5, left: 3, right: 5};
            //事件处理
            var eventDeal = me._eventDeal = function(eventName, eventHandler, node, events){
                    eventName = eventName && baidu.string(eventName).trim();
                    eventName = eventName.replace(',', ' ');
                    if(eventName){
                        var destroy = function(){node.off(eventName, eventHandler); };
                        node.on(eventName, eventHandler);
                        events ? events.push(destroy) : me.on('dispose', destroy);
                    }
                },
                resizeHandler = function(){
                    me._refresh = true;
                    opt.autoHide && me.hide();
                },
                ESC_KEY_CODE = 27, //escape key
                showHandler = baidu.fn.bind('show', me),
                hideHandler = baidu.fn.bind('hide', me);
            //自定义事件绑定
            me._bindCustomEvent(opt.target);
            //关闭按钮            
            opt.hasCloseBtn ? eventDeal('click', hideHandler, baidu(me.getElement("close"))) : baidu(me.getElement("close")).hide();
            //自动隐藏
            opt.autoHide && (eventDeal('scroll', hideHandler, baidu(document)) || eventDeal('click', hideHandler, baidu(document)) || eventDeal('keydown', function(e){
                //escape
                e.keyCode == ESC_KEY_CODE && me.hide();
            }, baidu(document)));
            //resize操作
            eventDeal('resize', resizeHandler, baidu(window));
            //自定义事件销毁
            me.on("dispose", function(){
                for(var i = 0, l = me._eventList.length; i < l; i ++)
                    me._eventList[i].call(me);
            });
            //箭头是否可见
            var arrow = baidu(me.getElement("arrow"));
            opt.hasArrow && arrow.addClass("arrow-" + me._getOpositePos(opt.position)) || arrow.hide();
            //内容处理
            opt.content && me._setContent(opt.content);

            var timelimit = 0, imgDitect = /<img\s[\w\=\"\/\.\_\:]*\/?>\w*(<\/img>)?/ig;

            //需要请求图片资源,图片大小信息之前是取不着的
            typeof opt.content == 'string' && imgDitect.test(opt.content) && (timelimit = 150);
            //位置处理
            setTimeout(function(){
                me.reposition();
            }, timelimit);
        });
    },
     { 
        type: "magic.control.Tooltip",
        superClass: magic.Base
    }).extend(
    
    {
        
        _calcTop: function(target, tpos, node, arrow){
            var marginLeft = parseFloat(target.css("margin-left")),
                marginTop = parseFloat(target.css("margin-top")),
                opt = this._options;
            isNaN(marginLeft) && (marginLeft = 0);
            isNaN(marginTop) && (marginTop = 0);
            return {top: tpos.top + marginTop - node.outerHeight(true) - (opt.hasArrow ? arrow.outerHeight(true) - this.arrowPosGap.bottom: 0) + opt.offsetY,
                    left: tpos.left + marginLeft + opt.offsetX,
                    position: 'top'};
        },

        
        _calcArrowTop: function(node, arrow){
            return this._arrowPos('left', 'bottom', {start:2, end:node.outerWidth(true) - arrow.outerWidth(true) - 7, gap: this.arrowPosGap.bottom}, true);
        },

        
        _calcBottom: function(target, tpos, node, arrow){
            var marginLeft = parseFloat(target.css("margin-left")),
                marginBottom = parseFloat(target.css("margin-bottom")),
                opt = this._options;
            isNaN(marginLeft) && (marginLeft = 0);
            isNaN(marginBottom) && (marginBottom = 0);    
            return {top: tpos.top - marginBottom + target.outerHeight(true) + (opt.hasArrow ? arrow.outerHeight(true) - this.arrowPosGap.top : 0) + opt.offsetY,
                    left: tpos.left + marginLeft + opt.offsetX,
                    position: 'bottom'};
        },

        
        _calcArrowBottom: function(node, arrow){
            return this._arrowPos('left', 'top', {start:2, end:node.outerWidth(true) - arrow.outerWidth(true) - 7, gap: this.arrowPosGap.top}, true);
        },

        
        _calcLeft: function(target, tpos, node, arrow){
            var marginLeft = parseFloat(target.css("margin-left")),
                marginTop = parseFloat(target.css("margin-top")),
                opt = this._options;
            isNaN(marginLeft) && (marginLeft = 0);
            isNaN(marginTop) && (marginTop = 0);
            return {top: tpos.top + marginTop + opt.offsetY,
                    left: tpos.left + marginLeft - node.outerWidth(true) - (opt.hasArrow ? arrow.outerWidth(true) - this.arrowPosGap.right : 0) + opt.offsetX,
                    position: 'left'};
        },

        
        _calcArrowLeft: function(node, arrow){
            return this._arrowPos('top', 'right', {start:2, end:node.outerHeight(true) - arrow.outerHeight(true) - 7, gap: this.arrowPosGap.right});
        },

        
        _calcRight: function(target, tpos, node, arrow){
            var marginRight = parseFloat(target.css("margin-right")),
                marginTop = parseFloat(target.css("margin-top")),
                opt = this._options;
            isNaN(marginRight) && (marginRight = 0);
            isNaN(marginTop) && (marginTop = 0);
            return {top: tpos.top + marginTop + opt.offsetY,
                    left: tpos.left + target.outerWidth(true) - marginRight + (opt.hasArrow ? arrow.outerWidth(true) - this.arrowPosGap.left: 0) + opt.offsetX,
                    position: 'right'};
        },

        
        _calcArrowRight: function(node, arrow){
            return this._arrowPos('top', 'left', {start:2, end:node.outerHeight(true) - arrow.outerHeight(true) - 7, gap: this.arrowPosGap.left});
        },

        
        _arrowPos: function(attr, posAttr, arrowRegion, isX){
            var me = this,
                opt = me._options,
                value = opt.arrowPosition,
                arrow = baidu(me.getElement("arrow")),
                target = baidu(opt.target),
                node = baidu(me.getElement("")),
                measure = isX ? 'outerWidth' : 'outerHeight',
                d = isX ? -arrow.outerHeight(true) : -arrow.outerWidth(true),
                max = target[measure]() - arrow[measure](),
                pecent = /\d+%/ig, r = {};
            //百分数处理
            value &&  pecent.test(value) && (value = node[measure](true) * parseFloat(value) * 0.01);
            value && typeof value != 'number' && (value = parseFloat(value));
            //取最佳位置,始终尽可能靠近目标中间，在提示框的范围内
            value === null && (value = (max >> 1) - (isX ? opt.offsetX : opt.offsetY));
            //验证最小值
            value < arrowRegion.start && (value = arrowRegion.start);
            //验证最大值
            value > arrowRegion.end && (value = arrowRegion.end);
            r[attr] = value;
            r[posAttr] = d + arrowRegion.gap;
            return r;
        },

        
        _clearArrowClass: function(){
            var arrow = baidu(this.getElement("arrow"));
            baidu.forEach(this._posInfo, function(className){
                arrow.removeClass("arrow-" + className);
            });
        },

        
        _posControl: function(position, target, tpos, node, arrow, isArrow){
            var me = this,
                pos = me[me._CamelCaseName('_calc', position)](target, tpos, node, arrow, isArrow);
            if(isArrow){return pos;}
            var parent = node.offsetParent(),
                region = {w: parent.outerWidth(true), h: parent.outerHeight(true)};
            me._posCache[position] = 1;
            //提示框位置正常显示
            if(pos.left >= 0 && pos.left + node.outerWidth(true) <= region.w
                && pos.top >= 0 && pos.top + node.outerHeight(true) <= region.h){
                return pos;
            }
            //提示框被遮挡，获取下个可能的方向
            var nextPos = me._getFuturePos(position);
            if(!me._posCache[nextPos]){
                return me._posControl(nextPos, target, tpos, node, arrow);
            }
            return pos;
        },

        
        _getFuturePos: function(position){
            return this._getOpositePos(position);
        },

         
        _getOpositePos: function(position){
            var index = this._posInfo.indexOf(position);
            return this._posInfo[index % 2 == 0 ? index + 1 : index - 1];
        },

        
        _CamelCaseName: function(prev, name){
            return prev + name.charAt(0).toUpperCase() + name.substr(1);
        },

        
        reposition: function(){
            var me = this,
                opt = me._options,
                node = baidu(me.getElement("")),
                arrow = baidu(me.getElement("arrow")),
                target = baidu(opt.target),
                position = target.position(),
                //提示框位置处理
                pos = me._posControl(opt.position, target, position, node, arrow);

            node.css("left", pos.left);
            node.css("top", pos.top);
            //清空提示框位置信息计算缓存
            me._posCache = {};
            if(!opt.hasArrow){return;}

            me._clearArrowClass();
            //设置提示框箭头位置样式
            arrow.addClass("arrow-" + me._getOpositePos(pos.position));
            //提示框箭头位置处理
            pos = me[me._CamelCaseName('_calcArrow', pos.position)](node, arrow);
            arrow.css("top", pos.top == undefined ? null : pos.top);
            arrow.css("left", pos.left == undefined ? null : pos.left);
            arrow.css("bottom", pos.bottom == undefined ? null : pos.bottom);
            arrow.css("right", pos.right == undefined ? null : pos.right);
        },

        
        _setContent: function(content){
            var ct = baidu(this.getElement("content")),
                opt = this._options;
            opt.content = content;
            ct.empty();
            typeof content == 'function' ? ct.html(content(opt.target)) : ct.append(content);
        },

        
        _bindCustomEvent: function(target){
            var me = this,
                opt = me._options,
                showHandler = baidu.fn.bind('show', me),
                hideHandler = baidu.fn.bind('hide', me);
            for(var i = 0, l = me._eventList.length; i < l; i ++)
                    me._eventList[i].call(me);
            //显示事件
            me._eventDeal(opt.showEvent, showHandler, baidu(target), me._eventList);
            //隐藏事件            
            me._eventDeal(opt.hideEvent, hideHandler, baidu(target), me._eventList);
        },

        
        show: function(){
            var me = this,
                opt = me._options;
            if(me._isShow){return;}
            
            if(me.fire("beforeshow") === false){
                return;
            }
            //重新定位
            me._refresh && ((me._refresh = false) || me.reposition());
            //重设内容
            typeof opt.content == 'function' && me._setContent(opt.content);
            
            baidu(me.getElement("")).show();
            me._isShow = true;
            
            me.fire("show");
        },

        
        hide: function(){
            if(!this._isShow){return;}
            
            if(this.fire("beforehide") === false){
                return;
            }

            baidu(this.getElement("")).hide();
            this._isShow = false;
            
            this.fire("hide");
        },

                
        setTarget: function(target){
            var me = this,
                opt = me._options;
            if(target == opt.target){return;}
            me._bindCustomEvent(target);
            opt.target = target;
            me.reposition();
            
            me.fire('targetchange', {target: target});
        },

        
        setContent: function(content){
            var me = this,
                opt = me._options;
            if(opt.content == content){return;}
            if(!content || (opt.content && (content.toString() == opt.content.toString()))){
                return;
            }
            me._setContent(content);
        },

        
        setPosition: function(pos){
            var me = this,
                node = baidu(me.getElement(""));
            pos.x && node.css("left", parseFloat(pos.x));
            pos.y && node.css("top", parseFloat(pos.y));
        },

        
        $dispose: function(){
            var layout = this.getElement("");
            magic.Base.prototype.$dispose.call(this);
            layout.parentNode.removeChild(layout);
        }
    });










baidu.lang.register(magic.Background, function(opt){
    if (this.styleBox) {
        this._innerHTML = ["<table borde='0' cellpadding='0' cellspacing='0' "
        ,(baidu.browser.ie < 7 ? "class='gif__' " : "")
        ,"style='width:100%;height:100%;'>"
        ,"<tr class='top__'>"
            ,"<td class='left__ corner__'>&nbsp;</td>"
            ,"<td class='center__ vertical__'>&nbsp;</td>"
            ,"<td class='right__ corner__'>&nbsp;</td>"
        ,"</tr>"
        ,"<tr class='middle__'>"
            ,"<td class='left__ horizontal__'>&nbsp;</td>"
            ,"<td class='center__ midland__'>",(this._innerHTML||"&nbsp;"),"</td>"
            ,"<td class='right__ horizontal__'>&nbsp;</td>"
        ,"</tr>"
        ,"<tr class='bottom__'>"
            ,"<td class='left__ corner__'>&nbsp;</td>"
            ,"<td class='center__ vertical__'>&nbsp;</td>"
            ,"<td class='right__ corner__'>&nbsp;</td>"
        ,"</tr>"
        ,"</table>"
        ].join("");
    }
});



 magic.Tooltip = baidu.lang.createClass(function(options){

     }, { type: "magic.Tooltip", superClass : magic.control.Tooltip }).extend(
     
     {
         
         render: function(el){
            var me = this,
                opt = me._options;

            if(baidu.type(el) === "string"){
                el = '#' + el;
            }
            
            el = baidu(el)[0];

            el || (el = (opt.target && opt.target.parentNode) || (opt.target = document.body));
            opt.target || (opt.target = el);

            var template = magic.Tooltip.template.join("");

            baidu(el).append(baidu.string.format(template, {
                containerId: me.$getId(""),
                closeId: me.$getId("close"),
                contentId: me.$getId("content"),
                arrowId: me.$getId("arrow")
            }));
            
            var self = me.getElement("");
            baidu(self).hide();
            self.style.zIndex = baidu.global.getZIndex("popup");

            me.background = new magic.Background({coverable:true, styleBox:me.styleBox});
            me.background.render(self);

            me.on("dispose", function(){
                me.background.$dispose();
            });
             
             me.fire("load");
         }
     });

magic.Tooltip.template = [
    "<div class='magic-tooltip magic-ui' id='#{containerId}'>",
        "<div class='tang-foreground'>",
            "<div class='magic-tooltip-close' id='#{closeId}'><a href='' onmousedown='event.stopPropagation && event.stopPropagation(); event.cancelBubble = true; return false;' onclick='return false;'></a></div>",
            "<div class='magic-tooltip-content' id='#{contentId}'></div>",
            "<div class='magic-tooltip-arrow' id='#{arrowId}'></div>",
        "</div>",
    "</div>"
];



















magic.setup.tooltip = function(el, options){
    if(baidu.type(el) === "string"){
        el = '#' + el;
    }
    el = baidu(el)[0];
    var opt = options || {};
    opt.target || (opt.target = document.body);

    
    var instance = magic.setup(el, magic.control.Tooltip, opt),
        container = instance.getElement();

    container.style.zIndex = baidu.global.getZIndex("popup");

    instance.background = new magic.Background({coverable:true, styleBox:true});
    instance.background.render(container); 
    instance.on("dispose", function(){
        instance.background.$dispose();
    });

    instance.$mappingDom("", baidu(".magic-tooltip", container)[0]);
    instance.$mappingDom("close", baidu(".magic-tooltip-close", container)[0]);
    instance.$mappingDom("closeBtn", baidu("a", instance.getElement("close"))[0]);
    instance.$mappingDom("content", baidu(".magic-tooltip-content", container)[0]);
    instance.$mappingDom("arrow", baidu(".magic-tooltip-arrow", instance.getElement("body"))[0]);
    instance._isShow = true;
    instance.hide();

      
    instance.fire("load");

    return instance;
};