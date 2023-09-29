using System;
using System.Collections.Generic;

namespace GoGoodServer.Models
{
    public partial class UserGoGood
    {
        public UserGoGood()
        {
            GivingHelpOwnerPosts = new HashSet<GivingHelpOwnerPost>();
            GivingHelpPerProfessions = new HashSet<GivingHelpPerProfession>();
            Posts = new HashSet<Post>();
            Recommendation = new HashSet<Recommendation>();
        }

        public int Id { get; set; }
        public string? FullName { get; set; }
        public string Phone { get; set; } = null!;
        public string? ImgUrl { get; set; }

        public string? UserDescription { get; set; }

        public string? FcmToken { get; set; }

        public string? Imei { get; set; }
        public string? UserType { get; set; }

        public int IsActive { get; set; } = 1;



        public virtual ICollection<GivingHelpOwnerPost> GivingHelpOwnerPosts { get; set; }
        public virtual ICollection<GivingHelpPerProfession> GivingHelpPerProfessions { get; set; }
        public virtual ICollection<Post> Posts { get; set; }
        public virtual ICollection<Recommendation>? Recommendation { get; set; }

    }
}
