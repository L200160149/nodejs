const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const {
  loadContact,
  findContact,
  addContact,
  cekDuplikat,
  deleteContact,
  updateContacts,
} = require("./utils/contacts");
const { body, validationResult, check } = require("express-validator");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

const app = express();
const port = 3000;

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

app.get("/about", (req, res) => {
  const title = "Halaman About";
  const layout = "layouts/main-layouts";
  res.render("about", { title, layout });
});

app.get("/contact", (req, res) => {
  const contacts = loadContact();

  const title = "Halaman Contact";
  const layout = "layouts/main-layouts";
  res.render("contact", { title, layout, contacts, msg: req.flash("msg") });
});

app.get("/contact/add", (req, res) => {
  const title = "Halaman Tambah Contact";

  const layout = "layouts/main-layouts";
  res.render("contact-add", { title, layout });
});
app.post(
  "/contact",
  [
    body("nama").custom((value) => {
      const duplikat = cekDuplikat(value);
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
      addContact(req.body);

      // kirim flash message
      req.flash("msg", "Data contact berhasil ditambahkan");
      res.redirect("/contact");
    }
  }
);

// hapus
app.get("/contact/delete/:nama", (req, res) => {
  const contact = findContact(req.params.nama);

  // jika contact tidak ada
  if (!contact) {
    res.status(404);
    res.send("<h1>404</h1>");
  } else {
    deleteContact(req.params.nama);
    // kirim flash message
    req.flash("msg", "Data contact berhasil dihapus");
    res.redirect("/contact");
  }
});

// form ubah data contact
app.get("/contact/edit/:nama", (req, res) => {
  const contact = findContact(req.params.nama);

  const title = "Halaman Ubah Contact";
  const layout = "layouts/main-layouts";
  res.render("contact-edit", { title, layout, contact });
});

// proses ubah data
app.post(
  "/contact/update",
  [
    body("nama").custom((value, { req }) => {
      const duplikat = cekDuplikat(value);
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
      // return res.status(400).json({ errors: errors.array });

      res.render("contact-edit", {
        title: "Form Ubah Data Contact",
        layout: "layouts/main-layouts",
        errors: errors.array(),
        contact: req.body,
      });
    } else {
      updateContacts(req.body);
      // kirim flash message
      req.flash("msg", "Data contact berhasil diupdate");
      res.redirect("/contact");
    }
  }
);

// halaman detail
app.get("/contact/:nama", (req, res) => {
  const contact = findContact(req.params.nama);

  const title = "Halaman Detail";
  const layout = "layouts/main-layouts";
  res.render("detail", { title, layout, contact });
});

app.get("/api", (req, res) => {
  res.json({
    nama: "Kucing",
  });
});

app.use("/", (req, res) => {
  res.status(404);
  res.send("404");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
