const express = require('express');

const port = 9000;

const app = express();

const db = require('./config/db');

const UserModel = require('./models/UserModel');


app.set(`view engine`, `ejs`);

app.use(express.urlencoded());


app.get(`/`, (req, res) => {
    return res.render(`form`);
})


app.post('/adduser', (req, res) => {
    const { bookname, descripion, price, authorname, page } = req.body;
    UserModel.create({
        userbookname: bookname,
        userdescripion: descripion,
        userprice: price,
        userauthorname: authorname,
        userpage: page

    }).then((record) => {
        console.log(record);
        console.log('user create');
        return res.redirect('/');
    }).catch((err) => {
        console.log(err);
        return false;
    })
})

app.get(`/deleteid`, (req, res) => {
    let id = req.query.did;
    UserModel.findByIdAndDelete(id)
        .then((data) => {
            console.log('record deleted');
            return res.redirect('/viewuser');
        }).catch((err) => {
            console.log(err);
            return false;
        })

})

app.get('/edituser', (req, res) => {
    let id = req.query.eid;
    UserModel.findById(id)
        .then((single) => {
            return res.render('edit', {
                single
            });
        })
        .catch((err) => {
            console.log(err);
            return false;
        })
})

app.post(`/updateuser`, (req, res) => {
    const { editid, bookname, descripion, price, authorname, page } = req.body;

    UserModel.findByIdAndUpdate(editid, {
        userbookname: bookname,
        userdescripion: descripion,
        userprice: price,
        userauthorname: authorname,
        userpage: page

    }).then((user) => {
        console.log(`user updated`);
        return res.redirect('/viewuser');
    })
        .catch((err) => {
            console.log(err);
            return false;
        })
        
})  

app.get(`/viewuser`, (req, res) => {
    UserModel.find({})
        .then((record) => {
            return res.render('table', {
                allrecord: record
            })
        }).catch((err) => {
            console.log(err);
            return false;
        })
})

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(`server start on port ${port}`);
})