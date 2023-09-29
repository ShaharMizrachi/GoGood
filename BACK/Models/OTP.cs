namespace GoGoodServer.Models
{
    public class OTP
    {
        public OTP(string phone, string otpNumber)
        {
            if (string.IsNullOrEmpty(phone))
            {
                throw new ArgumentException("Phone cannot be null or empty.", nameof(phone));
            }

            if (string.IsNullOrEmpty(otpNumber))
            {
                throw new ArgumentException("OtpNumber cannot be null or empty.", nameof(otpNumber));
            }

            Phone = phone;
            OtpNumber = otpNumber;
            var timeZoneInfo = TimeZoneInfo.FindSystemTimeZoneById("Israel Standard Time");
            RegistrationDateTime = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, timeZoneInfo);

        }


        public int Id { get; set; }

        public string Phone { get; set; }

        public string OtpNumber { get; set; }

        public DateTime RegistrationDateTime { get; set; }
    }
}
