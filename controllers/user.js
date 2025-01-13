import User from '../models/user.js'

const login = (req, res, next) => {
    let message = req.session.error || ''
    req.session.error = ''
    res.render('login', { user: req.session.user || '', message })
}

const logout = (req, res, next) => {
    req.session.destroy()
    res.redirect('/')
}

const auth = (req, res, next) => {
    const data = {
        email: req.body.email,
        password: req.body.password
    }

    req.session.error = ''

    User.findOne({ where: { email: data.email } })
        .then((user) => {
            if (!user) {
                req.session.error = 'Email not registered.'
                res.redirect('/login')
            } else if (data.password != user.password) {
                req.session.error = 'Incorrect password.'
                res.redirect('/login')
            } else {
                req.session.user = user
                res.redirect('/')
            }
        })
        .catch((error) => {
            req.session.error = error
            res.redirect('/login')
        })
}

export default { login, logout, auth }