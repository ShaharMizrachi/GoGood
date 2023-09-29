using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GoGoodServer.Models;
using MySql.Data.MySqlClient;
using Microsoft.Data.SqlClient;
using System.Data;
using GoGoodServer.Controllers.DataContainers;
using System.Net.Http.Headers;
using Microsoft.AspNetCore.Authorization;
using Amazon;
using Amazon.S3;
using Amazon.S3.Transfer;
using Amazon.Runtime;
using Amazon.S3.Model;
using GoGoodServer.Services.AwsSettings;
using Microsoft.Extensions.Options;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Net;
using GoGoodServer.Services.OtpTokenService;
using GoGoodServer.Services.FirebaseService;
using GoGoodServer.Services.SpService;
using Dapper;
using Newtonsoft.Json;




using Amazon.SecretsManager;
using Amazon.SecretsManager.Model;
using Microsoft.Extensions.Hosting;
using FirebaseAdmin.Messaging;

namespace GoGoodServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OTPController : ControllerBase
    {
        private readonly GoGoodDBContext _context;
        private IFirebaseService _ifireBaseService;
        private ISpService _ispService;

        public OTPController(GoGoodDBContext context, IFirebaseService ifireBaseService, ISpService ispService)
        {
            _context = context;
            _ifireBaseService = ifireBaseService;
            _ispService = ispService;
        }


        [HttpGet("shaharTest")]
        public async Task<IActionResult> testShahar()
        {
            try
            {
                var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");


                String token = "c5IwFCHJR_SI3pM8rkueZY:APA91bGUrd2DUUTK1rUO_8yerL4neAv_dnisR1SvSqnVEerhS8UUlBtIEtLTAWjpINUZWd4VR2iGwrhLMBP2iDJKWdoMndgee5yNBA2VOoZZozRolq_Bb7lg-UdRujz-_oLecI-dnVP0";
                //_ifireBaseService.SendNotificationSingle(token, "ShaharTitile", "testShahar Body");

                var message = new Message()
                {
                    Data = new Dictionary<string, string>() // that data i want to pass 
                    {
                    { "body", "Your body message" }
                },
                    Token = token,
                    Notification = new Notification() //the massage on the notification 
                    {
                        Title = "shahat",
                        Body = "testtttt",
                        

                    }
                };

                var messaging = FirebaseMessaging.DefaultInstance;


                string response = await messaging.SendAsync(message);
                Console.WriteLine(response);


                Console.WriteLine("Successfully sent message: " + response);



                ////--------------active Sp test!--------------------------
                //var parameters = new DynamicParameters();
                //parameters.Add("@idSent", 2);
                //var test = new PushNotificationMessages();
                //var result = await ActivateSp<YourReturnType>("YourStoredProcedureName", parameters);
                //var result = await _ispService.ActivateSp<PushNotificationMessages>("getPushMessageById", parameters);
                //Console.WriteLine(result);





                ////// -----------get secreat manager key value from aws-------------------------- 
                //string secretName = "zigitTest";
                //string region = "eu-west-1";

                //IAmazonSecretsManager client = new AmazonSecretsManagerClient(RegionEndpoint.GetBySystemName(region));

                //GetSecretValueRequest request = new GetSecretValueRequest
                //{
                //    SecretId = secretName,
                //    VersionStage = "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified.
                //};

                //GetSecretValueResponse response;
                //response = await client.GetSecretValueAsync(request);
                //string secretString = response.SecretString;

                //// in this case return and converting to string
                //dynamic secretObject = JsonConvert.DeserializeObject<dynamic>(secretString);
                //string shaharTestValue = secretObject.ShaharTest;
                //Console.WriteLine(shaharTestValue);





                return Ok();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from the database");
            }
        }



        [HttpGet]
        public async Task<ActionResult<IEnumerable<OTP>>> GetOTPs()
        {
            var otps = await _context.OTP.ToListAsync();

            if (!otps.Any())
            {
                return NotFound();
            }

            return otps;
        }


        // GET: api/OTP/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OTP>> GetOTP(int id)
        {
            var otp = await _context.OTP.FindAsync(id);

            if (otp == null)
            {
                return NotFound();
            }

            return otp;
        }



        // PUT: api/OTP/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOTP(int id, OTP otp)
        {
            if (id != otp.Id)
            {
                return BadRequest();
            }

            _context.Entry(otp).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OTPExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }


        private bool OTPExists(int id)
        {
            return _context.OTP.Any(e => e.Id == id);
        }




        // POST: api/OTP
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<OTP>> PostOTP(OTP otp)
        {
            _context.OTP.Add(otp);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOTP", new { id = otp.Id }, otp);
        }

        // DELETE: api/OTP/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOTP(int id)
        {
            var otp = await _context.OTP.FindAsync(id);
            if (otp == null)
            {
                return NotFound();
            }

            _context.OTP.Remove(otp);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        // Once user request otp code for phone authentication.
        [HttpGet("RequestOTPNumber/{number}")]

        public async Task<HttpStatusCode> RequestOTPNumber(string number)
        {
            using (HttpClient client = new HttpClient())
            {
                try
                {
                    var AwsService = new AwsService();
                    dynamic secretObjectTask = await AwsService.SecretManagerPulldata<dynamic>("OTP_Token");
                    string secretvalue = secretObjectTask.OTP_Token;
                    Console.WriteLine(secretvalue);
                    string url = $"https://www.micropay.co.il/extApi/sendOtp.php?get=1&token={secretvalue}&phone={number}&type=sms&maxsms=10";

                    HttpResponseMessage response = await client.GetAsync(url);
                    return response.StatusCode;
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"An error occurred: {ex.Message}");
                    return HttpStatusCode.InternalServerError;
                }

            }
        }



        [HttpGet("CheckOtpValidation")]

        public async Task<String> CheckOtpValidation([FromQuery] string number, [FromQuery] string code)
        {
            using (HttpClient client = new HttpClient())
            {
                try
                {
                    var AwsService = new AwsService();
                    dynamic secretObjectTask = await AwsService.SecretManagerPulldata<dynamic>("OTP_Token");
                    string secretvalue = secretObjectTask.OTP_Token;

                    string url = $"https://www.micropay.co.il/extApi/sendOtp.php?get=1&token={secretvalue}&phone={number}&type=sms&maxsms=10&code={code}";
                    HttpResponseMessage response = await client.GetAsync(url);
                    string responseBody = await response.Content.ReadAsStringAsync();
                    Console.WriteLine(response.StatusCode);

                    return responseBody;
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"An error occurred: {ex.Message}");
                    return HttpStatusCode.InternalServerError.ToString();
                }
            }
        }
    }
}
