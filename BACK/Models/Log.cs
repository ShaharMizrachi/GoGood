using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace GoGoodServer.Models
{
    public partial class Log
    {
        public int Id { get; set; }
        public string? Description { get; set; }
        public int? Type { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime DateLogged { get; set; }
        public string? LogLevel { get; set; }       
        public string? StackTrace { get; set; }    
    }
}
