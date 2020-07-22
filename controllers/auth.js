const bcrypt = require('bcrypt')

const register = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            status: 400,
            message: "Please enter a name, email, and password"
        })
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return res.status(500).json({
            status: 500,
            message: 'Something went wrong. Please try again.'
        })
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) return res.status(500).json({
                status: 500,
                message: 'Something went wrong. Please try again.'
            })

            var userData = {
                "first_name": req.body.first_name,
                "last_name": req.body.last_name,
                "email": req.body.email,
                "password": hash,
                "created": new Date()
               }


            db.query('INSERT INTO users SET ?',userData, (err, result) => {
                
                if (err) return res.status(500).json({ status: 500, message: err })
                return res.status(200).json({ status: 200, message: "User registered!",result })
            });
        })         
    })

}

const login = (req,res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ status: 400, message: 'Please enter your email and password' });
    }

    let email = req.body.email;
    let password = req.body.password;
    
    db.query("SELECT * FROM users WHERE email = ?",[email],(err,results)=>{
        if (err) return res.status(500).json({ status: 500, message: 'Something went wrong. Please try again' });
        if(results.length==0) return res.status(500).json({ status: 500, message: 'No User with this email' });

        // res.json(results[0].password)
        bcrypt.compare(req.body.password, results[0].password, (err, isMatch) => {
            if (err) return res.status(500).json({ status: 500, message: 'Something went wrong. Please try again' });

            if (isMatch) {
                req.session.currentUser = { id: results[0].id };
                return res.status(200).json({ status: 200, message: 'Success', data: results[0].id });
            } else {
                return res.status(400).json({ status: 400, message: 'Email or password is incorrect' });
            }
        });
        

    })
}

const logout = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
  
    req.session.destroy((err) => {
        if (err) return res.status(500).json({ status: 500, message: 'Something went wrong. Please try again' });
        res.sendStatus(200);
    });
};
const verify = (req, res) => {
    if (!req.session.currentUser) return res.status(401).json({ status: 401, message: 'Unauthorized' });
    res.status(200).json({
        status: 200,
        message: `Current User verified. User ID: ${req.session.currentUser.id}`
    });
};

module.exports = {
    register,
    login,
    logout,
    verify
}