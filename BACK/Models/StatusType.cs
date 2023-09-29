using System;
using System.Collections.Generic;

namespace GoGoodServer.Models
{
    public partial class StatusType
    {
        public StatusType()
        {
            Posts = new HashSet<Post>();
        }

        public int Id { get; set; }
        public string? StatusType1 { get; set; }
        public string? Icon { get; set; }

        public virtual ICollection<Post> Posts { get; set; }
    }
}
