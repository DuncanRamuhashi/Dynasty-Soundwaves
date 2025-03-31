import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
 
    host: 'smtp-relay.brevo.com',
    port: 465,
    secure: true,
    auth: {
      user: '83bb6a001@smtp-brevo.com',
      pass: "6atsrW8g9bSRGO2h"
    },
    
  });
  
 export default transporter;