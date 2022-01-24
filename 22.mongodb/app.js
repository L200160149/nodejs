const { MongoClient } = require("mongodb")

const url = 'mongodb://127.0.0.1:27017'
const dbName = 'wpu'

// const client = new MongoClient(uri, {
//     userNewurlParser: true,
//     useUnifiedTopology: true
// })
const client = new MongoClient(url);

client.connect((error, client) => {
  if (error) {
    return console.log('Koneksi gagal!')
  }

  // pilih database
  const db = client.db(dbName)


  // // menambahkan 1 data ke collection mahasiswa
  // db.collection('mahasiswa').insertOne(
  //   {
  //     nama: 'Semarang',
  //     email: 'semarang@gmail.com'
  //   },
  //   (error, result) => {
  //     if (error) {
  //       return console.log('gagal menambahkan data')
  //     }

  //     console.log(result);
  //   }
  // )


  // // menambahkan < 1 data ke collection mahasiswa
  // db.collection('mahasiswa').insertMany(
  //   [
  //     {
  //       nama: 'Solo',
  //       email: 'solo@gmail.com'
  //     },
  //     {
  //       nama: 'Ngawi',
  //       email: 'ngawi@gmail.com'
  //     },
  //   ],
  //   (error, result) => {
  //     if (error) {
  //       return console.log('data gagal ditambahkan!')
  //     }
  
  //     console.log(result)
  //   }
  // );


  // // menampilkan semua data
  // db.collection('mahasiswa').find().toArray((error, result) => {
  //   console.log(result)
  // });


  // menampilkan data spesifik
    db.collection('mahasiswa')
    .find({nama: 'Kucing'})
    .toArray((error, result) => {
      console.log(result)
    })
})


