import nodemailer from "nodemailer"
const transport=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"rohiirwt08@gmail.com",
        pass:"ftzojkwncwpdychb"
    }
})
export default transport