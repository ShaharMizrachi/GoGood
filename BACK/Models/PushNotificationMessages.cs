using Google.Protobuf.WellKnownTypes;

namespace GoGoodServer.Models
{
    public partial class PushNotificationMessages
    {
        public int Id { get; set; } 
        public String Title { get; set; } = string.Empty;
        public String Body { get; set; } = string.Empty;
        public String  Comment { get; set;} = string.Empty;
    }
}
