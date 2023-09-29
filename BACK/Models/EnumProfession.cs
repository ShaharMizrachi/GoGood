using System;
using System.Collections.Generic;

namespace GoGoodServer.Models
{
    public partial class EnumProfession
    {
        public EnumProfession()
        {
            GivingHelpPerProfessions = new HashSet<GivingHelpPerProfession>();
            Posts = new HashSet<Post>();
        }

        public int Id { get; set; }
        public string? Category { get; set; }
        public string? Icon { get; set; }

        public virtual ICollection<GivingHelpPerProfession> GivingHelpPerProfessions { get; set; }
        public virtual ICollection<Post> Posts { get; set; }
    }
}
