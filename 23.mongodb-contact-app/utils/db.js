const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/wpu', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

// // Menambah 1 data
// const contact1 = new Contact({
//     nama: 'Japan',
//     nohp: '085',
//     email: 'japan@gmail.com'
// })
// // simpan ke collection
// contact1.save().then((contact) => console.log(contact))