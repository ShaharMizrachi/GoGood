using Amazon.Runtime;
using Amazon.S3;
using Amazon.S3.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace GoGoodServer.Services.AwsSettings
{
    public class AwsS3Settings
    {
        public int PreSignedURLExpiryMinutes { get; set; }


        //public async Task<IActionResult> S3Connection(string keyPath)
        //{
        //    try
        //    {
        //        var config = new AmazonS3Config { RegionEndpoint = RegionEndpoint.EUWest1 };
        //        var s3Client = GetS3Client(config);

        //        var request = new GetPreSignedUrlRequest
        //        {
        //            BucketName = "gogood-bucket",
        //            Key = keyPath,
        //            Expires = DateTime.Now.AddMinutes(_expiryMinutes) // URL expires after 60 minutes
        //        };




        //    }
        //    catch (Exception ex) { 
        //        Console.WriteLine(ex.Message);  

        //    }
        //}


        private AmazonS3Client GetS3Client(AmazonS3Config config)
        {
            var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

            if (environment == "Production")
            {
                return new AmazonS3Client(config);
            }
            else
            {
                var accessKey = Environment.GetEnvironmentVariable("AWS_ACCESS_KEY_ID");
                var secretKey = Environment.GetEnvironmentVariable("AWS_SECRET_ACCESS_KEY");
                var credentials = new BasicAWSCredentials(accessKey, secretKey);
                return new AmazonS3Client(credentials, config);
            }
        }




    }
}
