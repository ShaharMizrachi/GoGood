using System;
using System.Collections.Generic;

namespace GoGoodServer.Models
{
    public partial class Recommendation
    {
        public int Id { get; set; }
        public int? PostId { get; set; }
        public string? Review { get; set; }
        public double? Rate { get; set; }

        public int? WhoGaveItId { get; set; }

        public int? WhoGotItId { get; set; }

        public DateTime reviewDate { get; set; } = DateTime.Now;


        // we have it in case using SP we are sending the info of the user who gave recommendtion  . 

        public virtual UserGoGood? WhoGaveGotIt { get; set; }
        
        public virtual Post? Post { get; set; }

    }
}
