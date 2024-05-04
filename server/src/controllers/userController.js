const connection = require('../models/db')

const listaUser = (req, res)=>{
    const query = 'SELECT * FROM users';
    
    try {
        connection.query(query, (error, resluts)=>{
            res.status(200).json(resluts)
        })
    } catch (error) {
        console.error(error)
    }
   
}


const addUser =  async (req, res) =>{
    const {userName, password} = req.body
    const query = 'INSERT INTO `users`(`userName`, `password`) VALUES (? , ?)'

    const user = {
        userName:userName,
        password:password
    }

    try {

         await connection.query(query, [user.userName, user.password] )
        res.status(200).send("Data inserted successfully")
        
    } catch (error) {
        
        console.log(error)
    }

}



module.exports = {
    listaUser,
    addUser,
}