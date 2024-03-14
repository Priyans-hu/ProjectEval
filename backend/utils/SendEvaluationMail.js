require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
})

// host: "smtp.gmail.com",
// port: 465,
// secure: true,

const sendEvaluationEmail = async (studentEmail, evaluation) => {
    try {
        let mailOptions = {
            from: process.env.EMAIL_USER,
            to: studentEmail,
            subject: 'Project Evaluation',
            text: `Your project has been evaluated. 
                    Ideation: ${evaluation.ideation}, 
                    Execution: ${evaluation.execution}, 
                    Viva Pitch: ${evaluation.vivaPitch}. 
Check your dashboard for detailed feedback.`
        };

        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error('Error sending email: ', error);
    }
};

module.exports = sendEvaluationEmail;
