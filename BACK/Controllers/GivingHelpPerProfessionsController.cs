using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GoGoodServer.Models;
//using Microsoft.Data.SqlClient;
using MySql.Data.MySqlClient;
using System.Data;
using Microsoft.AspNetCore.Authorization;
using Dapper;
using GoGoodServer.Services.SpService;

namespace GoGoodServer.Controllers
{

public class CategoriesUpdate{

     public string toRemoveList { get; set; }
     public string toAddList { get; set; }

}


    [Route("api/[controller]")]
    [ApiController]
    public class GivingHelpPerProfessionsController : ControllerBase
    {
        private readonly GoGoodDBContext _context;
        private readonly IConfiguration _configuration;
        private readonly IUserService _userService;
        private ISpService _ispService;

        public GivingHelpPerProfessionsController(GoGoodDBContext context,IConfiguration configuration, IUserService userService, ISpService ispService)
        {
            _context = context;
            _configuration=configuration;
            _userService = userService;
            _ispService = ispService;
        }

        
        // GET: api/GivingHelpPerProfessions/GivingHelpcategories/{id}
        [HttpGet("GivingHelpcategories/{id}")]
        public async Task<ActionResult<List<int>>> GivingHelpcategories(int id)
        {

            //var parameters = new DynamicParameters();
            //parameters.Add("@idGivingHelp", 2);
            //var result = await _ispService.ActivateSp<int>("GivingHelpcategories", parameters);



            return GivingHelpcategoriesFromDb(id);
        }


     




        List<int> GivingHelpcategoriesFromDb(int id){
            List<int> categories= new List<int>();
            using(MySqlConnection con = new MySqlConnection(_configuration.GetSection("ConnectionStrings:GoGoodDBContext").Value)){
                using(MySqlCommand cmd = new MySqlCommand("GivingHelpcategories",con)){
                 cmd.CommandType= CommandType.StoredProcedure;
                 cmd.Parameters.AddWithValue("@idGivingHelp",id);
                 con.Open();
                 MySqlDataReader dr = cmd.ExecuteReader();
                 while(dr.Read()){
                        categories.Add(dr.GetInt32(0));
                    }
                }
            }
             return  categories;
          }
        
        
        //api/GivingHelpPerProfessions/UpdateCategoriesForGivingHelp/{id}
        [HttpPut("UpdateCategoriesForGivingHelp/{id}")]
        public async Task<IActionResult> UpdateCategoriesForGivingHelp(int id ,CategoriesUpdate categoriesUpdate)
        {
            /*var tokensId = _userService.GetId();
            if(tokensId!=null && tokensId!=id)
            {
                return Unauthorized();
            }*/
           UpdateCategoriesForGivingHelpFromDb(id,categoriesUpdate.toRemoveList,categoriesUpdate.toAddList);            
            return NoContent();
        }

        void UpdateCategoriesForGivingHelpFromDb(int id,string toRemoveList ,string toAddList){
            using(MySqlConnection con = new MySqlConnection(_configuration.GetSection("ConnectionStrings:GoGoodDBContext").Value)){
                using(MySqlCommand cmd = new MySqlCommand("UpdateCategoriesForGivingHelp",con)){
                 cmd.CommandType= CommandType.StoredProcedure;
                 cmd.Parameters.AddWithValue("@idGivingHelp",id);
                 cmd.Parameters.AddWithValue("@remove_List_categories",toRemoveList);
                 cmd.Parameters.AddWithValue("@add_List_categories",toAddList);
                 con.Open();
                 MySqlDataReader dr = cmd.ExecuteReader();
            }
          }
        }




        
        // GET: api/GivingHelpPerProfessions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GivingHelpPerProfession>>> GetGivingHelpPerProfessions()
        {
            return await _context.GivingHelpPerProfessions.ToListAsync();
        }

        // GET: api/GivingHelpPerProfessions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<GivingHelpPerProfession>> GetGivingHelpPerProfession(int id)
        {
            var givingHelpPerProfession = await _context.GivingHelpPerProfessions.FindAsync(id);

            if (givingHelpPerProfession == null)
            {
                return NotFound();
            }

            return givingHelpPerProfession;
        }

        // PUT: api/GivingHelpPerProfessions/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGivingHelpPerProfession(int id, GivingHelpPerProfession givingHelpPerProfession)
        {
            if (id != givingHelpPerProfession.Id)
            {
                return BadRequest();
            }

            _context.Entry(givingHelpPerProfession).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GivingHelpPerProfessionExists(id))
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

        // POST: api/GivingHelpPerProfessions
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<GivingHelpPerProfession>> PostGivingHelpPerProfession(GivingHelpPerProfession givingHelpPerProfession)
        {
            _context.GivingHelpPerProfessions.Add(givingHelpPerProfession);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGivingHelpPerProfession", new { id = givingHelpPerProfession.Id }, givingHelpPerProfession);
        }

        // DELETE: api/GivingHelpPerProfessions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGivingHelpPerProfession(int id)
        {
            var givingHelpPerProfession = await _context.GivingHelpPerProfessions.FindAsync(id);
            if (givingHelpPerProfession == null)
            {
                return NotFound();
            }

            _context.GivingHelpPerProfessions.Remove(givingHelpPerProfession);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool GivingHelpPerProfessionExists(int id)
        {
            return _context.GivingHelpPerProfessions.Any(e => e.Id == id);
        }
    }
}
