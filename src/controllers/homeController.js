import pool from "../configs/connectDB";
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
    const [rows] = await pool.execute('insert into users(firstName, lastName, email, address) values(?,?,?,?)', [firstName, lastName, email, address])
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

module.exports = {
    getHomepage,
    getDetailPage,
    createNewUser,
    deleteUser,
    updateUserPage,
    updateUser
}