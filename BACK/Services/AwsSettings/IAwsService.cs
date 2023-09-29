using Amazon.S3;
using Amazon.S3.Model;
using Microsoft.AspNetCore.Mvc;

namespace GoGoodServer.Services.AwsSettings
{
    public interface IAwsService
    {
        Task<T> SecretManagerPulldata<T>(String secretName) where T : class;
        AmazonS3Client GetS3Client();
        void S3ConnectionRequest(string keyPath);
        Task<IActionResult> DeleteFileFromS3(string userId, string picType);
        Task<List<KeyVersion>> ListOfFilesinFolder(string awsPath, string BucketName);
    }
}
