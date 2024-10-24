const userAuth = (req,res,next)=>{
    const token = "xyz";
    const isUserAuthenticated = token==="xyz";
    if(!isUserAuthenticated){
        res.status(401).send('Unauthorized user');
    }else{
        next();
    }
}

const adminAuth = (req,res,next)=>{
    const token = "xyz";
    const isAdminAuthenticated = token==="xyz";
    if(!isAdminAuthenticated){
        res.status(401).send('Unauthorized admin');
    }else{
        next();
    }
}

module.exports ={
    userAuth,
    adminAuth
}