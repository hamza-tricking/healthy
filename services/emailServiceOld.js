const { Resend } = require('resend');

// Initialize Resend with API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

class EmailService {
  /**
   * Send OTP email
   * @param {string} to - Recipient email
   * @param {string} otp - 6-digit OTP code
   * @param {string} purpose - Purpose of OTP (password_reset, etc.)
   * @returns {Promise<boolean>} - Success status
   */
  static async sendOTP(to, otp, purpose = 'password_reset') {
    try {
      // Simple email format as requested
      const subject = 'OTP Code';
      const textContent = `Your OTP code is ${otp}`;

      const { data, error } = await resend.emails.send({
        from: process.env.RESEND_SENDER_EMAIL || 'no-reply@dmtart.pro',
        to: [to],
        subject: subject,
        text: textContent
      });

      if (error) {
        console.error('Resend API error:', error);
        // Handle specific error types
        if (error.statusCode === 429) {
          console.error('Rate limit exceeded. Please try again later.');
        } else if (error.statusCode === 401) {
          console.error('Invalid API key. Check RESEND_API_KEY.');
        } else if (error.statusCode === 403) {
          console.error('Domain not verified or sender not authorized.');
        }
        return false;
      }

      console.log(`✅ OTP email sent successfully to ${to}`);
      console.log(`📧 Email ID: ${data.id}`);
      return true;
    } catch (error) {
      console.error('❌ Error sending OTP email:', error);
      return false;
    }
}

module.exports = EmailService;
