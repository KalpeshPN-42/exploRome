function wrapAsync(fn){
    return function(req,res,next){
        // fn(req,res,next).catch(err => {
        //     next(err);
        // })
        // Or
        fn(req,res,next).catch(next);
    }
}

module.exports=wrapAsync;