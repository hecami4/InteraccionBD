//exporta sesion
module.exports =  function(req,res,next){
  if (!req.session.user){
    console.log(res)
    res.redirect('/logout');
  } else {
    req.session.user
    next();
  }
}
