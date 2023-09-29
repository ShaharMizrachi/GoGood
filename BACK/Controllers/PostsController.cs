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
using System.Linq.Expressions;
using GoGoodServer.Services.FirebaseService;
using GoGoodServer.Migrations;
using Dapper;
using GoGoodServer.Services.SpService;
using GoGoodServer.Services.ControlerService;
using Azure;
using Newtonsoft.Json;

namespace GoGoodServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        private readonly GoGoodDBContext _context;
        private readonly IConfiguration _configuration;
        private readonly ILogger<Post> _logger;
        private readonly IWebHostEnvironment _env;
        private readonly int _expiryMinutes;
        private readonly IUserService _iUserService;
        private IFirebaseService _ifireBaseService;
        public readonly IAwsService _awsService;
        private ISpService _ispService;
        private IControlerService _icontrolerService;

        public PostsController(GoGoodDBContext context,
            IConfiguration configuration,
            ILogger<Post> logger,
            IWebHostEnvironment env,
            IUserService iUserService,
            IOptions<AwsS3Settings> s3Settings,
            IFirebaseService ifireBaseService,
            IAwsService awsService,
            ISpService ispService,
            IControlerService icontrolerService
            )
        {
            _context = context;
            _configuration = configuration;
            _logger = logger;
            _env = env;
            _iUserService = iUserService;
            _expiryMinutes = s3Settings.Value.PreSignedURLExpiryMinutes;
            _ifireBaseService = ifireBaseService;
            _awsService = awsService;
            _ispService = ispService;
            _icontrolerService = icontrolerService;
        }

        //[HttpGet("AvailablePost_ToGivingHelp/{id}"),Authorize]
        [HttpGet("AvailablePost_ToGivingHelp/{id}")]
        //all posts does not beloge to someone in his category
        public async Task<ActionResult<IEnumerable<Post>>> GetPostsAvailable(int id)
        {
            /* var tokensId = _iUserService.GetId();
             if(tokensId!=null && tokensId != id)
             {
               return Unauthorized();
             } */

            if (_context.Posts == null)
            {
                return NotFound();
            }
            return GetPostsAvailableFromDb(id);
        }

        List<Post> GetPostsAvailableFromDb(int id)
        {
            List<Post> postsAvailableToPro = new List<Post>();
            using (MySqlConnection con = new MySqlConnection(_configuration.GetSection("ConnectionStrings:GoGoodDBContext").Value))
            {
                using (MySqlCommand cmd = new MySqlCommand("AllPostFromCategoryPending", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@idGivingHelp", id);
                    con.Open();
                    MySqlDataReader dr = cmd.ExecuteReader();
                    while (dr.Read())
                    {
                        postsAvailableToPro.Add(new Post
                        {
                            Id = dr.GetInt32(0),
                            CategoryId = dr.GetInt32(1),
                            GettingHelpId = dr.GetInt32(2),
                            ProblemTitle = dr.GetString(3),
                            ProblemDescription = dr.GetString(4),
                            ProblemPic = dr.GetString(5),
                            StatusTypeId = dr.GetInt32(6),
                            DateUpdete = dr.GetDateTime(7),
                            Latitude = dr.GetDouble(8),
                            Longitude = dr.GetDouble(9)
                        });
                    }
                }
            }
            return postsAvailableToPro;
        }



        // GET: api/Posts
        [HttpGet("GetPosts_OwnerBy_GivingHelp/{id}")]
        public async Task<ActionResult<IEnumerable<Post>>> GetPostsOwnerByGivingHelp(int id)
        {
            /*var tokensId = _iUserService.GetId();
            if (tokensId != null && tokensId != id)
            {
                return Unauthorized();
            }*/

            if (_context.Posts == null)
            {
                return NotFound();
            }
            return GetPostsOwnerByGivingHelpFromDb(id);
        }

        List<Post> GetPostsOwnerByGivingHelpFromDb(int id)
        {
            List<Post> postsAvailableToPro = new List<Post>();
            using (MySqlConnection con = new MySqlConnection(_configuration.GetSection("ConnectionStrings:GoGoodDBContext").Value))
            {
                using (MySqlCommand cmd = new MySqlCommand("Getting_GivingHelpOwnerPost", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@idGivingHelp", id);
                    con.Open();
                    MySqlDataReader dr = cmd.ExecuteReader();
                    while (dr.Read())
                    {
                        postsAvailableToPro.Add(new Post
                        {
                            Id = dr.GetInt32(0),
                            CategoryId = dr.GetInt32(1),
                            GettingHelpId = dr.GetInt32(2),
                            ProblemTitle = dr.GetString(3),
                            ProblemDescription = dr.GetString(4),
                            ProblemPic = dr.GetString(5),
                            StatusTypeId = dr.GetInt32(6),
                            DateUpdete = dr.GetDateTime(7),
                            Latitude = dr.GetDouble(8),
                            Longitude = dr.GetDouble(9)
                        });
                    }
                }
            }
            return postsAvailableToPro;
        }


        // GET: api/Posts
        [HttpGet("getPostsExcludingUser/{id}")]
        public async Task<ActionResult<IEnumerable<Post>>> getPostsExcludingUser(int id)
        {
            /* var tokensId = _iUserService.GetId();
             if(tokensId!=null && tokensId != id)
             {
               return Unauthorized();
             } */

            if (_context.Posts == null)
            {
                return NotFound();
            }
            return get_Posts_ExcludingUser_function(id);
        }


        List<Post> get_Posts_ExcludingUser_function(int id)
        {
            List<Post> allPostExcludUser = new List<Post>();
            using (MySqlConnection con = new MySqlConnection(_configuration.GetSection("ConnectionStrings:GoGoodDBContext").Value))
            {
                using (MySqlCommand cmd = new MySqlCommand("getPostsExcludingUser", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@idGettingHelp", id);
                    con.Open();
                    MySqlDataReader dr = cmd.ExecuteReader();
                    while (dr.Read())
                    {
                        allPostExcludUser.Add(new Post
                        {
                            Id = dr.GetInt32(0),
                            CategoryId = dr.GetInt32(1),
                            GettingHelpId = dr.GetInt32(2),
                            ProblemTitle = dr.GetString(3),
                            ProblemDescription = dr.GetString(4),
                            ProblemPic = dr.GetString(5),
                            StatusTypeId = dr.GetInt32(6),
                            DateUpdete = dr.GetDateTime(7),
                            Latitude = dr.GetDouble(8),
                            Longitude = dr.GetDouble(9)
                        });
                    }
                }
            }
            return allPostExcludUser;
        }




        //Description: get all posts of user from status type 1 to 4
        // GET: api/Posts
        [HttpGet("GetAllUserPostsByStatus/{id}")]
        public async Task<ActionResult<IEnumerable<Post>>> GetAllUserPostsByStatus(int id)
        {
            /* var tokensId = _iUserService.GetId();
             if(tokensId!=null && tokensId != id)
             {
               return Unauthorized();
             } */

            if (_context.Posts == null)
            {
                return NotFound();
            }
            return Get_AllUser_PostsByStatus(id);
        }

        //Description: get all posts of user from status type 1 to 4 
        List<Post> Get_AllUser_PostsByStatus(int id)
        {
            List<Post> allPostOfUser = new List<Post>();
            using (MySqlConnection con = new MySqlConnection(_configuration.GetSection("ConnectionStrings:GoGoodDBContext").Value))
            {
                using (MySqlCommand cmd = new MySqlCommand("GetAllUserPostsByStatus", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@idGettingHelp", id);
                    con.Open();
                    MySqlDataReader dr = cmd.ExecuteReader();
                    while (dr.Read())
                    {
                        allPostOfUser.Add(new Post
                        {
                            Id = dr.GetInt32(0),
                            CategoryId = dr.GetInt32(1),
                            GettingHelpId = dr.GetInt32(2),
                            ProblemTitle = dr.GetString(3),
                            ProblemDescription = dr.GetString(4),
                            ProblemPic = dr.GetString(5),
                            StatusTypeId = dr.GetInt32(6),
                            DateUpdete = dr.GetDateTime(7),
                            Latitude = dr.GetDouble(8),
                            Longitude = dr.GetDouble(9)
                        });
                    }
                }
            }
            return allPostOfUser;
        }





        // GET: api/Posts
        [HttpGet("gettingHelp_statusActiveClose/{id}")]
        public async Task<ActionResult<IEnumerable<ApplicationsByGettingHelp>>> GettingHelp_statusActiveClose(int id)
        {
            /* var tokensId = _iUserService.GetId();
             if(tokensId!=null && tokensId != id)
             {
               return Unauthorized();
             } */

            if (_context.Posts == null)
            {
                return NotFound();
            }
            return gettingHelp_statusActiveCloseFromDb(id);
        }




        List<ApplicationsByGettingHelp> gettingHelp_statusActiveCloseFromDb(int id)
        {
            List<ApplicationsByGettingHelp> postsAvailableToPro = new List<ApplicationsByGettingHelp>();
            using (MySqlConnection con = new MySqlConnection(_configuration.GetSection("ConnectionStrings:GoGoodDBContext").Value))
            {
                using (MySqlCommand cmd = new MySqlCommand("ApplicationsApprovedByGettingHelp", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@idGettingHelp", id);
                    con.Open();
                    MySqlDataReader dr = cmd.ExecuteReader();
                    while (dr.Read())
                    {
                        postsAvailableToPro.Add(new ApplicationsByGettingHelp
                        {
                            GivingHelpId = dr.GetInt32(0),
                            IdGivingHelpOwnerPost = dr.GetInt32(1),
                            PostId = dr.GetInt32(2),
                            CategoryId = dr.GetInt32(3),
                            GettingHelpId = dr.GetInt32(4),
                            problemTitle = dr.GetString(5),
                            ProblemDescription = dr.GetString(6),
                            ProblemPic = dr.GetString(7),
                            StatusTypeId = dr.GetInt32(8),
                            dateUpdete = dr.GetDateTime(9),
                            Latitude = dr.GetDouble(10),
                            Longitude = dr.GetDouble(11)
                        });
                    }
                }
            }
            return postsAvailableToPro;
        }



        // GET: api/Posts
        [HttpGet("gettingHelp_statusPending/{id}")]
        public async Task<ActionResult<IEnumerable<ApplicationsByGettingHelp>>> gettingHelp_statusPending(int id)
        {
            /*   var tokensId = _iUserService.GetId();
               if(tokensId!=null && tokensId != id)
               {
                 return Unauthorized();
               } */
            if (_context.Posts == null)
            {
                return NotFound();
            }
            return gettingHelp_statusPandingFromDb(id);
        }

        List<ApplicationsByGettingHelp> gettingHelp_statusPandingFromDb(int id)
        {
            List<ApplicationsByGettingHelp> postsAvailableToPro = new List<ApplicationsByGettingHelp>();
            using (MySqlConnection con = new MySqlConnection(_configuration.GetSection("ConnectionStrings:GoGoodDBContext").Value))
            {
                using (MySqlCommand cmd = new MySqlCommand("ApplicationsPannding", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@idGettingHelp", id);
                    con.Open();
                    MySqlDataReader dr = cmd.ExecuteReader();
                    while (dr.Read())
                    {
                        postsAvailableToPro.Add(new ApplicationsByGettingHelp
                        {
                            GivingHelpId = dr.GetInt32(0),
                            PostId = dr.GetInt32(1),
                            CategoryId = dr.GetInt32(2),
                            GettingHelpId = dr.GetInt32(3),
                            problemTitle = dr.GetString(4),
                            ProblemDescription = dr.GetString(5),
                            ProblemPic = dr.GetString(6),
                            StatusTypeId = dr.GetInt32(7),
                            dateUpdete = dr.GetDateTime(8),
                            Latitude = dr.GetDouble(9),
                            Longitude = dr.GetDouble(10)
                        });
                    }
                }
            }
            return postsAvailableToPro;
        }

        [HttpPost("uploadPic"), DisableRequestSizeLimit]
        public async Task<IActionResult> Upload()
        {
            try
            {
                // Data get from user
                var formCollection = await Request.ReadFormAsync();

                //the path to at S3 storage
                string awsPath;

                var s3Client = _awsService.GetS3Client();
                var transferUtility = new TransferUtility(s3Client);
                List<string> fileNames = new List<string>();

                
                if (formCollection["picType"].ToString().Equals("posts"))
                {
                    string postIdToDelete = formCollection["postId"].ToString();
                    //delete all pics from folder
                    await _awsService.DeleteFileFromS3(postIdToDelete, formCollection["picType"]);
                }

                foreach (var file in formCollection.Files)
                {
                    if (file.Length < 0) continue;

                    var fileName = file.FileName.Trim('"');
                    string picType = formCollection["picType"];

                    switch (picType)
                    {
                        case "user":
                            awsPath = $"Users/userId:{formCollection["userId"]}/profilePic";
                            break;

                        case "IdCard":
                            awsPath = $"IdCards/userId:{formCollection["userId"]}/IdCard";
                            break;

                        default:
                            awsPath = $"Posts/postId:{formCollection["postId"]}/img{file.FileName}";
                            break;
                    }

                    using (var fileStream = new MemoryStream())
                    {
                        await file.CopyToAsync(fileStream);

                        var uploadRequest = new TransferUtilityUploadRequest
                        {
                            InputStream = fileStream,
                            Key = awsPath,
                            BucketName = "gogood-bucket", //S3 bucket name
                        };

                        await transferUtility.UploadAsync(uploadRequest);
                    }

                    fileNames.Add(fileName);
                }

                return Ok(fileNames);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception: {ex.Message}");
                Console.WriteLine($"Stack trace: {ex.StackTrace}");
                Console.WriteLine(ex.Message);
                return StatusCode(500, new { error = ex.Message });
            }
        }





        [HttpGet("GetPostPic/{postId}"), DisableRequestSizeLimit]
        public async Task<IActionResult> GetPostPic(string postId)
        {
            try
            {
                var folderPath = $"Posts/postId:{postId}/"; // This assumes a specific file structure in your S3 bucket
                //var accessKey = Environment.GetEnvironmentVariable("AWS_ACCESS_KEY_ID");
                //var secretKey = Environment.GetEnvironmentVariable("AWS_SECRET_ACCESS_KEY");
                //var credentials = new BasicAWSCredentials(accessKey, secretKey);
                //var config = new AmazonS3Config { RegionEndpoint = RegionEndpoint.EUWest1 };
                //var s3Client = new AmazonS3Client(credentials, config);
                //var s3Client = new AmazonS3Client(config);


                var s3Client = _awsService.GetS3Client();



                var listRequestFromFolder = new ListObjectsV2Request
                {
                    BucketName = "gogood-bucket",
                    Prefix = folderPath
                };

                var listResponse = await s3Client.ListObjectsV2Async(listRequestFromFolder);
                var urls = new List<string>();

                foreach (var item in listResponse.S3Objects)
                {
                    if (item.Key.Length == folderPath.Length) continue; // in case file withoutname
                    var request = new GetPreSignedUrlRequest
                    {
                        BucketName = "gogood-bucket",
                        Key = item.Key,
                        Expires = DateTime.Now.AddMinutes(_expiryMinutes) // URL expires time define in appSettings
                    };

                    string urlString = s3Client.GetPreSignedURL(request);
                    urls.Add(urlString);

                }
                return Ok(urls);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception: {ex.Message}");
                Console.WriteLine($"Stack trace: {ex.StackTrace}");
                return StatusCode(500, ex.Message);
            }
        }


        // GET: api/Posts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Post>>> GetPosts()
        {
            return await _context.Posts.ToListAsync();
        }

        // GET: api/Posts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Post>> GetPost(int id)
        {
            var post = await _context.Posts.FindAsync(id);

            if (post == null)
            {
                return NotFound();
            }

            return post;
        }

        // PUT: api/Posts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{userIdSent}")]
        public async Task<IActionResult> PutPost(int userIdSent,[FromBody] Post post, bool changeStatus=false)
        {
            
            try
            {
                string additionalValueHeader = Request.Headers["X-Additional-Value"].FirstOrDefault();

                if (additionalValueHeader != null)
                {
                    dynamic header = JsonConvert.DeserializeObject<dynamic>(additionalValueHeader);
                    changeStatus = header["changeStatus"];
                }
                if (post.StatusTypeId == 3 && changeStatus)
                {
                    post.UpdatedTimestamp = DateTime.Now;   
                    Console.WriteLine("post.StatusTypeId==3", DateTime.Now);
                }
                if (post.StatusTypeId == 4 && changeStatus)
                {
                    post.UpdatedTimestamp = null;
                    Console.WriteLine("post.StatusTypeId==5", null);
                }

                _context.Entry(post).State = EntityState.Modified;

                if(changeStatus)
                {
                    await _icontrolerService.UserChangeStatusExtraActions(userIdSent, post);
                }
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PostExists(post.Id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.ToString());
            }
            return NoContent();
        }

        // POST: api/Posts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        /* [HttpPost, Authorize]*/
        public async Task<ActionResult<Post>> PostPost(Post post)
        {
            /* var tokensId = _iUserService.GetId();
             if(tokensId!=null && tokensId != post.GettingHelpId)
             {
                 return Unauthorized();
             } */
            _context.Posts.Add(post);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPost", new { id = post.Id }, post);
        }

        // DELETE: api/Posts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePost(int id)
        {
            var post = await _context.Posts.FindAsync(id);
            var tokensId = _iUserService.GetId();
            if (tokensId != null && tokensId != post.GettingHelpId)
            {
                return Unauthorized();
            }
            if (post == null)
            {
                return NotFound();
            }

            _context.Posts.Remove(post);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        //getting the amount of requset from gettingHelp group by category find by  GettingHelpId
        // GET: api/gettingHelpIdAmountOfRequset/5
        [HttpGet("gettingHelpIdAmountOfRequset/{id}")]
        public async Task<ActionResult<List<RequsetAmountByCategory>>> GettingHelpIdAmountOfRequset(int id)
        {
            return await GettingHelpIdAmountOfRequsetFromDb(id);
        }
        async Task<List<RequsetAmountByCategory>> GettingHelpIdAmountOfRequsetFromDb(int id)
        {
            List<RequsetAmountByCategory> requsetAmountByCategory = new List<RequsetAmountByCategory>();
            await using (MySqlConnection con = new MySqlConnection(_configuration.GetSection("ConnectionStrings:GoGoodDBContext").Value))
            {
                using (MySqlCommand cmd = new MySqlCommand("GettingHelpIdAmountOfRequset", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@idGettingHelpId", id);
                    con.Open();
                    MySqlDataReader dr = cmd.ExecuteReader();
                    while (dr.Read())
                    {
                        requsetAmountByCategory.Add(new RequsetAmountByCategory
                        {
                            Amount = dr.GetInt32(0),
                            Category = dr.GetInt32(1)
                        });
                    }
                }
            }
            return requsetAmountByCategory;
        }

        //getting the amount of work answer by GivingHelp at status 2 and above group by categoryId and filtered by GivingHelpId 
        // GET: api/gettingHelpIdAmountOfRequset/5
        [HttpGet("amountOfrequestBelongToPro/{id}")]
        public async Task<ActionResult<List<RequsetAmountByCategory>>> AmountOfrequestBelongToPro(int id)
        {
            return await AmountOfrequestBelongToProFromDb(id);
        }
        async Task<List<RequsetAmountByCategory>> AmountOfrequestBelongToProFromDb(int id)
        {
            List<RequsetAmountByCategory> requsetAmountByCategory = new List<RequsetAmountByCategory>();
            await using (MySqlConnection con = new MySqlConnection(_configuration.GetSection("ConnectionStrings:GoGoodDBContext").Value))
            {
                using (MySqlCommand cmd = new MySqlCommand("AmountOfrequestBelongToPro", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@idGivingHelpId", id);
                    con.Open();
                    MySqlDataReader dr = cmd.ExecuteReader();
                    while (dr.Read())
                    {
                        requsetAmountByCategory.Add(new RequsetAmountByCategory
                        {
                            Amount = dr.GetInt32(0),
                            Category = dr.GetInt32(1)
                        });
                    }
                }
            }
            return requsetAmountByCategory;
        }


        // GET: api/gettingHelpIdAmountOfrequestNumber/5
        [HttpGet("gettingHelpIdAmountOfrequestNumber/{id}")]
        public async Task<ActionResult<List<int>>> GettingHelpIdAmountOfrequestNumber(int id)
        {
            return await GettingHelpIdAmountOfrequestNumberFromDb(id);
        }
        async Task<List<int>> GettingHelpIdAmountOfrequestNumberFromDb(int id)
        {
            List<int> requsetAmounts = new List<int>();
            await using (MySqlConnection con = new MySqlConnection(_configuration.GetSection("ConnectionStrings:GoGoodDBContext").Value))
            {
                using (MySqlCommand cmd = new MySqlCommand("GettingHelpIdAmountOfrequestNumber", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@idGettingHelpId", id);
                    con.Open();
                    MySqlDataReader dr = cmd.ExecuteReader();
                    while (dr.Read())
                    {
                        requsetAmounts.Add(dr.GetInt32(0));
                    }
                }
            }
            return requsetAmounts;
        }

        //getting the amount of request belong to   gevingHelp vs the general amount  
        // GET: api/gettingHelpIdAmountOfrequestNumber/5
        [HttpGet("givingHelpIdAmountOfrequestNumber/{id}")]
        public async Task<ActionResult<List<int>>> GivingHelpIdAmountOfrequestNumber(int id)
        {
            return await GivingHelpIdAmountOfrequestNumberFromDb(id);
        }
        async Task<List<int>> GivingHelpIdAmountOfrequestNumberFromDb(int id)
        {
            List<int> requsetAmounts = new List<int>();
            await using (MySqlConnection con = new MySqlConnection(_configuration.GetSection("ConnectionStrings:GoGoodDBContext").Value))
            {
                using (MySqlCommand cmd = new MySqlCommand("GivingHelpIdAmountOfrequestNumber", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@IdGivingHelp", id);
                    con.Open();
                    MySqlDataReader dr = cmd.ExecuteReader();
                    while (dr.Read())
                    {
                        requsetAmounts.Add(dr.GetInt32(0));
                    }
                }
            }
            return requsetAmounts;
        }
        private bool PostExists(int id)
        {
            return _context.Posts.Any(e => e.Id == id);
        }

        ////////////////////////////////////////////// working space 


        //# get all posts in status 4  by getHelp user id, bring the id of who gave the help 
        // GET: api/Posts
        [HttpGet("GetAllPostsOfGetHelpClosed/{id}")]
        public async Task<ActionResult<IEnumerable<ApplicationsByGettingHelp>>> GetAllPostsOfGetHelpClosed(int id)
        {
            /*   var tokensId = _iUserService.GetId();
               if(tokensId!=null && tokensId != id)
               {
                 return Unauthorized();
               } */
            if (_context.Posts == null)
            {
                return NotFound();
            }
            return GetAllPostsOfGetHelpClosedFromDb(id);
        }

        List<ApplicationsByGettingHelp> GetAllPostsOfGetHelpClosedFromDb(int id)
        {
            List<ApplicationsByGettingHelp> postList = new List<ApplicationsByGettingHelp>();
            using (MySqlConnection con = new MySqlConnection(_configuration.GetSection("ConnectionStrings:GoGoodDBContext").Value))
            {
                using (MySqlCommand cmd = new MySqlCommand("GetAllPostsOfGetHelpClosed ", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@IdGettingHelp", id);
                    con.Open();
                    MySqlDataReader dr = cmd.ExecuteReader();
                    while (dr.Read())
                    {
                        postList.Add(new ApplicationsByGettingHelp
                        {
                            PostId = dr.GetInt32(0),
                            CategoryId = dr.GetInt32(1),
                            GettingHelpId = dr.GetInt32(2),
                            problemTitle = dr.GetString(3),
                            ProblemDescription = dr.GetString(4),
                            ProblemPic = dr.GetString(5),
                            StatusTypeId = dr.GetInt32(6),
                            dateUpdete = dr.GetDateTime(7),
                            Latitude = dr.GetDouble(8),
                            Longitude = dr.GetDouble(9),
                            GivingHelpId = dr.GetInt32(10),
                        });
                    }
                }
            }
            return postList;
        }


        ////////////////////////////////////////////////////////////////////////
        ///





        //# get all post in status 4  by gaveHelp user id, bring the id's who get the help 
        // GET: api/Posts
        [HttpGet("GetAllPostsOfGivingHelpClosed/{id}")]
        public async Task<ActionResult<IEnumerable<ApplicationsByGettingHelp>>> GetAllPostsOfGivingHelpClosed(int id)
        {
            /*   var tokensId = _iUserService.GetId();
               if(tokensId!=null && tokensId != id)
               {
                 return Unauthorized();
               } */
            if (_context.Posts == null)
            {
                return NotFound();
            }
            return GetAllPostsOfGivingHelpClosedFromDb(id);
        }

        List<ApplicationsByGettingHelp> GetAllPostsOfGivingHelpClosedFromDb(int id)
        {
            List<ApplicationsByGettingHelp> postList = new List<ApplicationsByGettingHelp>();
            using (MySqlConnection con = new MySqlConnection(_configuration.GetSection("ConnectionStrings:GoGoodDBContext").Value))
            {
                using (MySqlCommand cmd = new MySqlCommand("GetAllPostsOfGivingHelpClosed ", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@idGivingHelp", id);
                    con.Open();
                    MySqlDataReader dr = cmd.ExecuteReader();
                    while (dr.Read())
                    {
                        postList.Add(new ApplicationsByGettingHelp
                        {
                            PostId = dr.GetInt32(0),
                            CategoryId = dr.GetInt32(1),
                            GettingHelpId = dr.GetInt32(2),
                            problemTitle = dr.GetString(3),
                            ProblemDescription = dr.GetString(4),
                            ProblemPic = dr.GetString(5),
                            StatusTypeId = dr.GetInt32(6),
                            dateUpdete = dr.GetDateTime(7),
                            Latitude = dr.GetDouble(8),
                            Longitude = dr.GetDouble(9),
                            GivingHelpId = dr.GetInt32(10),
                        });
                    }
                }
            }
            return postList;
        }











    }






}
