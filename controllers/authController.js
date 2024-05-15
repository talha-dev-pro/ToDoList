module.exports={
    login:(req,res)=>{
        return res.send({
            message: "User is logged in"
        });
    },
    logout:(req, res)=>{
        return res.send({
            message: "User is logged out"
        });
    }
};