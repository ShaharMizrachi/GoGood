using GoGoodServer.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Collections.Generic;
using GoGoodServer.Services.SpService;
using Dapper;
using GoGoodServer.Services.FirebaseService;
using GoGoodServer.Migrations;

namespace GoGoodServer.Monitor.Tasks
{
    public class Posts
    {
        private readonly GoGoodDBContext _context;
        private ISpService _ispService;
        private IFirebaseService _ifireBaseService;
        private PushNotificationMessages pushMessage;

        public Posts(GoGoodDBContext context, ISpService ispService, IFirebaseService ifireBaseService)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _ispService = ispService;
            _ifireBaseService = ifireBaseService;
        }

        public async Task ProcessNewPosts()
        {
            try
            {
                Console.WriteLine("Processing new posts...");

                DateTime fortyEightHoursAgo = DateTime.UtcNow.AddHours(-48);

                DateTime oneHundredNinetyTwoHoursAgo = DateTime.UtcNow.AddHours(-192);

                List<Post> postsWithNonNullUpdatedTimestamp = _context.Posts
                    .Where(post => post.UpdatedTimestamp != null && post.StatusTypeId == 3 && post.UpdatedTimestamp > fortyEightHoursAgo)
                    .ToList();


                if (postsWithNonNullUpdatedTimestamp.Any())
                {
                    pushMessage = await _ifireBaseService.GetPushNotificationMessage(6);

                    foreach (Post post in postsWithNonNullUpdatedTimestamp)
                    {
                        if (post.UpdatedTimestamp <= oneHundredNinetyTwoHoursAgo)
                        {
                            var parameters = new DynamicParameters();
                            parameters.Add("@postId", post.Id);

                            var givingHelpUser = await _ispService.ActivateSpSingleAnswer<UserGoGood>("GetGivingHelpOwnersPostsByPostId", parameters);
                            await _ifireBaseService.SendNotificationSingle(givingHelpUser.FcmToken, pushMessage.Title, pushMessage.Body, post, "PostDetailes");


                            UserGoGood userGoGood = _context.UserGoGoods.FirstOrDefault(u => u.Id == post.GettingHelpId);
                            await _ifireBaseService.SendNotificationSingle(userGoGood.FcmToken, pushMessage.Title, pushMessage.Body, post, "PostDetailes");
                        }
                        else if (post.UpdatedTimestamp > oneHundredNinetyTwoHoursAgo)
                        {
                            Console.WriteLine($"Post with ID {post.Id} is 192 hours or more old.");
                        }
                    }
                }
                else
                {
                    Console.WriteLine("No posts with non-null UpdatedTimestamp found.");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred: {ex.Message}");
            }
        }
    }
}
