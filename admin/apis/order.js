var Order = require('../../model').order;
var User = require('../../model').user;
var Worker = require('../../model').worker;

var charge = require('../../util/charge');
var _ = require('underscore');
var async = require('async');


exports.clear = function(req,res,next){
  Order.remove(function(err){
    if(err){
      return next(err)
    }else{
      res.status(200).send({message:"ok"});
    }
  });
}

exports.cancel = function(req,res,next){
  var id = req.body.id;

  charge.cancel(id, "admin_cancel", function(err){
    if(err){
      return next(err);
    }
    res.status(200).send({message:"ok"});
  });
}

exports.list = function(req,res,next){
  var query = req.query;

  var conditions = {};

  if(query.user){
    conditions["user._id"] = Order.id(query.user);
  }

  if(query.worker){
    conditions["worker._id"] = Order.id(query.worker);
  }

  Order.find(conditions).sort({
    _id: -1
  }).toArray(function(err, orders){
    if(err){
      return next(err);
    }


    async.map(orders, function(order, done){

      async.parallel([
        function(done){
          User.findById(order.user._id,function(err, user){
            order.user_name = user && user.wechat_info && user.wechat_info.nickname;
            done(err);
          });
        },
        function(done){
          Worker.findById(order.worker._id,function(err, worker){
            order.worker_name = worker &&
              (worker.name
              ? worker.name
              : ( worker.wechat_info && worker.wechat_info.nickname ));
            done(err);
          });
        }
      ], function(){
        order = _.omit(order,'cancelled_former_order','user','worker');
        done(null,order);
      })

    }, function(err, orders){

      res.send({
        data: orders
      });
    });
  });
}