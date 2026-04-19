const { Resend } = require('resend');

// Initialize Resend with API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

class EmailService {
  /**
   * Send OTP email
   * @param {string} to - Recipient email
   * @param {string} otp - 6-digit OTP code
   * @param {string} purpose - Purpose of OTP (email_verification, password_reset, etc.)
   * @returns {Promise<boolean>} - Success status
   */
  static async sendOTP(to, otp, purpose = 'email_verification') {
    try {
      const subject = this.getEmailSubject(purpose);
      const htmlContent = this.generateOTPEmailTemplate(otp, purpose);

      const { data, error } = await resend.emails.send({
        from: process.env.RESEND_SENDER_EMAIL || 'onboarding@resend.dev',
        to: [to],
        subject: subject,
        html: htmlContent
      });

      if (error) {
        console.error('Resend API error:', error);
        return false;
      }

      console.log(`OTP email sent successfully to ${to}`);
      console.log('Email ID:', data.id);
      return true;
    } catch (error) {
      console.error('Error sending OTP email:', error);
      return false;
    }
  }

  /**
   * Send general email
   * @param {string} to - Recipient email
   * @param {string} subject - Email subject
   * @param {string} htmlContent - HTML content of email
   * @returns {Promise<boolean>} - Success status
   */
  static async sendEmail(to, subject, htmlContent) {
    try {
      const { data, error } = await resend.emails.send({
        from: process.env.RESEND_SENDER_EMAIL || 'onboarding@resend.dev',
        to: [to],
        subject: subject,
        html: htmlContent
      });

      if (error) {
        console.error('Resend API error:', error);
        return false;
      }

      console.log(`Email sent successfully to ${to}`);
      console.log('Email ID:', data.id);
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }
  }

  /**
   * Generate email subject based on purpose
   * @param {string} purpose - Purpose of OTP
   * @returns {string} - Email subject
   */
  static getEmailSubject(purpose) {
    const subjects = {
      'email_verification': 'Verify Your Email - Healing Hour',
      'password_reset': 'Reset Your Password - Healing Hour',
      'login_verification': 'Login Verification - Healing Hour'
    };
    return subjects[purpose] || 'Your Verification Code - Healing Hour';
  }

  /**
   * Generate HTML email template for OTP
   * @param {string} otp - 6-digit OTP code
   * @param {string} purpose - Purpose of OTP
   * @returns {string} - HTML email content
   */
  static generateOTPEmailTemplate(otp, purpose) {
    const purposeMessages = {
      'email_verification': 'Please use the verification code below to verify your email address:',
      'password_reset': 'Please use the verification code below to reset your password:',
      'login_verification': 'Please use the verification code below to complete your login:'
    };

    const message = purposeMessages[purpose] || 'Please use the verification code below:';

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Verification Code</title>
          <style>
            body {
              font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f4f4f4;
            }
            .container {
              background-color: #ffffff;
              padding: 30px;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
            }
            .logo {
              font-size: 24px;
              font-weight: bold;
              color: #2c3e50;
            }
            .otp-code {
              background-color: #f8f9fa;
              border: 2px dashed #dee2e6;
              border-radius: 8px;
              padding: 20px;
              text-align: center;
              margin: 20px 0;
            }
            .otp-number {
              font-size: 32px;
              font-weight: bold;
              letter-spacing: 8px;
              color: #007bff;
              font-family: 'Courier New', monospace;
            }
            .message {
              text-align: center;
              margin-bottom: 20px;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              font-size: 12px;
              color: #6c757d;
            }
            .security-note {
              background-color: #fff3cd;
              border-left: 4px solid #ffc107;
              padding: 10px;
              margin: 20px 0;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">Healing Hour</div>
            </div>
            
            <div class="message">
              <h2>Verification Code</h2>
              <p>${message}</p>
            </div>
            
            <div class="otp-code">
              <div class="otp-number">${otp}</div>
            </div>
            
            <div class="security-note">
              <strong>Security Notice:</strong> This code will expire in 10 minutes. 
              Please do not share this code with anyone. If you didn't request this code, 
              please ignore this email.
            </div>
            
            <div class="footer">
              <p>© 2024 Healing Hour. All rights reserved.</p>
              <p>This is an automated message, please do not reply to this email.</p>
            </div>
          </div>
        </body>
      </html>
    `;
  }
}

module.exports = EmailService;
