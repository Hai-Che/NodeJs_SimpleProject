import pool from "../configs/connectDB";
import multer from "multer";
let getHomepage = async (req, res) => {
    const [rows] = await pool.execute('SELECT * FROM `users`')
    return res.render('index.ejs', { data: rows })
}

let getDetailPage = async (req, res) => {
    let id = req.params.id;
    const [rows] = await pool.execute('SELECT * FROM `users` WHERE id = ?', [id])
    // return res.render('detail.ejs', { data: rows })
    return res.send(rows)
}

let createNewUser = async (req, res) => {
    let { firstName, lastName, email, address } = req.body;
    await pool.execute('insert into users(firstName, lastName, email, address) values(?,?,?,?)', [firstName, lastName, email, address])
    return res.redirect('/')
}

let deleteUser = async (req, res) => {
    let id = req.body.id;
    await pool.execute('delete from users where id = ?', [id])
    return res.redirect('/')
}

let updateUserPage = async (req, res) => {
    let id = req.params.id;
    let [user] = await pool.execute('SELECT * FROM `users` WHERE id = ?', [id])
    return res.render('update.ejs', { data: user[0] })
}

let updateUser = async (req, res) => {
    let { firstName, lastName, email, address, id } = req.body;
    await pool.execute('UPDATE `users`  set firstName = ?, lastName = ?, email = ?, address = ? where id = ?', [firstName, lastName, email, address, id])
    return res.redirect('/')
}





let getUploadFile = async (req, res) => {
    return res.render('uploadFile.ejs')
}

let handleUploadFile = async (req, res) => {

    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.file) {
        return res.send('Please select an image to upload');
    }

    // Display uploaded image for user validation
    res.send(`You have uploaded this image: <hr/><img src="/img/${req.file.filename}" width="500"><hr /><a href="/uploadFile">Upload another image</a>`);
}

let handleUploadFiles = async (req, res) => {

    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.files) {
        return res.send('Please select an image to upload');
    }

    let result = "You have uploaded this image: <hr />"
    const files = req.files;
    let index, len;

    for (index = 0, len = files.length; index < len; ++index) {
        result += `<img src="/img/${files[index].filename}" width="300"></img>`
    }
    result += `<hr /><a href="/uploadFile">Upload another image</a>`
    res.send(result)
    // Display uploaded image for user validation
    // res.send(`You have uploaded this image: <hr/><img src="/img/${req.file.filename}" width="500"><hr /><a href="/uploadFile">Upload another image</a>`);
    // });
}




module.exports = {
    getHomepage,
    getDetailPage,
    createNewUser,
    deleteUser,
    updateUserPage,
    updateUser,
    getUploadFile,
    handleUploadFile,
    handleUploadFiles
}