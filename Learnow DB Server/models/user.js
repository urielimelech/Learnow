var mongoose    =               require('mongoose'),
    validator   = require('email-validator')
    user        =               new mongoose.Schema({
        name:
                {
                    type: String,
                    required: true
                },
        email:
                {
                    type: String,
                    required: true
                },
        password:
                {
                    type: String,
                    required: true
                }
    })

/* Validations */
user.path('email').validate( 
    (val) => {
        if (!val)
            return false
        
        if(!validator.validate(val))
            return false
        
        return true
    }, "Email was not defined correctly.")
    
user.path('password').validate( 
    (val) => {
        const minSize = 8
        const maxSize = 14
        if (val.length < minSize || val.length > maxSize)
            return false
        
        return true
    }, "Password was not defined correctly: password must have at least 8 characters.")

user.path('name').validate( 
    (val) => {
        const minSize = 2
        const regex = /^[a-zA-Z]+$/

        if (val.length < minSize || !val.match(regex))
            return false
        
        return true
    }, "Name was not defined correctly.")

var User = mongoose.model('User', user)

module.exports = User