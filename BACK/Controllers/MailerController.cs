using GoGoodServer.Services.MailerService;
using Microsoft.AspNetCore.Mvc;

namespace GoGoodServer.Controllers
{

    public class MailRequest
    {
        public string Subject { get; set; }
        public string Body { get; set; }
        public string[] Recipients { get; set; }
    }
    [Route("api/[controller]")]
    [ApiController]
    public class MailerController : Controller
    {
        private readonly IMailerService _mailerService;

        public MailerController(IMailerService mailerService, SmtpConfig smtpConfig)
        {
            _mailerService = mailerService;
            var config = new SmtpConfig();
            config.Server = "smtp.gmail.com";
            config.Port = 587;
            config.SenderName = "Zigit";
            config.SenderEmail = "zigit.delivery@gmail.com";
            config.Username = "zigit.delivery@gmail.com";
            config.Password = "krpwstewodujavrs";
            mailerService.smtpConfig = config;
        }

        [HttpPost("SendMail")]
        public async Task<ActionResult<Task>> SendMail([FromBody] MailRequest request)
        {
            try
            {
                var (isSuccess, message) = await _mailerService.SendEmailAsync(request.Recipients, request.Subject, request.Body);
                if (isSuccess)
                {
                    return Ok(message);
                }
                else
                {
                    return BadRequest(message);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(ex.Message);
            }
        }
    }
}
