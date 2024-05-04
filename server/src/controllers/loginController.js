const connection = require('../models/db')
const jwt = require('jsonwebtoken')


const login = (req, res) =>{
    const {userName, password} = req.body

    const query = 'SELECT * FROM users WHERE userName = ? AND password = ?';

    try {
        connection.query(query,[userName, password], (err, result)=>{
            if(err){
                res.status(500).send(err)
            }

            if (result.length > 0) {
                const token = jwt.sign({userName},'testkey',{
                    expiresIn: '3m'
                })
                res.send({token})                
            }else{
                res.status(404).send({message:'Invalid Credentials'})
            }
        })
    } catch (error) {
        console.log(error)
    }
    



}



module.exports = {
    login,
}