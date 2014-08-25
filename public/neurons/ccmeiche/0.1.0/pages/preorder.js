(function(){
function mix(a,b){for(var k in b){a[k]=b[k];}return a;}
var _0 = "ccmeiche@0.1.0/pages/addcar.js";
var _1 = "ccmeiche@0.1.0/pages/finishorder.js";
var _2 = "ccmeiche@0.1.0/pages/home.js";
var _3 = "ccmeiche@0.1.0/pages/login.js";
var _4 = "ccmeiche@0.1.0/pages/mod/autocomplete.js";
var _5 = "ccmeiche@0.1.0/pages/mod/countdown.js";
var _6 = "ccmeiche@0.1.0/pages/mod/singleselect.js";
var _7 = "ccmeiche@0.1.0/pages/mod/uploader.js";
var _8 = "ccmeiche@0.1.0/pages/myinfos.js";
var _9 = "ccmeiche@0.1.0/pages/myorders.js";
var _10 = "ccmeiche@0.1.0/pages/order.js";
var _11 = "ccmeiche@0.1.0/pages/preorder.js";
var _12 = "ccmeiche@0.1.0/pages/recharge.js";
var _13 = "ccmeiche@0.1.0/pages/tpl/addcar.html.js";
var _14 = "ccmeiche@0.1.0/pages/tpl/finishorder.html.js";
var _15 = "ccmeiche@0.1.0/pages/tpl/mixins.html.js";
var _16 = "ccmeiche@0.1.0/pages/tpl/preorder.html.js";
var _17 = "zepto@^1.1.3";
var _18 = "events@^1.0.5";
var _19 = "util@^1.0.4";
var _20 = "tpl@~0.2.1";
var _21 = "view-swipe@~0.1.4";
var entries = [_0,_1,_2,_3,_4,_5,_6,_7,_8,_9,_10,_11,_12,_13,_14,_15,_16];
var asyncDepsToMix = {};
var globalMap = asyncDepsToMix;
define(_11, [_17,_18,_19,_20,_21,_16], function(require, exports, module, __filename, __dirname) {
var $ = require("zepto");
var template = require("./tpl/preorder.html");
var events = require("events");
var util = require("util");
var tpl = require("tpl");
var viewSwipe = require("view-swipe");


function PreOrder(){

}

util.inherits(PreOrder,events);

PreOrder.prototype.show = function(data){
  var html = tpl.render(template,data);
  var elem = $(html);
  var self = this;
  viewSwipe.in(elem[0],"bottom");

  elem.find(".submit").on("touchend", function(){
    self.confirm();
  });

  elem.find(".cancel").on("touchend", function(){
    viewSwipe.out("bottom");
  });
  return this;
}

PreOrder.prototype.confirm = function(data){
  viewSwipe.out("bottom");
  this.emit("confirm");
}

module.exports = new PreOrder();
}, {
    entries:entries,
    map:mix({"./tpl/preorder.html":_16},globalMap)
});

define(_16, [], function(require, exports, module, __filename, __dirname) {
module.exports = '<div id="preorder" class="container"><h2 class="h2">提交订单</h2><div class="order"><div class="inner"><div class="row"><div class="label">手机：</div><div class="text">@{it.phone}</div></div><?js it.cars.forEach(function(car,index){ ?><div class="row"><div class="label">车型：</div><div class="text"><p>@{car.type}</p><p>@{car.number}</p></div></div><?js }); ?><div class="row"><div class="label">地址：</div><div class="text">@{it.address}</div></div><div class="row"><div class="label">服务：</div><div class="text">@{it.service.title}</div></div></div></div><h2 class="h2">预估时间</h2><div class="estimate"><div class="time">@{it.time}</div><div class="text"><p>我们将在预估时间内完成洗车，预估时间以付款后为准</p><p>您也可在我们达到前随时取消订单</p></div></div><h2 class="h2">应付金额<div class="price">￥@{it.price}</div></h2><div class="row"><input type="button" value="提交" class="button submit"/><input type="button" value="取消" class="button cancel"/></div></div>'
}, {
    entries:entries,
    map:globalMap
});
})();