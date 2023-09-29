using System;
using System.Collections.Generic;

namespace GoGoodServer.Models
{
    public partial class GivingHelpOwnerPost
    {
        

        public int Id { get; set; }
        public int? PostId { get; set; }
        public int? GivingHelpId { get; set; }

        public virtual UserGoGood? GivingHelp { get; set; }
        public virtual Post? Post { get; set; }
    }
}
