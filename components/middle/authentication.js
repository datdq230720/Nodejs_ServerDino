const jwt = require('jsonwebtoken');
exports.checkLogin = function (req, res, next) {

    const { session } = req;
    var update = global.update;
    console.log(">>>>ss: " + session.cookie._expires);
    const url = req.originalUrl.toLowerCase();
    if (!session) {
        if (url.includes('/login-user')) {
            next();
        } else {
            res.redirect('/login-user');
        }
    } else {
        const { token } = session;
        if (!token) {
            if (url.includes('/login-user')) {
                next();
            } else {
                res.redirect('/login-user');
            }
        } else {
            jwt.verify(token, 'token', function (error, decoded) {
                if (error) {
                    if (url.includes('/login-user')) {
                        next();
                    } else {
                        res.redirect('/login-user');
                    }
                } else {
                    if (url.includes('/login-user')) {
                        res.redirect('/error');
                    } else {
                        next();
                    }
                }
            })
        }
    }
}

exports.checkAdmin = function (req, res, next) {

    const { session } = req;
    var update = global.update;
    console.log(">>>>ss: " + session.cookie._expires);
    const url = req.originalUrl.toLowerCase();
    if (!session) {
        if (url.includes('/admin/login')) {
            next();
        } else {
            res.redirect('/admin/login');
        }
    } else {
        const { token } = session;
        if (!token) {
            if (url.includes('/admin/login')) {
                next();
            } else {
                res.redirect('/admin/login');
            }
        } else {
            jwt.verify(token, 'token', function (error, decoded) {
                if (error) {
                    if (url.includes('/admin/login')) {
                        next();
                    } else {
                        res.redirect('/admin/login');
                    }
                } else {
                    if (url.includes('/admin/login')) {
                        res.redirect('/user/error');
                    } else {
                        next();
                    }
                }
            })
        }
    }
}
// sử dụng cho API
exports.checkToken = function (req, res, next) {
    let token = null;
    if (req.headers.authorization &&
        req.headers.authorization.split(' ')[0] == 'Bearer')
        token = req.headers.authorization.split(' ')[1];

    if (token) {
        jwt.verify(token, 'token', function (error, decoded) {
            if (error) {
                res.json({status: false})
            } else {
                next();
            }
        })
    } else {
        res.json({status: true})
    }
}

