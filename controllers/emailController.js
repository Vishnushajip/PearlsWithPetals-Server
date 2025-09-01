import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const sendOrderEmail = async (req, res) => {
  const { to, subject, orderDetails } = req.body;

  if (!to || !subject || !orderDetails) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  try {
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #4CAF50;">Thank you for your order!</h2>
        <p>Your order has been successfully placed. Here are the details:</p>

        ${orderDetails.map(item => `
          <div style="border: 1px solid #ddd; padding: 10px; margin-bottom: 15px;">
            <h4>${item.name}</h4>
            <p>Price: ₹${item.price}</p>
            <p>Quantity: ${item.quantity}</p>
            <img src="${item.imageUrl}" alt="${item.name}" style="width: 150px; height: auto; border-radius: 8px;" />
          </div>
        `).join('')}

        <p>We appreciate your purchase!</p>
        <p><strong>Pearls With Petals</strong></p>
        <p>🌐 <a href="https://pearlswithpetals.in">pearlswithpetals.in</a></p>
      </div>
    `;

    await transporter.sendMail({
      from: `"Pearls With Petals" <${process.env.SMTP_EMAIL}>`,
      to,
      subject,
      html: htmlContent,
    });

    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Email send error:", error);
    res
      .status(500)
      .json({ success: false, message: "Email failed to send", error });
  }
};
