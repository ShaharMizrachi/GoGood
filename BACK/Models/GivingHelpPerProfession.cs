using System;
using System.Collections.Generic;

namespace GoGoodServer.Models
{
    public partial class GivingHelpPerProfession
    {
        public int Id { get; set; }
        public int? CategoryId { get; set; }
        public int? GivingHelpId { get; set; }

        public virtual EnumProfession? Category { get; set; }
        public virtual UserGoGood? GivingHelp { get; set; }
    }
}
