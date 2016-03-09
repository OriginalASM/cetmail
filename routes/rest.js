/***************** Vannila Rest Api for ExpressJs *****************
 * Author  : Shubham Prasad || spd2192@gmail.com
 * route   : getAll GET  /model/
 * route   : getOne GET  /model/:id
 * route   : insert POST /model/
 * route   : delete GET  /model/destroy/:id
 * route   : update POST  /model/update/:id
 *******************************************************************/


module.exports = function(Model){

  var api = {} ;

  api.find = function (req, res, next) {
    Model.find().exec(function(e, data) {
      if(e) {
        res.send({Error : e});
        console.error(e);
      }else {
        res.send(data);
      }
    });
  };

  api.findOne = function (req, res, next) {
    Model.findOne({_id:req.params['id']}).exec(function (err, user) {
      if(err) {
        res.send({Error : err});
        console.error(err);
      }else {
        res.send(user);
      }
    });
  };

  api.insert = function (req, res, next) {
    //console.log(req.body);
    //console.log("abra");
    /* Model.insert(req.query).exec(function(e, response) {
     if(e) {
     res.send({Error : e});
     console.error(e);
     }else {
     res.send(response);
     }
     });*/
    var mdl = new Model(req.body || {foo: bar});
    mdl.save(function(err){
      if (err) res.send({err: err});
      else res.send(mdl);
    });
  };

  api.destroy = function (req, res, next) {
    Model.remove({ _id: req.params['id'] }, function (err) {
      if (err) return res.send({error : err});
      else res.send('ok');
    });
  }

  api.update = function (req, res, next) {
    Model.findOne({_id:req.params['id']}, function (err, doc) {
      if (err) {
        res.send({error:err});
      }else {
        for (var prop in req.body) {
          if (req.body.hasOwnProperty(prop)) {
            doc[prop] = req.body[prop];
          }
        }
        doc.save(function(e) {
          if (e) {
            res.send({error:e});
          } else {
            res.send(doc);
          }
        })
      }
    })
  };

  return api ;
};
