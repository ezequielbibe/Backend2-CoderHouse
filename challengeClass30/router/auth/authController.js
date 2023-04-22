export const loginControllerGet = (req, res) => {
    if(req.session.passport) {
        res.redirect('/')
        return
    }
    res.render('login')
}

export const loginControllerPost = (req, res)=> {
    res.redirect('/')
}

export const registerControllerGet = (req, res) => {
    if(req.session.passport) {
        res.redirect('/')
        return
    }
    res.render('register')
}

export const registerControllerPost = async (req, res) => {
    res.redirect('/')
}

export const logoutControllerGet = (req, res)=> {
    res.render('logout', {userName: req.session.passport.user.email})
    req.session.destroy()
}