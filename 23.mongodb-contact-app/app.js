const express = require('express')
const expressLayouts = require('express-ejs-layouts')

const {body, validationResult, check} = require('express-validator')
var methodOverride = require('method-override')

const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

require('./utils/db.js')
const Contact = require('./model/contact')

const app = express()
const port = 3000

// setup methodOverride
app.use(methodOverride('_method'))

// setup EJS
// menggunakan EJS
app.set("view engine", "ejs");
// Third-party middleware
app.use(expressLayouts);
// Built in middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// konfigurasi flash
app.use(cookieParser("secret"));
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

// Halaman Home
app.get("/", (req, res) => {
    const nama = "Kucing";
    const title = "Halaman Home";
    const mahasiswa = [
      {
        nama: "Kucing",
        warna: "Oren",
      },
      {
        nama: "Kucing",
        warna: "Kelabu",
      },
    ];
    const layout = "layouts/main-layouts";
    res.render("index", { nama, title, mahasiswa, layout });
  });

//  Halaman About
app.get("/about", (req, res) => {
    const title = "Halaman About";
    const layout = "layouts/main-layouts";
    res.render("about", { title, layout });
  });

//   Halaman Contact
app.get("/contact", async (req, res) => {
    const contacts = await Contact.find();
    const title = "Halaman Contact";
    const layout = "layouts/main-layouts";
    res.render("contact", { title, layout, contacts, msg: req.flash("msg") });
  });
//   Halaman tambah contact
app.get("/contact/add", (req, res) => {
    const title = "Halaman Tambah Contact";
  
    const layout = "layouts/main-layouts";
    res.render("contact-add", { title, layout });
  });
//   tambah data contact
app.post(
    "/contact",
    [
      body("nama").custom(async (value) => {
        const duplikat = await Contact.findOne({nama: value});
        if (duplikat) {
          throw new Error("Nama contact sudah digunakan");
        }
        return true;
      }),
      check("email", "Email tidak valid").isEmail(),
      check("nohp", "No HP tidak valid").isMobilePhone("id-ID"),
    ],
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        // return res.status(400).json({ errors: errors.array });
  
        res.render("contact-add", {
          title: "Form Tambah Data Contact",
          layout: "layouts/main-layouts",
          errors: errors.array(),
        });
      } else {
        Contact.insertMany(req.body, (error, result) => {
            // kirim flash message
            req.flash("msg", "Data contact berhasil ditambahkan");
            res.redirect("/contact");
        });
      }
  
    }
  );

  
// // hapus
// app.get("/contact/delete/:nama", async (req, res) => {
//     const contact = await Contact.findOne({nama: req.params.nama});
  
//     // jika contact tidak ada
//     if (!contact) {
//       res.status(404);
//       res.send("<h1>404</h1>");
//     } else {
//       Contact.deleteOne({_id: contact._id}).then((result) => {
//           // kirim flash message
//           req.flash("msg", "Data contact berhasil dihapus");
//           res.redirect("/contact");
//       });
//     }
//   });
app.delete('/contact', (req, res) => {
    Contact.deleteOne({nama: req.body.nama}).then((result) => {
        // kirim flash message
        req.flash("msg", "Data contact berhasil dihapus");
        res.redirect("/contact");
    });
})


// form ubah data contact
app.get("/contact/edit/:nama", async (req, res) => {
    const contact = await Contact.findOne({nama: req.params.nama});
  
    const title = "Halaman Ubah Contact";
    const layout = "layouts/main-layouts";
    res.render("contact-edit", { title, layout, contact });
  });
// proses ubah data
app.put(
    "/contact",
    [
      body("nama").custom(async (value, { req }) => {
        const duplikat = await Contact.findOne({nama: value});
        if (value !== req.body.oldNama && duplikat) {
          throw new Error("Nama contact sudah digunakan");
        }
        return true;
      }),
      check("email", "Email tidak valid").isEmail(),
      check("nohp", "No HP tidak valid").isMobilePhone("id-ID"),
    ],
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
  
        res.render("contact-edit", {
          title: "Form Ubah Data Contact",
          layout: "layouts/main-layouts",
          errors: errors.array(),
          contact: req.body,
        });
      } else {
        Contact.updateOne(
            {_id: req.body._id},
            {
            $set: {
                nama: req.body.nama,
                email: req.body.email,
                nohp: req.body.nohp,
                }
            },
            ).then((result) => {
                // kirim flash message
                req.flash("msg", "Data contact berhasil diupdate");
                res.redirect("/contact");
            })
      }
    }
  );
  
// halaman detail contact
app.get("/contact/:nama", async (req, res) => {
    const contact = await Contact.findOne({nama: req.params.nama});
  
    const title = "Halaman Detail";
    const layout = "layouts/main-layouts";
    res.render("detail", { title, layout, contact });
  });

app.listen(port, () => {
    console.log(`Mongo Contact App | listening at http://localhost:${port}`)
})