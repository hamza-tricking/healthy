# Resend OTP Integration Setup Guide

## Minimal Setup Steps

### 1. Get Resend API Key
1. Sign up at [Resend](https://resend.com/)
2. Go to API Keys in dashboard
3. Create new API key
4. Copy the API key (starts with `re_`)

### 2. Verify Sender Domain (Optional for Development)
- For development: Use `onboarding@resend.dev` (already verified)
- For production: Add and verify your domain in Resend dashboard

### 3. Environment Variables
Add these to your `.env` file:
```env
RESEND_API_KEY=re_K1px6QYj_6EPTW6fYrVZehxPVn8oqbv1q
RESEND_SENDER_EMAIL=onboarding@resend.dev
RESEND_SENDER_NAME=Healing Hour
```

## API Endpoints

### Send OTP
```
POST /api/otp/send
Content-Type: application/json

{
  "email": "user@example.com",
  "purpose": "email_verification" // optional: password_reset, login_verification
}
```

### Verify OTP
```
POST /api/otp/verify
Content-Type: application/json

{
  "email": "user@example.com",
  "otp": "123456",
  "purpose": "email_verification"
}
```

### Resend OTP
```
POST /api/otp/resend
Content-Type: application/json

{
  "email": "user@example.com",
  "purpose": "email_verification"
}
```

## Usage Example in Existing Logic

```javascript
const OTPController = require('../controllers/otpController');

// In your existing auth route
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Your existing user creation logic...
    // const user = await User.create({ email, password });
    
    // Send OTP for email verification
    const otpResponse = await fetch(`${process.env.API_URL}/api/otp/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        email, 
        purpose: 'email_verification' 
      })
    });
    
    const otpData = await otpResponse.json();
    
    if (!otpData.success) {
      return res.status(500).json({
        success: false,
        message: 'User created but failed to send verification email'
      });
    }
    
    res.status(201).json({
      success: true,
      message: 'User registered. Please check your email for verification code.',
      userId: user._id
    });
    
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
```

## Direct Resend Usage Example

```javascript
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'onboarding@resend.dev',
  to: 'hamzatricks@gmail.com',
  subject: 'Hello World',
  html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
});
```

## Security Best Practices

### ✅ Implemented
- **Rate Limiting**: 60-second cooldown between OTP requests
- **Expiration**: OTPs expire in 10 minutes
- **Attempts Limit**: Max 5 verification attempts per OTP
- **One-time Use**: OTPs marked as used after successful verification
- **Auto Cleanup**: Expired OTPs automatically removed from database
- **Input Validation**: Email format validation and sanitization

### 🔒 Additional Recommendations
1. **Rate Limiting**: Add IP-based rate limiting for OTP endpoints
2. **Monitoring**: Log OTP generation and verification attempts
3. **Secure Storage**: Use environment variables for all sensitive data
4. **HTTPS**: Ensure all API calls use HTTPS in production
5. **Domain Verification**: Verify your custom domain in Resend for production

## Email Templates

The system includes responsive HTML email templates with:
- Professional branding
- Clear OTP display
- Security notices
- Expiration warnings
- Mobile-responsive design

## Database Schema

```javascript
{
  email: "user@example.com",
  otp: "123456",
  purpose: "email_verification",
  expiresAt: Date,
  attempts: 0,
  isUsed: false,
  createdAt: Date,
  updatedAt: Date
}
```

## Testing

```bash
# Test OTP sending
curl -X POST http://localhost:5000/api/otp/send \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","purpose":"email_verification"}'

# Test OTP verification
curl -X POST http://localhost:5000/api/otp/verify \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","otp":"123456","purpose":"email_verification"}'
```

## Resend vs SendGrid Advantages

### ✅ Resend Benefits
- **Simpler API**: Clean, modern API design
- **Better Developer Experience**: Excellent TypeScript support
- **Faster Setup**: No complex domain verification for development
- **More Generous Free Tier**: 3,000 emails/month free
- **Better Documentation**: Clear, concise documentation
- **Modern Stack**: Built for modern applications

### 📧 Email Delivery
- **Instant Delivery**: Emails sent immediately
- **Reliable**: High deliverability rates
- **Analytics**: Built-in email analytics
- **Webhooks**: Real-time delivery status

## Troubleshooting

### Common Issues
1. **API Key Invalid**: Ensure API key is correct and active
2. **Domain Not Verified**: Use `onboarding@resend.dev` for development
3. **Environment Variables**: Check `.env` file is properly configured
4. **Rate Limits**: Resend has generous limits, but monitor usage

### Error Responses
- `400`: Invalid input (missing email, invalid format)
- `429`: Rate limited (too many requests)
- `500`: Internal server error (Resend API issues, database errors)

### Production Setup
1. **Verify Domain**: Add your domain in Resend dashboard
2. **Update Sender Email**: Change from `onboarding@resend.dev` to your domain
3. **DNS Records**: Add TXT and CNAME records provided by Resend
4. **Monitor Usage**: Check Resend dashboard for delivery stats
