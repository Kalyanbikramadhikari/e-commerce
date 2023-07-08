const mongoose = require('mongoose');

const connectDatabase = ()=>{
mongoose.connect("mongodb://localhost:27017/shopit" ,{
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("connection to database is sucessful")
}).catch((err)=>{
    console.log(err)
});
}

module.exports= connectDatabase