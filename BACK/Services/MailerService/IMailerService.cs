namespace GoGoodServer.Services.MailerService
{
    public interface IMailerService
    {
        SmtpConfig smtpConfig { get; set; }
        Task<(bool, string)> SendEmailAsync(string[] recipients, string subject, string body, string filePath = null);
    }
}
