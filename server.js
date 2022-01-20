import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

//getting routes
const authRoutes = require('./routes/auth');
const itemRoutes = require('./routes/item');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api',authRoutes);
app.use('/api',itemRoutes);
app.use('/api',cartRoutes);
app.use('/api',orderRoutes);

// we make is static in nature as all users get the same content without it being generated or modified
if(process.env.Node_ENV == 'production'){ // only in production environment to static server content type
    app.use(express.static('client/build'));
    app.get("*",(req,res) =>{
        res.sendFile(path.resvole(__dirname,'client','build','index.html'))
    })
}

//setting up connection
const dbURI = config.get('dbURI');
const port = process.env.PORT || 4000;

// connecting to the database
mongoose.connect(dbURI,{ 
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then ((result) => app.listen(port, () => console.log('Server running on port number:', +port)))
.catch((err) => console.log(err));