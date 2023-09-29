using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GoGoodServer.Models;

namespace GoGoodServer.Controllers.DataContainers
{
    public class User
    {
        public UserGoGood? userGoGood { get; set; }
        public string? Token { get; set; }
        public User()
        {
            userGoGood = new UserGoGood();
        }
    }
}