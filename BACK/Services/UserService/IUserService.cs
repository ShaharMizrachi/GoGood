using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GoGoodServer.Models;
// using GoGoodServer.Controllers.DataContainers;

namespace GoGoodServer.Services.UserService
{
    public interface IUserService
    {
        string GetPhone();
        string GetRole();
        int GetId();
        string CreateToken(UserGoGood user);
    }
}