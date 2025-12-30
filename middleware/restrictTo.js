const restrictTo = (...roles) => {
    return (req, res, next) => {
        //   console.log(roles)
     const userRole = req.user.role
        console.log(userRole);   
        console.log(roles);
        

       
    
        //  else (
             next()
    //  )
    }
    }

module.exports = restrictTo