module.exports={
    getAdmin:(req,res)=>{
        return res.send({
            message: "Admin"
        });
    },
    createAdmin: (req, res)=>{
        return res.send({
            message: "Created a new Admin"
        });
    }
}