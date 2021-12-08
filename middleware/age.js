module.exports = function(req, res, next) {
    if (!req.body.dob) return next();
    const today = new Date();
    const birthDate = new Date(req.body.dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    try {
        if (age >= 13) {
            console.log(age)
            req.age = age
            next()
        } else {
            return res.status(400).json({
                message: "Your age must be greater that 13 years"
            })
        }
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }

}