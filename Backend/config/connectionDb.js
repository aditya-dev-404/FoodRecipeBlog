const mongoose = require('mongoose');



async function connectionDataBase() {
    await mongoose.connect(process.env.DB_URL)
    .then(()=>{
        console.log('connection established with db🚀');
    })
    .catch((err)=>{
        console.error('Failed to connect DB : ',err)
    })
}

    


module.exports = connectionDataBase