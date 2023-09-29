using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
// using GoGoodServer.Controllers.DataContainers;
using GoGoodServer.Models;
using Microsoft.IdentityModel.Tokens;

namespace GoGoodServer.Services.UserService
{
    public class UserService : IUserService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IConfiguration _configuration;

        public UserService(IHttpContextAccessor httpContextAccessor,IConfiguration configuration)
        {
            _httpContextAccessor = httpContextAccessor;
            _configuration =configuration;
        }
        public string GetPhone()
        {
            var result = string.Empty;
            if(_httpContextAccessor!=null){
                result = _httpContextAccessor?.HttpContext?.User.FindFirstValue(ClaimTypes.MobilePhone);
            }
            return result;
        }

        public int GetId()
        {
            var result = string.Empty;
            if(_httpContextAccessor!=null){
                result = _httpContextAccessor?.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);
            }
            return  int.Parse(result);  
        }
        public string GetRole()
        {
            throw new NotImplementedException();
        }

        public string CreateToken(UserGoGood user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier,user.Id.ToString()),
                new Claim(ClaimTypes.MobilePhone, user.Phone),
                new Claim(ClaimTypes.Role,user.UserType)
            };
            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_configuration.GetSection("AppSetting:Token").Value));
            var cred = new SigningCredentials(key,SecurityAlgorithms.HmacSha256Signature);
            var token = new JwtSecurityToken(
                claims:claims,
                expires:DateTime.Now.AddDays(1),
                signingCredentials:cred
                );
            var jwt = new JwtSecurityTokenHandler().WriteToken(token); 
            return jwt;
        }


    }
}