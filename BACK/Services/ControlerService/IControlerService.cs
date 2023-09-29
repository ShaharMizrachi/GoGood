using GoGoodServer.Models;
using Microsoft.AspNetCore.Mvc;

namespace GoGoodServer.Services.ControlerService
{
    public interface IControlerService
    {
        Task<IActionResult> UserChangeStatusExtraActions(int userIdSent, Post post);
    }
}
