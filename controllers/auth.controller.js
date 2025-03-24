const User = require('../models/User');

exports.register= async (req,res) => {
  try{
    const {name , email , password, tel} = req.body;
    
    if(!name || !email || !password || !tel) {
      return res.status(400).json({ success: false, message: "Please provide all field" });
    }
    
    const existingUserEmail = await User.findOne({ email });
    if(existingUserEmail) {
      return res.status(400).json({ success: false, message: "User with email already exist" });
    }
    
    const existingUserTel = await User.findOne({ tel });
    if(existingUserTel) {
      return res.status(400).json({ success: false, message: "User with tel already exist" });
    }

    let user = await User.create({
      name ,
      email , 
      password , 
      tel
    });
    
    sendTokenResponse(user,200,res);
    user = await User.find();
    console.log(user);
  }catch(err){
    res.status(400).json({success : false});
    console.log(err.stack);
  }
};

exports.login=async (req,res)=> {
    const {email , password} = req.body;

    if(!email || !password){
        return res.status(400).json({success:false , msg : 'Please provide email and password'});
    }

    const user =  await User.findOne({email}).select('+password');
    if(!user){
        return res.status(400).json({success : false , msg : 'Invalid credentials'});
    }

    const isMatch = await user.matchPassword(password);
    if(!isMatch){
        return res.status(400).json({success: false , msg : 'Invalid credentials'});
    }

    sendTokenResponse(user,200,res);
};

exports.logout = (req, res) => {
  res.cookie('jwt', 'none', {
    expires: new Date(0), // หมดอายุทันที
    httpOnly: true
  });
  
  res.status(200).json({ success: true, message: 'Logged out successfully' });
};

const sendTokenResponse= (user , statusCode , res) => {
    const token = user.getSignedJwtToken();
    
    const options = {
        expires : new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE*24*60*60*1000) , 
        httpOnly : true
    };

    if(process.env.NODE_ENV === 'production') {
        options.secure = true ;
    }
    
    const responseData = {
      name: user.name,
      email: user.email,
      tel: user.tel,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      id: user._id
    }

    res.status(statusCode).cookie('jwt', token, options).json({success: true, token, user:responseData});
}

exports.getMe =async (req ,res , next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({success : true , data : user});
};