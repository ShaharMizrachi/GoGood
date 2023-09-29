using System;
using System.Collections.Generic;

namespace GoGoodServer.Models
{
    public partial class Post
    {
        public Post()
        {
            GivingHelpOwnerPosts = new HashSet<GivingHelpOwnerPost>();
            Recommendation = new HashSet<Recommendation>();
        }

        public int Id { get; set; }
        public int? CategoryId { get; set; }
        public int? GettingHelpId { get; set; }
        public string? ProblemTitle { get; set; }
        public string? ProblemDescription { get; set; }
        public string? ProblemPic { get; set; }
        public int? StatusTypeId { get; set; }
        public DateTime DateUpdete { get; set; } = DateTime.Now;

        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
        public DateTime? UpdatedTimestamp { get; set; } // Make it nullable

        public virtual EnumProfession? Category { get; set; }
        public virtual UserGoGood? GettingHelp { get; set; }
        public virtual StatusType? StatusType { get; set; }
        public virtual ICollection<GivingHelpOwnerPost> GivingHelpOwnerPosts { get; set; }
        public virtual ICollection<Recommendation>? Recommendation { get; set; }
        public static List<Post> GetPostsWithNonNullUpdatedTimestamp(GoGoodDBContext dbContext)
        {
            var postsWithNonNullTimestamp = dbContext.Posts
                .Where(post => post.UpdatedTimestamp != null)
                .ToList();

            return postsWithNonNullTimestamp;
        }
    }
}
