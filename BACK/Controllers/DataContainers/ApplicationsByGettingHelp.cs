using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoGoodServer.Controllers.DataContainers
{
    public class ApplicationsByGettingHelp
    {

        public int? GivingHelpId { get; set; }
        public int? IdGivingHelpOwnerPost { get; set; }
        public int PostId { get; set; }
        public int? CategoryId { get; set; }
        public int? GettingHelpId { get; set; }
        public string? problemTitle { get; set; }
        public string? ProblemDescription { get; set; }
        public string? ProblemPic { get; set; }
        public int? StatusTypeId { get; set; }
        public DateTime? dateUpdete{ get; set; }
         public double? Latitude { get; set; }
        public double? Longitude { get; set; }
        
    }
}