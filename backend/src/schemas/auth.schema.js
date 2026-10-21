import * as z from "zod"

const registerSchema = z.object({
    
    fname: z.string({
        required_error: "first name is required"
    }).min(3, {
        message: "fname must be at least 3 characters long"
    }),

    lname: z.string({
        required_error: "last name is required"
    }).min(3, {
        message: "fname must be at least 3 characters long"
    }),

    ci: z.string({
        required_error: "C.I. is required"
    }).min(7, {
        message: "C.I. must be at least 7 characters long"
    }),

    email: z.string({ 
        required_error: "email is required" 
    }).email({ 
        message: "invalid email" 
    }),

    phone: z.string().min(12, {
        message: "fname must be at least 12 characters long"
    }), 	

    password: z.string({
        required_error: "password is required"
    }).min(6, {
        message: "password must be at least 6 digits"
    })

})

const loginSchema = z.object({

    email: z.string({
        required_error: "email is required"
    }).email({
        message: "invalid email format"
    }),
    
    password: z.string({
        required_error: "password is required"
    }).min(6,{
        message: "the password must be at least 6 digits"
    })
})