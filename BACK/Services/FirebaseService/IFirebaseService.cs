using GoGoodServer.Models;

namespace GoGoodServer.Services.FirebaseService
{
    public interface IFirebaseService
    {
        Task SendNotificationSingle(String UserToken, string title, string body, Post post, string popUpName, string idToDisplay = "");

        Dictionary<string, string> TextOfNotification(int massageNumber);

        Task<PushNotificationMessages> GetPushNotificationMessage(int id);

        Task<String> GetFcmTokenByUserId(int id);

        Task SendNotificationMulticast(String[] UserTokens, string title, string body, Post post);

    }

}
