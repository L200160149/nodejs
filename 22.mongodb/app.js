const { MongoClient, ObjectId } = require("mongodb")

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


  // // menampilkan data spesifik
  //   db.collection('mahasiswa')
  //   .find({_id: ObjectId('61ee730dc46c1bcf2d48ea2d')})
  //   .toArray((error, result) => {
  //     console.log(result)
  //   })

  // const updatePromise = db.collection('mahasiswa').updateOne(
  //     {
  //       _id: ObjectId('61ee730dc46c1bcf2d48ea2d'),
  //     },
  //     {
  //       $set : {
  //         nama: 'Kota Semarang Jateng'
  //       },
  //     }
  //   )

  //   updatePromise.then((result) => {
  //     console.log(result)
  //   })
  //   .catch((error) => {
  //     console.log(error)
  //   })


  // mengubah data lebih dari 1
  db.collection('mahasiswa').updateMany(
    {
      nama: 'Semarang',
    },
    {
      $set: {
        nama: 'Kotaa Semarang'
      }
    }
  )

  
  // // menghapus 1 data
  // db.collection('mahasiswa').deleteOne(
  //   {
  //     _id: ObjectId('61ee730dc46c1bcf2d48ea2d')
  //   }
  // ).then((result) => {
  //   console.log(result)
  // }).catch((error) => {
  //   console.log(error)
  // })

  // menghapus lebih dari 1 data
  db.collection('mahasiswa').deleteMany(
    {
     nama: 'Kotaa Semarang'
    }
  ).then((result) => {
    console.log(result)
  }).catch((error) => {
    console.log(error)
  })
})


