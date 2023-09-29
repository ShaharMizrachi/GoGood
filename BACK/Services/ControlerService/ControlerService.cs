using Dapper;
using GoGoodServer.Models;
using GoGoodServer.Services.AwsSettings;
using GoGoodServer.Services.FirebaseService;
using GoGoodServer.Services.SpService;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;


namespace GoGoodServer.Services.ControlerService
{
    public class ControlerService : ControllerBase,IControlerService
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

        public ControlerService(GoGoodDBContext context, IConfiguration configuration, ILogger<Post> logger, IWebHostEnvironment env, IUserService iUserService, IOptions<AwsS3Settings> s3Settings, IFirebaseService ifireBaseService, IAwsService awsService, ISpService ispService)
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
        }

        public async Task<IActionResult> UserChangeStatusExtraActions(int userIdSent, Post post)
        {
            try
            {
                PushNotificationMessages pushMessage = new PushNotificationMessages();
                string fcmToken = "";

                // pull the user who change the post status
                UserGoGood userGoGood = await _context.UserGoGoods.FindAsync(userIdSent);

                // pull user type givingHelpUser from SP
                var parameters = new DynamicParameters();
                parameters.Add("@postId", post.Id);
                UserGoGood givingHelpUser = await _ispService.ActivateSpSingleAnswer<UserGoGood>("GetGivingHelpOwnersPostsByPostId", parameters);


                if (post.StatusTypeId == 2 && post.GettingHelpId.HasValue)
                {
                    // In case Givinghelp uesr offer help to getting help post
                    // getting help user get the push 
                    pushMessage = await _ifireBaseService.GetPushNotificationMessage(1);
                    fcmToken = await _ifireBaseService.GetFcmTokenByUserId(post.GettingHelpId.Value);
                    await _ifireBaseService.SendNotificationSingle(fcmToken, pushMessage.Title, pushMessage.Body, post, "VolunteerAcceptedModal");
                }
                if (post.StatusTypeId == 1 && post.GettingHelpId.HasValue)
                {


                    if (userGoGood.UserType == "GettingHelp")// get the givingHelp user 
                    {
                        //GivingHelp user get the push.
                        pushMessage = await _ifireBaseService.GetPushNotificationMessage(4);
                        fcmToken = await _ifireBaseService.GetFcmTokenByUserId(givingHelpUser.Id);
                        await _ifireBaseService.SendNotificationSingle(fcmToken, pushMessage.Title, pushMessage.Body, post,"VolunteerCancelInProgressModal");
                    }
                    else  //GettingHelp user get the push.
                    {
                        pushMessage = await _ifireBaseService.GetPushNotificationMessage(7);
                        fcmToken = await _ifireBaseService.GetFcmTokenByUserId(post.GettingHelpId.Value);
                        await _ifireBaseService.SendNotificationSingle(fcmToken, pushMessage.Title, pushMessage.Body, post, "GettingHelpCancelInProgress",userGoGood.Id.ToString());
                    }
                    // disconnect givingHelp user from post 
                    await _ispService.ActivateSpSingleAnswer<UserGoGood>("detachingPostByPostId", parameters);

                }
                if (post.StatusTypeId == 3) //getHelp user approve request and giveHelp user get push 
                {
                    pushMessage = await _ifireBaseService.GetPushNotificationMessage(3);
                    fcmToken = await _ifireBaseService.GetFcmTokenByUserId(givingHelpUser.Id);
                    await _ifireBaseService.SendNotificationSingle(fcmToken, pushMessage.Title, pushMessage.Body, post, "GettingHelpAcceptModal");
                }

            }
 
            catch (Exception e)
            {
                Console.WriteLine(e.ToString());
            }
            return NoContent();

        }
    }
}
