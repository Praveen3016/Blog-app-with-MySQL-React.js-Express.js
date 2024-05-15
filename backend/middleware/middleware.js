import jwt from 'jsonwebtoken'

const protect = async (req , res , next)=>{
    let token ;
    token = req.cookies.access_cookie;
  
    if(token)
    {
          try{
                    const decoded = jwt.verify(token , process.env.JWT_SECRET );
                    console.log(decoded)
                    // req.user = await User.findById(decoded.userId).select('-password');
 
                    next();
          }catch(err)
          {
             res.status(401)
             res.send('Not authorized , invalid Token')
          }
    }else{
     res.status(401)
     throw new Error('not authorized , no token')
    }
 }