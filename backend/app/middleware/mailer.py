from flask import current_app
from flask_mail import Mail, Message
from app.config.settings import MAIL, MAIL_RECIPIENT, MAIL_USERNAME, MAIL_PASSWORD
mail = Mail()


def init_mail(app=None):
    if app is not None:
        mail.init_app(app)
    else:
        with current_app.app_context():
            mail.init_app(current_app)


def configure_mail(app):
    print(MAIL.split(": ")[0])
    app.config['MAIL_SERVER'] = MAIL.split(":")[0]
    app.config['MAIL_PORT'] = MAIL.split(":")[1]
    app.config['MAIL_USE_TLS'] = False
    app.config['MAIL_USE_SSL'] = False
    app.config['MAIL_DEBUG'] = False
    app.config['MAIL_SUPPRESS_SEND'] = False
    app.config['MAIL_ASCII_ATTACHMENTS'] = False
    app.config['MAIL_MAX_EMAILS'] = None
    app.config['MAIL_USERNAME'] = MAIL_USERNAME
    app.config['MAIL_PASSWORD'] = MAIL_PASSWORD

    mail.init_app(app)


# Not to be used directly
def send_email(subject, recipients, html_body):
    mail.connect()
    try:
        message = Message(subject=subject,
                          recipients=[MAIL_RECIPIENT],
                          sender=MAIL_USERNAME)
        message.html = html_body
        mail.send(message)
        return True  # Email sent successfully
    except Exception as e:
        print(f"Email sending failed: {str(e)}")
        return False


def send_activation_email(to, activation_link):
    subject = "Activate Your Account"
    recipients = [to]
    email_template = """<!DOCTYPE html>
    <html lang='en'>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Email Verification</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
        <table style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-collapse: collapse; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <tr>
                <td style="padding: 20px;">
                    <h1 style="color: #333;">Verify Your Email Address</h1>
                    <p style="color: #666;">Hello <strong>{}</strong>,</p>
                    <p style="color: #666;">We just need to make sure this email address belongs to you. Click the button below to verify your email:</p>
                    <a href="{}" style="display: inline-block; background-color: #007bff; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 5px;">Verify Email</a>
                    <p style="color: #666; margin-top: 20px;">If you did not request this verification, please ignore this email.</p>
                </td>
            </tr>
        </table>
    </body>
    </html>
    """.format(to, activation_link)

    return send_email(subject, recipients, email_template)


def send_password_reset_email(to, reset_link):
    subject = "Password Reset"
    recipients = [to]

    email_template = """<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Password Reset</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
        <table style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-collapse: collapse; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <tr>
                <td style="padding: 20px;">
                    <h1 style="color: #333;">Password Reset Request</h1>
                    <p style="color: #666;">Hello <strong>{}</strong>,</p>
                    <p style="color: #666;">You've requested to reset your password. Click the button below to reset your password</p>
                    <a href="{}" style="display: inline-block; background-color: #007bff; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 5px;">Reset Password</a>
                    <p style="color: #666; margin-top: 20px;">If you did not request this reset, please ignore this email.</p>
                </td>
            </tr>
        </table>
    </body>
    </html>
    """.format(to, reset_link)


    return send_email(subject, recipients, email_template)
