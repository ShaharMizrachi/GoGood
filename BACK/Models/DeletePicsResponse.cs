using Microsoft.AspNetCore.Mvc;

namespace GoGoodServer.Models
{
    public class DeletePicsResponse
    {

        public IActionResult IdCardDeleteResult { get; set; }
        public IActionResult UserDeleteResult { get; set; }
        public List<IActionResult> PostsDeleteResult { get; set; } = new List<IActionResult>();

    }
}
