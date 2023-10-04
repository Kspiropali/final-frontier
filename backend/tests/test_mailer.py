import unittest
from unittest.mock import Mock, patch
from flask import Flask
from app.middleware.mailer import init_mail, configure_mail, send_activation_email, send_password_reset_email, send_email


class TestMailFunctions(unittest.TestCase):
    def setUp(self):
        self.app = Flask(__name__)
        self.app.config['TESTING'] = True
        self.app.config['MAIL_SERVER'] = 'localhost'
        self.app.config['MAIL_PORT'] = 1025
        self.app.config['MAIL_USE_TLS'] = False
        self.app.config['MAIL_USE_SSL'] = False
        self.app.config['MAIL_DEBUG'] = False
        self.app.config['MAIL_SUPPRESS_SEND'] = True
        self.app.config['MAIL_ASCII_ATTACHMENTS'] = False
        self.app.config['MAIL_MAX_EMAILS'] = None
        self.app.config['MAIL_USERNAME'] = None
        self.app.config['MAIL_PASSWORD'] = None

        init_mail(self.app)

    def test_init_mail_with_app(self):
        app = Flask(__name__)
        init_mail(app)
        self.assertIsNotNone(app.extensions.get('mail'))

    def test_init_mail_without_app(self):
        with self.app.app_context():
            init_mail()
            self.assertIsNotNone(self.app.extensions.get('mail'))

    def test_configure_mail(self):
        configure_mail(self.app)
        self.assertEqual(self.app.config['MAIL_SERVER'], 'localhost')
        self.assertEqual(self.app.config['MAIL_PORT'], 1025)
        self.assertFalse(self.app.config['MAIL_USE_TLS'])
        self.assertFalse(self.app.config['MAIL_USE_SSL'])
        self.assertFalse(self.app.config['MAIL_DEBUG'])
        self.assertFalse(self.app.config['MAIL_SUPPRESS_SEND'])
        self.assertFalse(self.app.config['MAIL_ASCII_ATTACHMENTS'])
        self.assertIsNone(self.app.config['MAIL_MAX_EMAILS'])
        self.assertIsNone(self.app.config['MAIL_USERNAME'])
        self.assertIsNone(self.app.config['MAIL_PASSWORD'])

    @patch('app.middleware.mailer.send_email')
    def test_send_email_success(self, mock_send):
        with self.app.app_context():
            result = send_email('Subject', ['recipient@example.com'], '<p>HTML Body</p>')
            assert result

    @patch('app.middleware.mailer.send_email', side_effect=Exception('Sending failed'))
    def test_send_email_failure(self, mock_send):
        with self.app.app_context():
            result = send_email('Subject', ['recipient@example.com'], '<p>HTML Body</p>')
            self.assertTrue(result)

    @patch('app.middleware.mailer.send_email')
    def test_send_activation_email(self, mock_send_email):
        result = send_activation_email('user@example.com', 'activation_link')
        assert result.startswith('Activate')

    @patch('app.middleware.mailer.send_email')
    def test_send_password_reset_email(self, mock_send_email):
        result = send_password_reset_email('user@example.com', 'reset_link')
        assert result.startswith('Reset')
