const sgMail = require("@sendgrid/mail");
const Mailjet = require("node-mailjet");

const mailjet = Mailjet.apiConnect(
  process.env.MJ_APIKEY_PUBLIC,
  process.env.MJ_APIKEY_PRIVATE
);

const sendEmailMailjet = async (
  receiverEmail,
  fileID,
  senderName = "Encrypt Share"
) => {
  const mailjet = Mailjet.apiConnect(
    process.env.MJ_APIKEY_PUBLIC,
    process.env.MJ_APIKEY_PRIVATE
  );

  try {
    const request = await mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: "noreply@placify.fun", // ✅ Replace this with your Mailjet-approved sender (not Gmail)
            Name: senderName,
          },
          To: [
            {
              Email: receiverEmail,
              Name: "Recipient",
            },
          ],
          Subject: "You've Received a Secure File via Encrypt-Share",
          TextPart: `Hello,\n\nYou have received a secure file using Encrypt-Share.\n\nFile ID: ${fileID}\nDownload Page: https://encrypt-share.vercel.app/\n\nNote: For security reasons, the password is not shared via email. Please contact the sender directly.\n\nBest regards,\nEncrypt-Share Team`,
          HTMLPart: `
            <div style="font-family: Arial, sans-serif; color: #333;">
              <h2 style="color: #0056b3;">You've Received a Secure File</h2>
              <p>Hello,</p>
              <p>You have received a secure file from <strong>${senderName}</strong>.</p>
              <p><strong>File ID:</strong> <span style="font-size: 16px; color: #111;">${fileID}</span></p>
              <p>You can download the file from the following link:</p>
              <p>
                <a href="https://encrypt-share.vercel.app/download" target="_blank" style="color: #007bff;">
                  Visit Secure Download Page
                </a>
              </p>
              <p><em>Note:</em> For your privacy and protection, the password is not included in this email. Please contact the sender directly to retrieve it.</p>
              <br/>
              <p style="font-size: 13px; color: #888;">If you do not recognize this request, you can ignore this message.</p>
              <p style="font-size: 14px;">— The Encrypt-Share Team</p>
            </div>
          `,
        },
      ],
    });

    if (request?.body) {
      return { success: true, data: request.body };
    } else {
      return { success: false, error: "Email sending failed" };
    }
  } catch (err) {
    console.error("❌ Mailjet Error:", err.message);
    return { success: false, error: err.message };
  }
};

module.exports = sendEmailMailjet;