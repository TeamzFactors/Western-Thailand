const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const ejs = require('ejs');
const path = require('path');
const mysql = require('mysql');
const session = require('express-session'); // ใช้เก็บข้อมูลสถานะของผู้ใช้ระหว่างการเข้าชมเว็บไซต์
const cookieSession = require('cookie-session'); // คุกกี้ถูกใช้เพื่อเก็บข้อมูลเซสชันบนเครื่องลูกข่ายของผู้ใช้
const bcrypt = require('bcrypt'); // ใช้ในการเข้ารหัสและตรวจสอบรหัสผ่าน การป้องกันรหัสผ่านของผู้ใช้จากการถูกแฮ็กหรือการรั่วไหล
const nodemailer = require('nodemailer'); // ใช้ส่งอีเมลสำหรับ send code และอื่นๆ
const randomstring = require('randomstring'); // ใช้สร้างรหัสผ่านหรือ Token แบบสุ่ม
const rateLimit = require("express-rate-limit"); // ใช้เพื่อจำกัดอัตราการเรียก API หรือเส้นทาง (routes)
const passwordValidator = require("password-validator"); // ตัวดักจับ Password (validation)
const moment = require('moment-timezone'); // ใช้ควบคุมและแสดงเวลาแบบ Real Time
const connections = require('./database'); // เรียกใช้ database.js บนไฟล์ index.js

app.set('view engine', 'ejs');

// ระบุโฟลเดอร์ที่ใช้สำหรับเก็บไฟล์มุมมอง
app.set('views', path.join(__dirname, 'views'));

const admin = require("firebase-admin");
const credentials = require("./key.json");
const exp = require("constants");

admin.initializeApp({
    credential: admin.credential.cert(credentials),
    storageBucket: "gs://tourist-attraction-80139.appspot.com"
});

app.use(express.static('public'))

// ------------------------------------------------------------------------------------------

// ที่เที่ยวตาก
app.get('/Travel_Tak', async function (req, res) {

  // ดึงข้อมูลจาก firebase
  try {
    const collectionRef = db.collection("Tak_Province");
    const data = {};
    const imageUrls = [];

    for (let i = 1; i <= 10; i++) {
      const documentRef = collectionRef.doc(`${i}_Place`);
      const docSnapshot = await documentRef.get();

      if (docSnapshot.exists) {
        data[`dataT${i}`] = docSnapshot.data();
      } else {
        res.status(404).send(`Document ${i} not found`);
        return;  // เมื่อเจอข้อผิดพลาดในการดึงข้อมูลจาก document แต่ละตัวให้หยุดและส่งข้อผิดพลาดกลับ
      }

      // ดึงรูปภาพจาก firebase
      const imageFiles = ["wtrs_1.jpg", "wtrs_2.jpg", "rgd.jpg", "rgd2.jpg", "caveus1.jpeg", "caveus2.jpeg",
                          "chaodoi.jpg", "chaodoi2.jpeg", "doi_bbt.jpg", "doi_bbt2.jpg", "blue.jpeg", "blue1.jpeg",
                          "boo.jpeg", "boo2.jpeg", "bri.jpeg", "bri2.jpeg", "mon.jpeg", "mon2.jpeg"];

      for (const fileName of imageFiles) {
        const storage = admin.storage();
        const bucket = storage.bucket();
        const file = bucket.file(`${fileName}`);
      
        try {
          const urls = await file.getSignedUrl({
            action: "read",
            expires: "01-01-2030", // เปลี่ยนเป็นวันที่หมดอายุตามที่คุณต้องการ
          });
      
          const imageUrl = urls[0];
          imageUrls.push(imageUrl);
        } catch (error) {
          console.error(`เกิดข้อผิดพลาดในการรับ URL รูปภาพสำหรับ ${fileName}:`, error);
        }
      }
    }

    data.imageUrls = imageUrls;
    res.render('travel_Tak.ejs', data);
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
    res.status(500).send("เกิดข้อผิดพลาดในการดึงข้อมูล");
  }
});

// ------------------------------------------------------------------------------------------

// ที่เที่ยวกาญจนบุรี
app.get('/Travel_Kan', async function (req, res) {

  // ดึงข้อมูลจาก firebase
  try {
    const collectionRef = db.collection("Kan_Province");
    const data = {};
    const imageUrls = [];

    for (let i = 1; i <= 10; i++) {
      const documentRef = collectionRef.doc(`${i}_Place`);
      const docSnapshot = await documentRef.get();

      if (docSnapshot.exists) {
        data[`dataT${i}`] = docSnapshot.data();
      } else {
        res.status(404).send(`Document ${i} not found`);
        return;  // เมื่อเจอข้อผิดพลาดในการดึงข้อมูลจาก document แต่ละตัวให้หยุดและส่งข้อผิดพลาดกลับ
      }

      // ดึงรูปภาพจาก firebase
      const imageFiles = ["_Kplace1.1.jpeg", "_Kplace1.2.jpeg", "_Kplace2.1.jpeg", "_Kplace2.2.jpeg",
      "_Kplace3.1.jpeg", "_Kplace3.2.jpeg", "_Kplace4.1.jpg", "_Kplace4.2.jpeg", "_Kplace5.1.jpg", "_Kplace5.2.jpeg",
      "_Kplace6.1.jpeg", "_Kplace6.2.jpeg", "_Kplace7.1.jpeg", "_Kplace7.2.jpeg", "_Kplace8.1.png", "_Kplace8.2.jpeg",
      "_Kplace9.1.jpeg", "_Kplace9.2.jpeg", "_Kplace10.1.jpeg", "_Kplace10.2.jpeg"];

      for (const fileName of imageFiles) {
        const storage = admin.storage();
        const bucket = storage.bucket();
        const file = bucket.file(`Kan/${fileName}`);
      
        try {
          const urls = await file.getSignedUrl({
            action: "read",
            expires: "01-01-2030", // เปลี่ยนเป็นวันที่หมดอายุตามที่คุณต้องการ
          });
      
          const imageUrl = urls[0];
          imageUrls.push(imageUrl);
        } catch (error) {
          console.error(`เกิดข้อผิดพลาดในการรับ URL รูปภาพสำหรับ ${fileName}:`, error);
        }
      }
    }

    data.imageUrls = imageUrls;
    res.render('travel_Kan.ejs', data);
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
    res.status(500).send("เกิดข้อผิดพลาดในการดึงข้อมูล");
  }
});

// ------------------------------------------------------------------------------------------

// ที่เที่ยวราชบุรี
app.get('/Travel_Rat', async function (req, res) {

  // ดึงข้อมูลจาก firebase
  try {
    const collectionRef = db.collection("Rat_Province");
    const data = {};
    const imageUrls = [];

    for (let i = 1; i <= 10; i++) {
      const documentRef = collectionRef.doc(`${i}_Place`);
      const docSnapshot = await documentRef.get();

      if (docSnapshot.exists) {
        data[`dataT${i}`] = docSnapshot.data();
      } else {
        res.status(404).send(`Document ${i} not found`);
        return;  // เมื่อเจอข้อผิดพลาดในการดึงข้อมูลจาก document แต่ละตัวให้หยุดและส่งข้อผิดพลาดกลับ
      }

      // ดึงรูปภาพจาก firebase
      const imageFiles = ["_Rplace1.1.jpeg", "_Rplace1.2.jpeg", "_Rplace2.1.jpeg", "_Rplace2.2.jpeg",
      "_Rplace3.1.jpeg", "_Rplace3.2.jpeg", "_Rplace4.1.jpeg", "_Rplace4.2.jpeg", "_Rplace5.1.jpeg", "_Rplace5.2.jpeg",
      "_Rplace6.1.jpeg", "_Rplace6.2.jpeg", "_Rplace7.1.jpeg", "_Rplace7.2.jpeg", "_Rplace8.1.jpeg", "_Rplace8.2.jpeg",
      "_Rplace9.1.jpeg", "_Rplace9.2.jpeg", "_Rplace10.1.jpeg", "_Rplace10.2.png"];

      for (const fileName of imageFiles) {
        const storage = admin.storage();
        const bucket = storage.bucket();
        const file = bucket.file(`Rat/${fileName}`);
      
        try {
          const urls = await file.getSignedUrl({
            action: "read",
            expires: "01-01-2030", // เปลี่ยนเป็นวันที่หมดอายุตามที่คุณต้องการ
          });
      
          const imageUrl = urls[0];
          imageUrls.push(imageUrl);
        } catch (error) {
          console.error(`เกิดข้อผิดพลาดในการรับ URL รูปภาพสำหรับ ${fileName}:`, error);
        }
      }
    }

    data.imageUrls = imageUrls;
    res.render('travel_Rat.ejs', data);
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
    res.status(500).send("เกิดข้อผิดพลาดในการดึงข้อมูล");
  }
});

// ------------------------------------------------------------------------------------------

// ที่เที่ยวเพชรบุรี
app.get('/Travel_Phet', async function (req, res) {

  // ดึงข้อมูลจาก firebase
  try {
    const collectionRef = db.collection("Phet_Province");
    const data = {};
    const imageUrls = [];

    for (let i = 1; i <= 10; i++) {
      const documentRef = collectionRef.doc(`${i}_Place`);
      const docSnapshot = await documentRef.get();

      if (docSnapshot.exists) {
        data[`dataT${i}`] = docSnapshot.data();
      } else {
        res.status(404).send(`Document ${i} not found`);
        return;  // เมื่อเจอข้อผิดพลาดในการดึงข้อมูลจาก document แต่ละตัวให้หยุดและส่งข้อผิดพลาดกลับ
      }

      // ดึงรูปภาพจาก firebase
      const imageFiles = ["_PHplace1.1.jpeg", "_PHplace1.2.jpeg", "_PHplace2.1.jpeg", "_PHplace2.2.jpeg",
      "_PHplace3.1.jpeg", "_PHplace3.2.jpeg", "_PHplace4.1.jpeg", "_PHplace4.2.jpeg", "_PHplace5.1.jpeg", "_PHplace5.2.jpeg",
      "_PHplace6.1.jpeg", "_PHplace6.2.jpeg", "_PHplace7.1.jpeg", "_PHplace7.2.jpeg", "_PHplace8.1.jpeg", "_PHplace8.2.jpeg",
      "_PHplace9.1.jpeg", "_PHplace9.2.jpeg", "_PHplace10.1.jpg", "_PHplace10.2.jpeg"];

      for (const fileName of imageFiles) {
        const storage = admin.storage();
        const bucket = storage.bucket();
        const file = bucket.file(`Phet/${fileName}`);
      
        try {
          const urls = await file.getSignedUrl({
            action: "read",
            expires: "01-01-2030", // เปลี่ยนเป็นวันที่หมดอายุตามที่คุณต้องการ
          });
      
          const imageUrl = urls[0];
          imageUrls.push(imageUrl);
        } catch (error) {
          console.error(`เกิดข้อผิดพลาดในการรับ URL รูปภาพสำหรับ ${fileName}:`, error);
        }
      }
    }

    data.imageUrls = imageUrls;
    res.render('travel_Phet.ejs', data);
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
    res.status(500).send("เกิดข้อผิดพลาดในการดึงข้อมูล");
  }
});

// ------------------------------------------------------------------------------------------

// ที่เที่ยวประจวบคีรีขันธ์
app.get('/Travel_Prac', async function (req, res) {

  // ดึงข้อมูลจาก firebase
  try {
    const collectionRef = db.collection("Prac_Province");
    const data = {};
    const imageUrls = [];

    for (let i = 1; i <= 10; i++) {
      const documentRef = collectionRef.doc(`${i}_Place`);
      const docSnapshot = await documentRef.get();

      if (docSnapshot.exists) {
        data[`dataT${i}`] = docSnapshot.data();
      } else {
        res.status(404).send(`Document ${i} not found`);
        return;  // เมื่อเจอข้อผิดพลาดในการดึงข้อมูลจาก document แต่ละตัวให้หยุดและส่งข้อผิดพลาดกลับ
      }

      // ดึงรูปภาพจาก firebase
      const imageFiles = ["_PRplace1.1.jpeg", "_PRplace1.2.jpeg", "_PRplace2.1.jpeg", "_PRplace2.2.jpeg",
      "_PRplace3.1.jpeg", "_PRplace3.2.jpeg", "_PRplace4.1.jpeg", "_PRplace4.2.jpeg", "_PRplace5.1.jpeg", "_PRplace5.2.jpeg",
      "_PRplace6.1.jpeg", "_PRplace6.2.jpeg", "_PRplace7.1.jpeg", "_PRplace7.2.jpeg", "_PRplace8.1.jpeg", "_PRplace8.2.jpeg",
      "_PRplace9.1.jpeg", "_PRplace9.2.jpeg", "_PRplace10.1.jpeg", "_PRplace10.2.jpeg"];

      for (const fileName of imageFiles) {
        const storage = admin.storage();
        const bucket = storage.bucket();
        const file = bucket.file(`Prac/${fileName}`);
      
        try {
          const urls = await file.getSignedUrl({
            action: "read",
            expires: "01-01-2030", // เปลี่ยนเป็นวันที่หมดอายุตามที่คุณต้องการ
          });
      
          const imageUrl = urls[0];
          imageUrls.push(imageUrl);
        } catch (error) {
          console.error(`เกิดข้อผิดพลาดในการรับ URL รูปภาพสำหรับ ${fileName}:`, error);
        }
      }
    }

    data.imageUrls = imageUrls;
    res.render('travel_Prac.ejs', data);
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
    res.status(500).send("เกิดข้อผิดพลาดในการดึงข้อมูล");
  }
});

const mysql2 = require('mysql2');

// สร้างการเชื่อมต่อกับฐานข้อมูล MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'travel_history'
});

// ------------------------------------------------------------------------------------------

// ประวัติจังหวัดตาก
app.get('/History_Tak', (req, res) => {
  // ทำการ query ข้อมูลจากฐานข้อมูล
  connection.query('SELECT * FROM history', (err, rows) => {
    if (err) {
      console.error('Error executing query:', err);
      return;
    }
    // ส่งข้อมูลที่ดึงมาไปแสดงในหน้า HTML
    res.render('History_Tak.ejs', { row: rows[0] });
  });
});

// ------------------------------------------------------------------------------------------

// ประวัติจังหวัดกาญจนบุรี
app.get('/History_Kan', (req, res) => {
  // ทำการ query ข้อมูลจากฐานข้อมูล
  connection.query('SELECT * FROM history', (err, rows) => {
    if (err) {
      console.error('Error executing query:', err);
      return;
    }
    // ส่งข้อมูลที่ดึงมาไปแสดงในหน้า HTML
    res.render('History_Kan.ejs', { row: rows[1] });
  });
});

// ------------------------------------------------------------------------------------------

// ประวัติจังหวัดกาญราชบุรี
app.get('/History_Rat', (req, res) => {
  // ทำการ query ข้อมูลจากฐานข้อมูล
  connection.query('SELECT * FROM history', (err, rows) => {
    if (err) {
      console.error('Error executing query:', err);
      return;
    }
    // ส่งข้อมูลที่ดึงมาไปแสดงในหน้า HTML
    res.render('History_Rat.ejs', { row: rows[2] });
  });
});

// ------------------------------------------------------------------------------------------

// ประวัติจังหวัดเพชรบุรี
app.get('/History_Phet', (req, res) => {
  // ทำการ query ข้อมูลจากฐานข้อมูล
  connection.query('SELECT * FROM history', (err, rows) => {
    if (err) {
      console.error('Error executing query:', err);
      return;
    }
    // ส่งข้อมูลที่ดึงมาไปแสดงในหน้า HTML
    res.render('History_Phet.ejs', { row: rows[3] });
  });
});

// ------------------------------------------------------------------------------------------

// ประวัติจังหวัดประจวบคีรีขันธ์
app.get('/History_Prac', (req, res) => {
  // ทำการ query ข้อมูลจากฐานข้อมูล
  connection.query('SELECT * FROM history', (err, rows) => {
    if (err) {
      console.error('Error executing query:', err);
      return;
    }
    // ส่งข้อมูลที่ดึงมาไปแสดงในหน้า HTML
    res.render('History_Prac.ejs', { row: rows[4] });
  });
});

// ------------------------------------------------------------------------------------------

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// fb_data
app.get("/access", function(request, response) {
  response.sendFile(path.join(__dirname + "/feedback_data.html"));
});

app.post('/feedback_data', async (req, res) => {
  const username = req.body.user;
  const password = req.body.pass;
  
  const sql = `SELECT * FROM data_access WHERE user = '${username}' AND pass = '${password}'`;

  connection.query(sql, async (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      try {
        const snapshotT = await db.collection('FeedbackTak').get();
        const feedbackDataT = [];
        const snapshotK = await db.collection('FeedbackKan').get();
        const feedbackDataK = [];
        const snapshotPr = await db.collection('FeedbackPrac').get();
        const feedbackDataPr = [];
        const snapshotPh = await db.collection('FeedbackPhet').get();
        const feedbackDataPh = [];
        const snapshotR = await db.collection('FeedbackRat').get();
        const feedbackDataR = [];

        snapshotT.forEach((doc) => {
          feedbackDataT.push(doc.data());
        });
        snapshotK.forEach((doc) => {
          feedbackDataK.push(doc.data());
        });
        snapshotPr.forEach((doc) => {
          feedbackDataPr.push(doc.data());
        });
        snapshotPh.forEach((doc) => {
          feedbackDataPh.push(doc.data());
        });
        snapshotR.forEach((doc) => {
          feedbackDataR.push(doc.data());
        });

        res.render('fb.ejs', { feedbackDataT, feedbackDataK, feedbackDataPr, feedbackDataPh, feedbackDataR });
      } catch (error) {
        console.error('Error fetching feedback:', error);
        res.status(500).send('Error fetching feedback');
      }
    } else {
      res.send('<script>alert("Invalid username or password!"); window.location.href = "/access";</script>');
    }
  });
});

// ------------------------------------------------------------------------------------------

const db = admin.firestore();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const port = process.env.port || 8008;
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});

// // รับ request จาก Frontend เพื่ออัปเดตค่า click count ในฐานข้อมูล SQL
// app.post('/updateClickCount', (req, res) => {
//   const { placeId } = req.body;

//   // ส่งคำสั่ง SQL UPDATE ไปยังฐานข้อมูล
//   const sqlQuery = `UPDATE LikeCount SET clickCount = clickCount + 1 WHERE placeId = ${placeId}`;

//   connection.query(sqlQuery, (err, result) => {
//     if (err) {
//       console.error('Error updating click count:', err);
//       res.status(500).send('Failed to update click count');
//       return;
//     }

//     console.log('Click count updated successfully!');
//     res.status(200).send('Click count updated successfully');
//   });
// });

// ------------------------------------------------------------------------------------------

app.post('/updateClickCount', (req, res) => {
  const { placeId } = req.body;

  // ส่งคำสั่ง SQL UPDATE ไปยังฐานข้อมูล
  const sqlQuery = `UPDATE LikeCount SET clickCount = clickCount + 1 WHERE placeId = ${placeId}`;

  connection.query(sqlQuery, (err, result) => {
    if (err) {
      console.error('Error updating click count:', err);
      res.status(500).send('Failed to update click count');
      return;
    }

    // เมื่อทำการอัปเดตค่า clickCount เรียบร้อยแล้ว ให้ดึงค่า clickCount จากฐานข้อมูล
    const selectQuery = `SELECT clickCount FROM LikeCount WHERE placeId = ${placeId}`;
    connection.query(selectQuery, (err, rows) => {
      if (err) {
        console.error('Error fetching click count:', err);
        res.status(500).send('Failed to fetch click count');
        return;
      }

      // ส่งข้อมูล clickCount กลับไปยัง Frontend
      res.status(200).json({ clickCount: rows[0].clickCount });
    });
  });
});

// ------------------------------------------------------------------------------------------

// Check Cookie Session
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],
  maxAge: 3600*1000 // Time: 1 hr
}));

// Check Session
app.use(session({
  secret: "secret",
  resave: true,
  saveUninitialized: true
})
);

// ------------------------------------------------------------------------------------------

// Home Page
app.get("/home", (req, res) => {
  if (req.session.loggedin) {
    connections.query("SELECT * FROM UserTable", (err, result) => {
      if (err) {
        console.error('Error: ' + err.stack);
        return res.status(500).send('Internal Server Error');
      }

      // Pass the userLoggedIn information to the template
      res.render("home.ejs", {
        userLoggedIn: req.session.loggedin,
        currentUser: { Username: req.session.userID }, // Assuming this is how to store the username in the session
        posts: result,
      });
      console.log(result);
    });
  } else {
    res.render("home.ejs", {
      userLoggedIn: false,
      currentUser: null,
      posts: null, // You may want to modify this depending on your requirements
    });
    console.log("User not logged in");
  }
});

// ------------------------------------------------------------------------------------------

// Product Page
app.get("/product", (req, res) => {
  if (req.session.loggedin) {
    connections.query("SELECT * FROM UserTable", (err, result) => {
      if (err) {
        console.error('Error: ' + err.stack);
        return res.status(500).send('Internal Server Error');
      }

      // Pass the userLoggedIn information to the template
      res.render("product.ejs", {
        userLoggedIn: req.session.loggedin,
        currentUser: { Username: req.session.userID }, // Assuming this is how to store the username in the session
        posts: result,
      });
      console.log(result);
    });
  } else {
    res.render("product.ejs", {
      userLoggedIn: false,
      currentUser: null,
      posts: null, // You may want to modify this depending on your requirements
    });
    console.log("User not logged in");
  }
});

// ------------------------------------------------------------------------------------------

// Contact Page
app.get("/contact", (req, res) => {
  if (req.session.loggedin) {
    connections.query("SELECT * FROM UserTable", (err, result) => {
      if (err) {
        console.error('Error: ' + err.stack);
        return res.status(500).send('Internal Server Error');
      }

      // Pass the userLoggedIn information to the template
      res.render("contact.ejs", {
        userLoggedIn: req.session.loggedin,
        currentUser: { Username: req.session.userID }, // Assuming this is how to store the username in the session
        posts: result,
      });
      console.log(result);
    });
  } else {
    res.render("contact.ejs", {
      userLoggedIn: false,
      currentUser: null,
      posts: null, // You may want to modify this depending on your requirements
    });
    console.log("User not logged in");
  }
});

// ------------------------------------------------------------------------------------------

// Register Page
app.get("/register", (req, res) => {
  res.render("register.ejs");
});

// Handle Register
app.post("/register", (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const phoneNumber = req.body.phoneNumber;
  const birthDate = req.body.birthDate;

  // Check if the username already exists
  connections.query("SELECT COUNT(*) AS count FROM UserTable WHERE Username = ?", [username], function (err, result) {
    if (err) {
      console.error('Error checking username existence: ' + err.stack);
      res.redirect('/register');
      return;
    }

    const countUsername = result[0].count;

    if (countUsername > 0) {
      // Username already in use, show an alert on the page
      res.send('<script>alert("This username is already in use!");window.location.href = "/register";</script>');
      return;
    }

    // Check if the email already exists
    connections.query("SELECT COUNT(*) AS count FROM UserTable WHERE Email = ?", [email], function (err, result) {
      if (err) {
        console.error('Error checking email existence: ' + err.stack);
        res.redirect('/register');
        return;
      }

      const countEmail = result[0].count;

      if (countEmail > 0) {
        // Email already in use, show an alert on the page
        res.send('<script>alert("This email is already in use!");window.location.href = "/register";</script>');
        return;
      }

      // Check if the phone number already exists
      connections.query("SELECT COUNT(*) AS count FROM UserTable WHERE PhoneNumber = ?", [phoneNumber], function (err, result) {
        if (err) {
          console.error('Error checking phone number existence: ' + err.stack);
          res.redirect('/register');
          return;
        }

        const countPhoneNumber = result[0].count;

        if (countPhoneNumber > 0) {
          // Phone number already in use, show an alert on the page
          res.send('<script>alert("This phone number is already in use!");window.location.href = "/register";</script>');
          return;
        }

        // Generate a random verification code
        const verificationCode = randomstring.generate(6);

        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(password, salt, function (err, hash) {
            connections.query(
              "INSERT INTO UserTable (Username, Email, Password, ConfirmPassword, PhoneNumber, BirthDate, VerificationCode, Verified) VALUES (?, ?, ?, ?, ?, ?, ?, 0)",
              [username, email, hash, hash, phoneNumber, birthDate, verificationCode],
              function (err) {
                if (err) {
                  console.error('Error inserting into the database: ' + err.stack);
                  res.redirect('/register');
                  return;
                }

                // Send verification email
                sendVerificationEmail(email, verificationCode);
          
                // Registration successful alert and redirection to verification code page
                res.redirect(`/enter-verification-code?email=${email}`);
              }
            );
          });
        });
      });
    });
  });
});

// ------------------------------------------------------------------------------------------

// Handle Email Verification Code
app.get("/verify/:email/:code", (req, res) => {
  const email = req.params.email;
  const verificationCode = req.params.code;

  connections.query(
    "UPDATE UserTable SET Verified = 1 WHERE Email = ? AND VerificationCode = ?",
    [email, verificationCode],
    function (err, result) {
      if (err) {
        console.error('Error verifying email: ' + err.stack);
        res.redirect('/logins');
        return;
      }
    }
  );
});

// Function to send verification code to email
function sendVerificationEmail(email, verificationCode) {

  // Setup Nodemailer Transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'westernthailand.at@gmail.com',
      pass: 'ulwu gjyg gttz vvbp',
    },
  });
  
   // Information in Send Email 
    const mailOptions = {
      from: 'your-email@gmail.com',
      to: email,
      subject: 'Account Verification',
      html: `<p>Your verification code is: ${verificationCode}</p>`,
    };
  
    // Check Send Email
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error('Error sending verification email: ' + error.stack);
      } else {
        console.log('Verification email sent: ' + info.response);
      }
    });
}

// Render the verification code entry page
app.get("/enter-verification-code", (req, res) => {
  const email = req.query.email;

  res.render("enter-verification-code.ejs", { email });
});

// Handle verification code submission
app.post("/enter-verification-code", (req, res) => {
  const email = req.body.email;
  const verificationCode = req.body.verificationCode;

  connections.query(
    "SELECT * FROM UserTable WHERE Email = ? AND VerificationCode = ?",
    [email, verificationCode],
    function (err, result) {
      if (err) {
        console.error('Error validating verification code: ' + err.stack);
        res.redirect(`/enter-verification-code?email=${email}`);
        return;
      }

      if (result.length > 0) {

        // Update the user's status to verified in the database
        connections.query(
          "UPDATE UserTable SET Verified = 1 WHERE Email = ? AND VerificationCode = ?",
          [email, verificationCode],
          function (err) {
            if (err) {
              console.error('Error updating user status: ' + err.stack);
              res.redirect(`/enter-verification-code?email=${email}`);
              return;
            }

            // Redirect to the login page after successful verification
            res.redirect('/logins');
          }
        );
      } else {
        // Invalid verification code, redirect back to the verification code entry page
        res.redirect(`/enter-verification-code?email=${email}`);
      }
    }
  );
});

// ------------------------------------------------------------------------------------------

// Profile Page from Login
app.get("/login", (req, res) => {
  // Update timestamp in the database
  const currentTime = moment().tz('Asia/Bangkok').format('YYYY-MM-DD HH:mm:ss');
  
  if (req.session.loggedin) {
    connections.query("SELECT * FROM UserTable", (err, result) => {
      connections.query("UPDATE UserTable SET Timestamp = ? WHERE Username = ?", [currentTime, req.session.userID], (updateErr, updateResult) => {
        if (updateErr) {
          console.error('Error updating Timestamp timestamp: ' + updateErr.stack);
        }

        // Pass the userLoggedIn information to the template
        res.render("profile.ejs", {
          userLoggedIn: req.session.loggedin,
          currentUser: { Username: req.session.userID }, // Assuming this is how to store the username in the session
          posts: result,
        });
        console.log(result);
      });
    });
  } else {
    res.send('<script>alert("You are not logged in!"); window.location.href="/logins";</script>');
    console.log("User not logged in");
  }
});

app.get("/logins", (req, res) => {
  res.render("logins.ejs");
});

const loginLimiter = rateLimit({
  max: Infinity,
});

// Handle Login Page
app.post("/logins", loginLimiter, (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    const errorMessage = "Both of fields are required!";
    return res.render('logins', { error: errorMessage });
  }

  // Input validation
  if (!isValidUsername(username)) {
    const errorMessage = "Invaild Username!";
    return res.render('logins', { error: errorMessage });
  }

  if (!isValidPassword(password)) {
    const errorMessage = "Incorrect password!";
    return res.render('logins', { error: errorMessage });
  }

  // Check if username and password are match in mysql to able for login
  if (username && password) {
    connections.query(
      "SELECT * FROM UserTable WHERE Username = ?",
      [username],
      function (err, results) {
        if (err) {
          console.error('Error querying the database: ' + err.stack);
          const errorMessage = "An error occurred. Please try again.";
          return res.render('logins', { error: errorMessage });
        }

        if (results.length > 0) {
          const hashedPassword = results[0].Password;

          bcrypt.compare(password, hashedPassword, function (err, match) {
            if (err) {
              console.error('Error comparing passwords: ' + err.stack);
              const errorMessage = "An error occurred. Please try again.";
              return res.render('logins', { error: errorMessage });
            }

            if (match) {
              // Successful login
              req.session.loggedin = true;
              req.session.userID = results[0].Username;

              // Introduce a delay of 2 seconds (2000 milliseconds) before rendering the profile page
              setTimeout(() => {
                res.render('login', { posts: results, username: results[0].Username });
              }, 1000);
            } else {
              // Incorrect password
              const errorMessage = "Incorrect password!";
              res.render('logins', { error: errorMessage });
            }
          });
        } else {
          // User not found
          const errorMessage = "User Not Found!";
          return res.render('logins', { error: errorMessage });
        }
      }
    );
  }
});

// Check Username
function isValidUsername(input) {
  const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;

  return usernameRegex.test(input);
}

// Check Password
function isValidPassword(input) {
  const schema = new passwordValidator();
  schema
    .is().min(6) // Minimum length 6
    .has().uppercase() // Must have uppercase letters
    .has().lowercase() // Must have lowercase letters
    .has().digits(); // Must have digits

  return schema.validate(input);
}

// ------------------------------------------------------------------------------------------

// Handle Logout
app.get("/logout", (req, res) => {
  // Set logged property to false and remove user-related information
  req.session.loggedin = false;
  req.session.userID = null; // or any other user-related information you need to clear

  // Redirect to the login page or any other page you desire
  res.redirect("/logins");
});

// ------------------------------------------------------------------------------------------

// Check Change Password
function isValidPassword(password) {
  const hasLowerCase = /[a-z]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasMinLength = password.length >= 6;

  return hasLowerCase && hasUpperCase && hasDigit && hasMinLength;
}

app.get("/change-password", (req, res) => {
  res.render("change-password.ejs");
});

// Handle Change Password
app.post("/change-password", (req, res) => {
  const currentPassword = req.body.currentPassword;
  const newPassword = req.body.newPassword;
  const confirmPassword = req.body.confirmPassword;

  if (!currentPassword || !newPassword || !confirmPassword) {
    const errorMessage = "All fields are required!";
    return res.render("change-password", { error: errorMessage });
  }

  // Additional validation for new password
  const isLowerCase = /[a-z]/.test(newPassword);
  const isUpperCase = /[A-Z]/.test(newPassword);
  const isDigit = /\d/.test(newPassword);
  const hasMinLength = newPassword.length >= 6;

  if (!isLowerCase || !isUpperCase || !isDigit || !hasMinLength) {
    const errorMessages = [];
    if (!isLowerCase) {
      errorMessages.push("Password must contain at least one lowercase letter.");
    }
    if (!isUpperCase) {
      errorMessages.push("Password must contain at least one uppercase letter.");
    }
    if (!isDigit) {
      errorMessages.push("Password must contain at least one digit.");
    }
    if (!hasMinLength) {
      errorMessages.push("Password must have at least 6 characters.");
    }

    const errorMessage = errorMessages.join(" ");
    return res.render("change-password", { error: errorMessage });
  }

  // Check if new password matches the confirmed password
  if (newPassword !== confirmPassword) {
    const errorMessage = "New password and confirm password do not match!";
    return res.render("change-password", { error: errorMessage });
  }

  // Check if the new password is the same as the current password
  if (currentPassword === newPassword) {
    const errorMessage = "New password must be different from the current password!";
    return res.render("change-password", { error: errorMessage });
  }

  // Check if have username in database
  connections.query(
    "SELECT * FROM UserTable WHERE Username = ?",
    [req.session.userID],
    (err, results) => {
      if (err) {
        console.error("Error querying the database: " + err.stack);
        const errorMessage = "An error occurred. Please try again.";
        return res.render("change-password", { error: errorMessage });
      }

      if (results.length > 0) {
        const hashedPassword = results[0].Password;

        bcrypt.compare(currentPassword, hashedPassword, (err, match) => {
          if (err) {
            console.error("Error comparing passwords: " + err.stack);
            const errorMessage = "An error occurred. Please try again.";
            return res.render("change-password", { error: errorMessage });
          }

          if (match) {
            // Current password is correct, update the password
            bcrypt.hash(newPassword, 10, (err, hashedNewPassword) => {
              if (err) {
                console.error("Error hashing the new password: " + err.stack);
                const errorMessage = "An error occurred. Please try again.";
                return res.render("change-password", { error: errorMessage });
              }

              // Check if have username and password in database
              connections.query(
                "UPDATE UserTable SET Password = ? WHERE Username = ?",
                [hashedNewPassword, req.session.userID],
                (updateErr, updateResult) => {
                  if (updateErr) {
                    console.error(
                      "Error updating password: " + updateErr.stack
                    );
                    const errorMessage =
                      "An error occurred. Please try again.";
                    return res.render("change-password", {
                      error: errorMessage,
                    });
                  }

                  // Password successfully updated
                  const successMessage = "Change Password Suceessfully!";
                  res.render("change-password", { success: successMessage });
                }
              );
            });
          } else {
            // Incorrect current password
            const errorMessage = "Incorrect Current Password!";
            res.render("change-password", { error: errorMessage });
          }
        });
      } else {
        // User not found
        const errorMessage = "User Not Found!";
        return res.render("change-password", { error: errorMessage });
      }
    }
  );
});

// ------------------------------------------------------------------------------------------

// Forget Password Page
app.get("/forget-password", (req, res) => {
  res.render("forget-password.ejs");
});

// Handle Forget Password
app.post("/forget-password", (req, res) => {
  const email = req.body.email;

  // Check if the email exists in the database
  connections.query("SELECT * FROM UserTable WHERE Email = ?", [email], function (err, result) {
    if (err) {
      console.error('Error checking email existence: ' + err.stack);
      res.redirect('/forget-password');
      return;
    }

    if (result.length === 0) {
      // Email not found, show an alert on the page
      res.send('<script>alert("This email is not Registered!");window.location.href = "/forget-password";</script>');
      return;
    }

    // Generate a random reset token
    const resetToken = randomstring.generate(20);

    // Store the reset token and its expiration time in the database
    const resetExpiration = new Date(Date.now() + 3600000); // 1 hour expiration
    connections.query(
      "UPDATE UserTable SET ResetToken = ?, ResetTokenExpiration = ? WHERE Email = ?",
      [resetToken, resetExpiration, email],
      function (err) {
        if (err) {
          console.error('Error updating reset token: ' + err.stack);
          res.redirect('/forget-password');
          return;
        }

        // Send reset password email
        sendResetPasswordEmail(email, resetToken);

        // Redirect to a page indicating that the reset email has been sent
        res.redirect('/reset-email-sent');
      }
    );
  });
});

// ------------------------------------------------------------------------------------------

// Reset Email Sent Page
app.get("/reset-email-sent", (req, res) => {
  res.render("reset-email-sent.ejs");
});


// Reset Password Page
app.get("/reset-password/:token", (req, res) => {
  const resetToken = req.params.token;

  // Check if the reset token is valid and not expired
  connections.query(
    "SELECT * FROM UserTable WHERE ResetToken = ? AND ResetTokenExpiration > NOW()",
    [resetToken],
    function (err, result) {
      if (err || result.length === 0) {
        // Invalid or expired token, redirect to forget password page
        res.redirect('/forget-password');
      } else {
        // Render the reset password page with the token
        res.render("reset-password.ejs", { token: resetToken });
      }
    }
  );
});

// ------------------------------------------------------------------------------------------

// Handle Reset Password
app.post("/reset-password", (req, res) => {
  const resetToken = req.body.token;
  const newPassword = req.body.newPassword;

  // Check if the reset token is valid and not expired
  connections.query(
    "SELECT * FROM UserTable WHERE ResetToken = ? AND ResetTokenExpiration > NOW()",
    [resetToken],
    function (err, result) {
      if (err || result.length === 0) {
        // Invalid or expired token, redirect to forget password page
        res.redirect('/forget-password');
      } else {
        // Update the user's password in the database
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(newPassword, salt, function (err, hash) {
            connections.query(
              "UPDATE UserTable SET Password = ?, ResetToken = NULL, ResetTokenExpiration = NULL WHERE ResetToken = ?",
              [hash, resetToken],
              function (err) {
                if (err) {
                  console.error('Error updating password: ' + err.stack);
                  res.redirect('/forget-password');
                  return;
                }

                // Redirect to the login page after successful password reset
                res.redirect('/logins');
              }
            );
          });
        });
      }
    }
  );
});

// Create a Nodemailer transporter using SMTP details
const transporter = nodemailer.createTransport({
  service: 'gmail', // Update this with your email service provider
  auth: {
    user: 'westernthailand.at@gmail.com', // Update with your email address
    pass: 'ulwu gjyg gttz vvbp', // Update with your email password
  },
});

// Assume your reset password page route is "/reset-password/:token"
function sendResetPasswordEmail(email, resetToken) {
  // Update the following line with your actual application URL
  const appUrl = 'http://localhost:9009';
  const resetUrl = `${appUrl}/reset-password/${resetToken}`;

  // Information for Reset Password Email
  const mailOptions = {
    from: 'westernthailand.at@gmail.com',
    to: email,
    subject: 'Password Reset',
    html: `<p>Click <a href="${resetUrl}">here</a> to reset your password.</p>`,
  };

  // Send Reset Email link
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error('Error sending reset password email: ' + error.stack);
    } else {
      console.log('Reset password email sent: ' + info.response);
    }
  });
}

// ------------------------------------------------------------------------------------------

// Delete User
app.get("/delete/:ID", (req, res) => {
  connections.query(
    "DELETE FROM UserTable WHERE ID = ?",
    [req.params.ID],
    (err, results) => {
      if (err) {
        // Handle error if the deletion fails
        console.error(err);
        return res.status(500).send("Internal Server Error");
      }

      // Check if any rows were affected by the delete operation
      if (results.affectedRows > 0) {
        // Display an alert before redirecting
        return res.send(
          `<script>alert('User deleted successfully'); window.location.href='/logins';</script>`
        );
      } else {
        // No rows were affected, meaning the user with the given ID was not found
        return res.status(404).send("User not found");
      }
    }
  );
});

// ------------------------------------------------------------------------------------------

// 404 Not Found Page
app.use((req, res, next) => {
  res.status(404).render('not-found'); // Render the not_found.ejs file
});
