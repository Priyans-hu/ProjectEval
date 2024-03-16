require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
})

const sendEvaluationEmail = async (studentEmail, studentName, evaluation) => {
    try {
        let mailOptions = {
            from: process.env.EMAIL_USER,
            to: studentEmail,
            subject: 'Project Evaluation',
            html: `
                <p><strong>Dear ${studentName},</strong></p>
                <p>Your project has been evaluated:</p>
                <ul>
                    <li><strong>Ideation:</strong> ${evaluation.ideation}</li>
                    <li><strong>Execution:</strong> ${evaluation.execution}</li>
                    <li><strong>Viva Pitch:</strong> ${evaluation.vivaPitch}</li>
                </ul>
                <p>Check your dashboard for detailed feedback.</p>
                <hr>
                <p><strong>Best regards,</strong><br>Your Mentor</p>
            `
        };

        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error('Error sending email: ', error);
    }
};

module.exports = sendEvaluationEmail;
