const restrictTo = (...roles) => {
    return (req,res, next) => {
        //   console.log(roles)
     const userRole = req.user.role
        console.log(userRole);   
        console.log(roles);
        

       
    
       next()
    }
    }

module.exports = restrictTo