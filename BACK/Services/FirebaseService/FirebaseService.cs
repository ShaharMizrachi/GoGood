using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using FirebaseAdmin.Messaging;
using GoGoodServer.Models;
using MySql.Data.MySqlClient;
using System.Linq.Expressions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;



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
using Newtonsoft.Json;

namespace GoGoodServer.Services.FirebaseService
{
    public class FirebaseService : IFirebaseService
    {
        private readonly IConfiguration _configuration;

        public FirebaseService(IConfiguration configuration)
        {

            _configuration = configuration;
        }

        public async Task SendNotificationSingle(String UserToken, string title, string body, Post post, string popUpName, string idToDisplay = "")
        {
            var message = new Message()
            {
                Data = new Dictionary<string, string>() // that data i want to pass 
                {
                    { "post",  JsonConvert.SerializeObject(post,Formatting.None,
                        new JsonSerializerSettings()
                        {
                            ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                        }) },
                    { "popUpName", popUpName },
                    {"idToDisplay",idToDisplay}
                },
                Android = new AndroidConfig
                {
                    Priority = Priority.High // Android priority
                },
                Token = UserToken,
                Apns = new ApnsConfig
                {
                    Headers = new Dictionary<string, string>
                        {
                            { "apns-priority", "10" }
                        },
                    CustomData = new Dictionary<string, object>
                        {
                        { "aps", new Dictionary<string, object>
                    {
                    { "content-available", 1 }
                }
            }
        }

                },
                Notification = new Notification() //the massage on the notification 
                {
                    Title = title,
                    Body = body,
                }
            };

            var messaging = FirebaseMessaging.DefaultInstance;

            try
            {
                string response = await messaging.SendAsync(message);


                Console.WriteLine("Successfully sent message: " + response);
            }
            catch (Exception exception)
            {
                Console.WriteLine("Error sending message: " + exception.Message);
            }
        }


        public async Task SendNotificationMulticast(String[] UserTokens, string title, string body, Post post)
        {
            var message = new MulticastMessage()
            {
                Data = new Dictionary<string, string>() // that data i want to pass 
                {
                    { "post",  JsonConvert.SerializeObject(post) },
                    { "body", "Your body message" }
                },
                Tokens = UserTokens,
                Notification = new Notification() //the massage on the notification 
                {
                    Title = title,
                    Body = body,
                }
            };

            var messaging = FirebaseMessaging.DefaultInstance;

            try
            {
                BatchResponse response = await messaging.SendMulticastAsync(message);


                if (response.FailureCount > 0) // cheack if notification fail, at least for one destination 
                {
                    foreach (var resp in response.Responses)
                    {
                        if (!resp.IsSuccess)
                        {
                            Console.WriteLine("Failed to send message: " + resp.Exception);
                        }
                    }
                }
                else
                {
                    Console.WriteLine("Successfully sent message: " + response.SuccessCount);
                }
            }
            catch (Exception exception)
            {
                Console.WriteLine("Error sending message: " + exception.Message);
            }
        }



        public Dictionary<string, string> TextOfNotification(int massageNumber)
        {
            Dictionary<string, string> notificationMassageObj = new Dictionary<string, string>();

            switch (massageNumber)
            {
                case 2:
                    notificationMassageObj["title"] = "";
                    notificationMassageObj["body"] = "";
                    return notificationMassageObj;

            }



            return notificationMassageObj;
        }




        public async Task<PushNotificationMessages> GetPushNotificationMessage(int id)
        {
            List<PushNotificationMessages> pushMessage = new List<PushNotificationMessages>();
            try
            {
                await using (MySqlConnection con = new MySqlConnection(_configuration.GetSection("ConnectionStrings:GoGoodDBContext").Value))
                {
                    using (MySqlCommand cmd = new MySqlCommand("getPushMessageById", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@idSent", id);
                        con.Open();
                        MySqlDataReader dr = cmd.ExecuteReader();
                        while (dr.Read())
                        {
                            pushMessage.Add(new PushNotificationMessages
                            {
                                Id = dr.GetInt32(0),
                                Title = dr.GetString(1),
                                Body = dr.GetString(2),
                                Comment = dr.GetString(3)
                            });
                        }

                        if (pushMessage.Any())
                            return pushMessage.First();
                        else
                            return null;
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine($"An error occurred: {e.Message}");
                return null;
            }
        }


        public async Task<String> GetFcmTokenByUserId(int userId)
        {
            try
            {
                await using (MySqlConnection con = new MySqlConnection(_configuration.GetSection("ConnectionStrings:GoGoodDBContext").Value))
                {
                    using (MySqlCommand cmd = new MySqlCommand("getFcmTokenByUserId", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@userId", userId);
                        con.Open();
                        MySqlDataReader dr = cmd.ExecuteReader();
                        if (dr.Read())
                        {
                            string token = dr.GetString(0);
                            if (!string.IsNullOrEmpty(token))
                                return token;
                            else
                                return null;
                        }
                        else
                        {
                            return null;
                        }
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine($"An error occurred: {e.Message}");
                return null;
            }
        }

    }
}
