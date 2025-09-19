import {google} from "googleapis";
import nodemailer from "nodemailer";

export default async function handler(req,res) {
    if(req.method !== "POST"){
        return res.status(405).json({success:false,message:"Metod not Allowed"})
    }

    const{name,email,subject,message} = req.body;
    if (!name || !email || !subject || !message) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  try {
    
    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.GMAIL_USER,
            pass:process.env.GMAIL_PASS,
        },
    });
    await transporter.sendMail({
        from:`"Portfolio Contact"<${email}`,
        to:process.env.GMAIL_USER,
        subject:`New Message:${subject}`,
        text:`From ${name} (${email})\n\n ${message}`,
    });

    const brandColor = "#3498db";
    await transporter.sendMail({
        from:`"Your Website" <${process.env.GMAIL_USER}>`,
        to:email,
        subject:"✅ We received your message",
        html:`
         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
          <div style="background-color: ${brandColor}; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0;">Thank You for Contacting Us</h1>
          </div>
          <div style="padding: 20px; color: #333;">
            <p>Hi <strong>${name}</strong>,</p>
            <p>We’ve received your message and our team will get back to you soon.</p>
            <div style="margin: 20px 0; padding: 15px; background-color: #f9f9f9; border-left: 4px solid ${brandColor};">
              <p style="margin: 0;"><strong>Your Message:</strong></p>
              <p style="margin: 0; color: #555;">${message}</p>
            </div>
            <p>Best regards,<br><strong>Your Company Team</strong></p>
          </div>
          <div style="background-color: #f3f4f6; padding: 10px; text-align: center; font-size: 12px; color: #666;">
            <p style="margin: 0;">&copy; ${new Date().getFullYear()} Your Company</p>
          </div>
        </div>
        `,
    });
    const auth = new google.auth.JWT(
      process.env.GOOGLE_CLIENT_EMAIL,
      null,
      process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      ["https://www.googleapis.com/auth/spreadsheets"]
    );

    const sheets = google.sheets({version:"v4",auth});
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SHEET_ID,
      range: "Messages!A:E",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[name, email, subject, message, new Date().toLocaleString()]],
      },
    });

    res.status(200).json({ success: true, message: "Message sent & saved ✅" });

  } catch (err) {

    console.error("Error",err);
        res.status(500).json({ success: false, message: "Something went wrong ❌" });
    
  }
}