using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GoGoodServer.Models;
using MySql.Data.MySqlClient;
using Microsoft.Data.SqlClient;
using System.Data;
using GoGoodServer.Controllers.DataContainers;
using GoGoodServer.Services.SpService;
using Dapper;

namespace GoGoodServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GivingHelpOwnersPostsController : ControllerBase
    {
        private readonly GoGoodDBContext _context;
        private readonly IConfiguration _configuration;
        private ISpService _ispService;

        public GivingHelpOwnersPostsController(GoGoodDBContext context, IConfiguration configuration, ISpService ispService)
        {
            _context = context;
            _configuration = configuration;
            _ispService = ispService;
        }

        // DELETE: api/ProfessionalsOwnersPosts/5
        [HttpDelete("DetachingGivingHelpOwnerPostByPostId/{PostId}")]
        public async Task<IActionResult> DetachingGivingHelpOwnerPostByPostId(int PostId)
        {
            if(PostId==0){
                return BadRequest();
            }
            DeletePostOwndByProffession(PostId);
           return Ok("Deleted Successfuly");
        }


        void DeletePostOwndByProffession(int id){
            using(MySqlConnection con = new MySqlConnection(_configuration.GetSection("ConnectionStrings:GoGoodDBContext").Value)){
                using(MySqlCommand cmd = new MySqlCommand("detachingPostByPostId",con)){
                 cmd.CommandType= CommandType.StoredProcedure;
                 cmd.Parameters.AddWithValue("@postId",id);
                 con.Open();
                MySqlDataReader dr = cmd.ExecuteReader();
                }
            }

          }



            // GET: api/GivingHelpOwnersPosts
            [HttpGet("ByPostId/{postId}")]
        public async Task<ActionResult<UserGoGood>> GetGivingHelpOwnerPostsByPostId(int postId)
        {
            try{
                var parameters = new DynamicParameters();
                parameters.Add("@postId", postId);
                var result = await _ispService.ActivateSpSingleAnswer<UserGoGood>("GetGivingHelpOwnersPostsByPostId", parameters);
                Console.WriteLine(result);
                return Ok(result);
            }catch (Exception ex) { 
                Console.WriteLine($"Could not find {ex.Message}");
                return BadRequest();
            } 
        }



        // GET: api/GivingHelpOwnersPosts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GivingHelpOwnerPost>>> GetGivingHelpOwnerPosts()
        {
            return await _context.GivingHelpOwnerPosts.ToListAsync();
        }

        // GET: api/GivingHelpOwnersPosts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<GivingHelpOwnerPost>> GetGivingHelpOwnerPost(int id)
        {
            var givingHelpOwnerPost = await _context.GivingHelpOwnerPosts.FindAsync(id);

            if (givingHelpOwnerPost == null)
            {
                return NotFound();
            }

            return givingHelpOwnerPost;
        }

        // PUT: api/GivingHelpOwnersPosts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGivingHelpOwnerPost(int id, GivingHelpOwnerPost givingHelpOwnerPost)
        {
            if (id != givingHelpOwnerPost.Id)
            {
                return BadRequest();
            }

            _context.Entry(givingHelpOwnerPost).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GivingHelpOwnerPostExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/GivingHelpOwnersPosts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<GivingHelpOwnerPost>> PostGivingHelpOwnerPost(GivingHelpOwnerPost givingHelpOwnerPost)
        {
            _context.GivingHelpOwnerPosts.Add(givingHelpOwnerPost);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGivingHelpOwnerPost", new { id = givingHelpOwnerPost.Id }, givingHelpOwnerPost);
        }

        // DELETE: api/GivingHelpOwnersPosts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGivingHelpOwnerPost(int id)
        {
            var givingHelpOwnerPost = await _context.GivingHelpOwnerPosts.FindAsync(id);
            if (givingHelpOwnerPost == null)
            {
                return NotFound();
            }

            _context.GivingHelpOwnerPosts.Remove(givingHelpOwnerPost);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool GivingHelpOwnerPostExists(int id)
        {
            return _context.GivingHelpOwnerPosts.Any(e => e.Id == id);
        }
    }
}
