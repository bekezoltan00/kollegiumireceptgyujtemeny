var express = require('express');
var passport = require('passport');
var router = new express.Router;

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    req.flash('error', 'A kért tartalom megtekintéséhez be kell jelentekzni!');
    res.redirect('/login/login');
}

function andRestrictTo(role) {
    return function(req, res, next) {
        if (req.user.role == role) {
            next();
        } else {
            res.status(403).send('mennyinnen');
        }
    }
}

router.route('/login/login')
    .get(function (req, res) {
        res.render('login/index', {
            uzenetek: req.flash()
        });
    })
    .post(passport.authenticate('local-login', {
        successRedirect: '/list',
        failureRedirect: '/login/login',
        failureFlash: true,
        badRequestMessage: 'Hibás felhasználó vagy jelszó!'
    }));
    
router.route('/login/signup')
    .get(function (req, res) {
        res.render('login/signup', {
            uzenetek: req.flash()
        });
    })
    .post(passport.authenticate('local-signup', {
        successRedirect:    '/login/login',
        failureRedirect:    '/login/signup',
        failureFlash:       true,
        badRequestMessage:  'Hiányzó adatok'
    }));

router.use('/login/logout', function (req, res) {
    req.logout();
    res.redirect('/login/login');
});

router.route('/')
    .get(function (req, res) {
        res.render('info');
    });
router.route('/add')
    .get(ensureAuthenticated, function (req, res) { 
        res.render('add', {
            uzenetek: req.flash()
        }); 
    })
    .post(ensureAuthenticated, function (req, res) {
        req.checkBody('nev').notEmpty().withMessage('Hiányzik a recept neve!');
        req.checkBody('leiras').notEmpty().withMessage('Hiányzik a recept leírása!');
        if (req.validationErrors()) {
            req.validationErrors().forEach(function (error) {
                req.flash('error', error.msg);
            });
            res.redirect('/add');
        } else {
            req.app.models.recipe.create({
                nev: req.body.nev,
                nehezseg: req.body.nehezseg,
                leiras: req.body.leiras,
            })
            .then(function () {
                req.flash('success', 'Recept sikeresen létrehozva.');
                res.redirect('/list'); 
            });
        }
    });
router.route('/list')
    .get(ensureAuthenticated, function (req, res) {
        var result;
        
        if (req.query.kereses) {
            result = req.app.models.recipe.find({
                leiras: { 'contains': req.query.kereses }
            });
        } else {
            result = req.app.models.recipe.find();
        }
        
        result.then(function (receptek) {
            res.render('list', {
                uzenetek: req.flash(),
                receptek: receptek
            });
        });
    });
router.route('/delete/:id')
    .get(ensureAuthenticated, function (req, res) {
        req.app.models.recipe.destroy({
            id: req.params.id
        }).then(function () {
            req.flash('success', 'Recept törölve.');
            res.redirect('/list');  
        });
    });
router.route('/ready/:id')
    .get(ensureAuthenticated, function (req, res) {
        req.app.models.recipe.update({
            id: req.params.id
        }, {
            kesz: true
        }).then(function () {
            req.flash('success', 'Recept sikeresen elfogadva.');
            res.redirect('/list');  
        });
    });

var recipe_id;

router.route('/recipe/:id')
    .get(ensureAuthenticated, function (req, res) {
        recipe_id = req.params.id;
        req.app.models.recipe.findOne({
            id: req.params.id
        }).then(function (recept) {
            res.render('recipe', {
                uzenetek: req.flash(),
                recept: recept
            })
        });
    })
    .post(ensureAuthenticated, function (req, res) {
        req.checkBody('nev').notEmpty().withMessage('Hiányzik a recept neve!');
        req.checkBody('leiras').notEmpty().withMessage('Hiányzik a recept leírása!');
        if (req.validationErrors()) {
            req.validationErrors().forEach(function (error) {
                req.flash('error', error.msg);
            });
            res.redirect('/recipe/'+recipe_id);
        } else {
            req.app.models.recipe.create({
                nev: req.body.nev,
                nehezseg: req.body.nehezseg,
                leiras: req.body.leiras,
            })
            .then(function () {
                req.app.models.recipe.destroy({
                    id: req.params.id
                }).then(function () {
                    req.flash('success', 'Recept sikeresen módosítva.');
                    res.redirect('/list'); 
                })
            })
        }
    });
    
module.exports = router;