const nodemailer = require("nodemailer");
const hogan = require("hogan.js");
const fs = require("fs");
const { USER, PASS } = require("../config");

// Đọc lên là dạng string
const template = fs.readFileSync(
  `${__dirname}/sendBookTicketEmail.hjs`,
  "utf-8"
);
const compiledTemplate = hogan.compile(template);

module.exports.sendBookTicketEmail = (email) => {
  const transport = {
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    requireSSL: true,
    auth: {
      user: USER,
      pass: PASS,
    },
  };

  const transporter = nodemailer.createTransport(transport);
  const mailOption = {
    from: USER,
    to: email,
    subject: "Vexere",
    // Hogan -> html
    html: compiledTemplate.render({
      email: email,
    }),
  };

  transporter.sendMail(mailOption, (err) => {
    if (err) return console.log(err);
    console.log("Success");
  });
};
