using Amazon.SecretsManager.Model;
using Amazon.SecretsManager;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Amazon;
using GoGoodServer.Models;
using GoGoodServer.Services.SpService;
using Amazon.Runtime;
using Amazon.S3.Model;
using Amazon.S3;
using Microsoft.Extensions.Options;
using System.Net;



namespace GoGoodServer.Services.AwsSettings
{
    public class AwsService : IAwsService
    {

        private readonly IConfiguration _configuration;
        private readonly int _expiryMinutes;



        public AwsService(IConfiguration configuration, IOptions<AwsS3Settings> s3Settings)
        {
            _configuration = configuration;
            _expiryMinutes = s3Settings.Value.PreSignedURLExpiryMinutes;
        }

        public AwsService()
        {
        }


        public async Task<T> SecretManagerPulldata<T>(String secretName) where T : class
        {
            try
            {
                //// -----------get secreat manager key value from aws-------------------------- 
                string region = "eu-west-1";
                IAmazonSecretsManager client = new AmazonSecretsManagerClient(RegionEndpoint.GetBySystemName(region));
                GetSecretValueRequest request = new GetSecretValueRequest
                {
                    SecretId = secretName,
                    VersionStage = "AWSCURRENT",
                };
                GetSecretValueResponse response;
                response = await client.GetSecretValueAsync(request);

                if (response != null)
                {
                    string secretString = response.SecretString;
                    dynamic secretObject = JsonConvert.DeserializeObject<dynamic>(secretString);
                    return secretObject;

                }
                return null;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }


        public async void S3ConnectionRequest(string keyPath)
        {
            try
            {

                //var s3Client = GetS3Client();

                var request = new GetPreSignedUrlRequest
                {
                    BucketName = "gogood-bucket",
                    Key = keyPath,
                    Expires = DateTime.Now.AddMinutes(_expiryMinutes) // URL expires after 60 minutes
                };
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);

            }
        }


        public AmazonS3Client GetS3Client()
        {
            var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
            var config = new AmazonS3Config { RegionEndpoint = RegionEndpoint.EUWest1 };
            if (environment == "Development")
            {
                var accessKey = Environment.GetEnvironmentVariable("AWS_ACCESS_KEY_ID");
                var secretKey = Environment.GetEnvironmentVariable("AWS_SECRET_ACCESS_KEY");
                var credentials = new BasicAWSCredentials(accessKey, secretKey);
                return new AmazonS3Client(credentials, config);
            }
            else
            {
                return new AmazonS3Client(config);
            }
        }

        public async Task<List<KeyVersion>> ListOfFilesinFolder(string awsPath, string BucketName)
        {
            var s3Client = GetS3Client();
            // List all objects with the given prefix
            var listRequest = new ListObjectsRequest
            {
                BucketName = BucketName, //S3 bucket name
                Prefix = awsPath
            };

            var listResponse = await s3Client.ListObjectsAsync(listRequest);
            var keys = new List<KeyVersion>();
            foreach (var item in listResponse.S3Objects)
            {
                keys.Add(new KeyVersion { Key = item.Key });
            }
            return keys;
        }

        public async Task<IActionResult> DeleteFileFromS3(string userId, string picType)
        {
            try
            {
                var s3Client = GetS3Client();

                string awsPath;
                switch (picType)
                {
                    case "user":
                        awsPath = $"Users/userId:{userId}/";
                        break;

                    case "IdCard":
                        awsPath = $"IdCards/userId:{userId}/";
                        break;

                    default:
                        awsPath = $"Posts/postId:{userId}/";
                        break;
                }

                List<KeyVersion> keys =await ListOfFilesinFolder(awsPath, "gogood-bucket");

                if (keys.Count > 0)  // If there are any files to delete
                {
                    // Create a batch delete request
                    var multiObjectDeleteRequest = new DeleteObjectsRequest()
                    {
                        BucketName = "gogood-bucket",
                        Objects = keys
                    };

                    try
                    {
                        var deleteObjectsResponse = await s3Client.DeleteObjectsAsync(multiObjectDeleteRequest);
                        return new OkObjectResult(new { message = "Deleted successfully." });
                    }
                    catch (AmazonS3Exception e)
                    {
                        Console.WriteLine("Error encountered on server. Message:'{0}' when deleting an object", e.Message);
                        return new ObjectResult(new { error = e.Message }) { StatusCode = (int)HttpStatusCode.InternalServerError };
                    }
                    catch (Exception e)
                    {
                        Console.WriteLine("Unknown encountered on server. Message:'{0}' when deleting an object", e.Message);
                        return new ObjectResult(new { error = e.Message }) { StatusCode = (int)HttpStatusCode.InternalServerError };

                    }
                }
                else
                {
                    // Nothing to delete
                    return new OkObjectResult(new { message = "No files found to delete." });
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception: {ex.Message}");
                Console.WriteLine($"Stack trace: {ex.StackTrace}");
                return new ObjectResult(new { error = ex.Message }) { StatusCode = (int)HttpStatusCode.InternalServerError };
            }
        }








    }
}
