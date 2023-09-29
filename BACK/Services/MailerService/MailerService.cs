using System;
using System.Net.Mail;
using System.Threading.Tasks;
using MailKit.Net.Smtp;
using MimeKit;
namespace GoGoodServer.Services.MailerService
{
    public class MailerService : IMailerService
    {
        public SmtpConfig _smtpConfig;

        public SmtpConfig smtpConfig
        {
            get => _smtpConfig;
            set => _smtpConfig = value;
        }

        public async Task<(bool, string)> SendEmailAsync(string[] recipients, string subject, string body, string filePath = null)
        {
            try
            {
                //Initializes MimeMessage
                var message = new MimeMessage();

                //Add sender name and address to the email message using  _smtpConfig.
                message.From.Add(new MailboxAddress(_smtpConfig.SenderName, _smtpConfig.SenderEmail));

                //Run through recipients and includes them in the message list of recipients.
                foreach (var recipient in recipients)
                {
                    message.To.Add(new MailboxAddress("", recipient));
                }

                //Add subject string to message.
                message.Subject = subject;

                //Initializes instance of Body Builder.
                var builder = new BodyBuilder();

                // Add Body text.  
                builder.TextBody = body;

                // File will be attached to email if it exists.
                if (filePath != null)
                {
                    builder.Attachments.Add(filePath);
                }

                // Assign BodyBuilder body into message body.
                message.Body = builder.ToMessageBody();

                //Initializes SmtpClient,the client that send the email.
                using (var client = new MailKit.Net.Smtp.SmtpClient())
                {

                    // Connect to the SMTP server using address and port
                    await client.ConnectAsync(_smtpConfig.Server, _smtpConfig.Port);

                    // Authenticate SMTP server using credentials
                    await client.AuthenticateAsync(_smtpConfig.Username, _smtpConfig.Password);

                    // Send the email message
                    await client.SendAsync(message);

                    // Disconnect from the SMTP server
                    await client.DisconnectAsync(true);
                }
                return (true, "Mail sent successfully");
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return (false, ex.Message);
            }
        }
    }
}
