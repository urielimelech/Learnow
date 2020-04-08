var mongoose    =               require('mongoose'),
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
    });


/* Validations */
// user.path('email').validate( 
//     (val) => {
//         if (!val)
//             return false;
        
//         if(!validator.validate(val))
//             return false;
        
//         return true;
//     }, "Email was not defined correctly.");
    
// user.path('name').validate( 
//     (val) => {
//         if (!val)
//             return false;
        
//         return true;
//     }, "Name was not defined correctly.");

var User = mongoose.model('User', user);

module.exports = User;