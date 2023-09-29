using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using System.Net.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GoGoodServer.Models;
using GoGoodServer.Controllers.DataContainers;
using Microsoft.Data.SqlClient;
using MySql.Data.MySqlClient;
using System.Data;
using Microsoft.AspNetCore.Authorization;
using Amazon.Runtime;
using Amazon.S3.Model;
using Amazon;
using Amazon.S3;
using Amazon.S3.Transfer;
using GoGoodServer.Services.AwsSettings;
using Microsoft.Extensions.Options;
using MySqlX.XDevAPI;
using System.Net;
using System.Collections;

using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using FirebaseAdmin.Messaging;
using GoGoodServer.Services.SpService;
using Dapper;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace GoGoodServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersGoGoodController : ControllerBase
    {
        private readonly GoGoodDBContext _context;
        private readonly IConfiguration _configuration;
        private readonly IUserService _userService;
        public readonly ILogger_DB _logger_DB;
        public readonly IAwsService _awsService;
        private readonly int _expiryMinutes;
        private ISpService _ispService;

        public UsersGoGoodController(GoGoodDBContext context, IConfiguration configuration, IUserService userService, ILogger_DB logger_DB, IOptions<AwsS3Settings> s3Settings, IAwsService awsService, ISpService ispService)
        {
            _configuration = configuration;
            _userService = userService;
            _context = context;
            _logger_DB = logger_DB;
            _expiryMinutes = s3Settings.Value.PreSignedURLExpiryMinutes;
            _awsService = awsService;
            _ispService = ispService;
        }


        [HttpGet("GetUserPplByNumber/{num}")]
        public async Task<ActionResult<User>> GetUserPplByNumber(string num)
        {
            return await GetUserByNumberFromDb(num);
        }


        async Task<User> GetUserByNumberFromDb(string id)
        {
            User user = new User();
            using (MySqlConnection con = new MySqlConnection(_configuration.GetSection("ConnectionStrings:GoGoodDBContext").Value))
            {
                using (MySqlCommand cmd = new MySqlCommand("GetUserByNumber", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@number", id);
                    con.Open();
                    MySqlDataReader dr = cmd.ExecuteReader();
                    while (dr.Read())
                    {
                        user.userGoGood.Id = dr.GetInt32(0);
                        user.userGoGood.FullName = dr.GetString(1);
                        user.userGoGood.Phone = dr.GetString(2);
                        user.userGoGood.ImgUrl = dr.GetString(3);
                        user.userGoGood.Imei = dr.GetString(4);
                        user.userGoGood.UserType = dr.GetString(5);
                        if (!dr.IsDBNull(6)) user.userGoGood.UserDescription = dr.GetString(6);
                        if (!dr.IsDBNull(7)) user.userGoGood.FcmToken = dr.GetString(7);

                    }
                    if (user.userGoGood != null && user.userGoGood.Id != 0)
                    {
                        user.Token = _userService.CreateToken(user.userGoGood);
                        //not working as needed that is the backend log should comeback to it Shahar 11.5.23
                        //await _logger_DB.addLog(1, "[ServerSide] User Login Successfuly with phone:" + " " + user.userGoGood.Phone.ToString());
                    }
                }
            }
            return user;
        }







        //UsersGoGood/BooleanExistUserPplByNumber/{num}"
        [HttpGet("BooleanExistUserPplByNumber/{num}")]
        public async Task<ActionResult<Boolean>> BooleanExistUserPplByNumber(string num)
        {
            return BooleanExistUserPplByNumberFromDB(num);
        }

        Boolean BooleanExistUserPplByNumberFromDB(string id)
        {
            int user = 0;
            using (MySqlConnection con = new MySqlConnection(_configuration.GetSection("ConnectionStrings:GoGoodDBContext").Value))
            {
                using (MySqlCommand cmd = new MySqlCommand("GetUserByNumber", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@number", id);
                    con.Open();
                    MySqlDataReader dr = cmd.ExecuteReader();
                    while (dr.Read()) { user = dr.GetInt32(0); }
                    return user != null && user != 0;
                }
            }

        }



        [HttpGet("ifUserWasBeforeInApp/{imei}")]
        public async Task<bool> ifUserWasBeforeInApp(string imei)
        {
            return await ifUserWasBeforeInAppFromDb(imei);
        }

        async Task<bool> ifUserWasBeforeInAppFromDb(string imei)
        {
            User user = new User();
            String imeiFromDb = String.Empty;
            using (MySqlConnection con = new MySqlConnection(_configuration.GetSection("ConnectionStrings:GoGoodDBContext").Value))
            {

                using (MySqlCommand cmd = new MySqlCommand("ifUserWasBeforeInApp", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@imei", imei);
                    con.Open();
                    MySqlDataReader dr = cmd.ExecuteReader();
                    while (dr.Read())
                    {
                        imeiFromDb = dr.GetString(0);
                    }
                    dr.Close();

                }
            }
            Console.WriteLine(imeiFromDb);
            return !string.IsNullOrEmpty(imeiFromDb);
        }



        // GET: api/UsersGoGood
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserGoGood>>> GetUserGoGoods()
        {
            return await _context.UserGoGoods.ToListAsync();
        }

        // GET: api/UsersGoGood/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserGoGood>> GetUserGoGood(int id)
        {
            var userGoGood = await _context.UserGoGoods.FindAsync(id);

            if (userGoGood == null)
            {
                return NotFound();
            }

            return userGoGood;
        }

        // PUT: api/UsersGoGood/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserGoGood(int id, UserGoGood userGoGood)
        {
            /*   var tokensId = _userService.GetId();
               if(tokensId!=null && tokensId!= id){
                   return Unauthorized();
               }*/
            if (id != userGoGood.Id)
            {
                return BadRequest();
            }

            _context.Entry(userGoGood).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserGoGoodExists(id))
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

        // POST: api/UsersGoGood
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<User>> PostUserGoGood(UserGoGood userGoGood)
        {
            _context.UserGoGoods.Add(userGoGood);
            await _context.SaveChangesAsync();
            User user = new User();
            user.userGoGood = userGoGood;
            user.Token = _userService.CreateToken(user.userGoGood);
            //await _logger_DB.addLog(1,"[ServerSide] User Added Successfuly with phone:"+" "+user.userGoGood.Phone.ToString());
            return user;
        }

        // DELETE: api/UsersGoGood/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserGoGood(int id)
        {
            var userGoGood = await _context.UserGoGoods.FindAsync(id);

            if (userGoGood == null)
            {
                return NotFound();
            }


            // delete from all tables in DB
            var parameters = new DynamicParameters();
            parameters.Add("@userId", id);
            var result = await _ispService.ActivateSp<IntWrapper>("deleteUser", parameters);


            var deleteResponse = new DeletePicsResponse();
            deleteResponse.IdCardDeleteResult = await _awsService.DeleteFileFromS3(id.ToString(), "IdCard");
            deleteResponse.UserDeleteResult = await _awsService.DeleteFileFromS3(id.ToString(), "user");


            if (userGoGood.UserType == "GettingHelp" && result != null) // in case of GettingHelp we should delete all his posts 
            {
                foreach (var item in result)
                {
                    IActionResult resultFromDelete = await _awsService.DeleteFileFromS3(item.postId.ToString(), "posts");
                    deleteResponse.PostsDeleteResult.Add(resultFromDelete);
                }
            }

            return Ok(deleteResponse);
        }



        private bool UserGoGoodExists(int id)
        {
            return _context.UserGoGoods.Any(e => e.Id == id);
        }


        [HttpGet("GetUserProfilePic/{userId}"), DisableRequestSizeLimit]
        public async Task<IActionResult> getUserProfilePic(string userId)
        {
            try
            {
                var key = $"Users/userId:{userId}/profilePic"; // This assumes a specific file structure in your S3 bucket
                var s3Client = _awsService.GetS3Client();
                var request = new GetPreSignedUrlRequest
                {
                    BucketName = "gogood-bucket",
                    Key = key,
                    Expires = DateTime.Now.AddMinutes(_expiryMinutes) // URL expires after 60 minutes
                };

                string urlString = s3Client.GetPreSignedURL(request);
                var httpStatusCode = await CheckStatusCodeAsync(urlString);

                if ((int)httpStatusCode == 404)
                {
                    //const char stringReplay = 'The specified key does not exist';
                    return base.StatusCode(404);
                }

                return Ok(new { Url = urlString });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception: {ex.Message}");
                Console.WriteLine($"Stack trace: {ex.StackTrace}");
                return StatusCode(500, ex.Message);
            }
        }




        [HttpGet("getUserPolicy"), DisableRequestSizeLimit]
        public async Task<IActionResult> getUserPolicy()
        {
            try
            {
                var key = $"Files/policy.pdf"; // This assumes a specific file structure in your S3 bucket

                //var accessKey = Environment.GetEnvironmentVariable("AWS_ACCESS_KEY_ID");
                //var secretKey = Environment.GetEnvironmentVariable("AWS_SECRET_ACCESS_KEY");
                //var credentials = new BasicAWSCredentials(accessKey, secretKey);
                //var config = new AmazonS3Config { RegionEndpoint = RegionEndpoint.EUWest1 };
                ////var s3Client = new AmazonS3Client(credentials, config);
                //var s3Client = new AmazonS3Client(config);



                var s3Client = _awsService.GetS3Client();
                var request = new GetPreSignedUrlRequest
                {
                    BucketName = "gogood-bucket",
                    Key = key,
                    Expires = DateTime.Now.AddMinutes(999999) // URL expires after 694 days (04.09.25) 
                };
                //https://gogood-bucket.s3.eu-west-1.amazonaws.com/Files/policy.pdf?AWSAccessKeyId=AKIAVOENOZKTVCGWYTNL&Expires=1748979771&Signature=0hGQ2fbuh4UdePQf%2FQr9TRcM%2B7o%3D

                string urlString = s3Client.GetPreSignedURL(request);


                var httpStatusCode = await CheckStatusCodeAsync(urlString);

                if ((int)httpStatusCode == 404)
                {
                    //const char stringReplay = 'The specified key does not exist';
                    return base.StatusCode(404);
                }

                return Ok(new { Url = urlString });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception: {ex.Message}");
                Console.WriteLine($"Stack trace: {ex.StackTrace}");
                return StatusCode(500, ex.Message);
            }


        }


        public static async Task<HttpStatusCode> CheckStatusCodeAsync(string url)
        {
            using (HttpClient client = new HttpClient())
            {
                try
                {
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





















    }
}
