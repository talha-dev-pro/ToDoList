module.exports ={
    getUser:(req,res)=>{
        res.send({
            message: "Get User"
        });
    },
    createUser:(req,res)=>{
        res.send({
            message: "Create User"
        });
    }
}