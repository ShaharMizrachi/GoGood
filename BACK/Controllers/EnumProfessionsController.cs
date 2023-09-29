using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GoGoodServer.Models;
using GoGoodServer.Controllers.DataContainers;
using Microsoft.Data.SqlClient;
using MySql.Data.MySqlClient;
using System.Data;
using GoGoodServer.Services.SpService;

namespace GoGoodServer.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class EnumProfessionsController : ControllerBase
    {
        private readonly GoGoodDBContext _context;
        private readonly IConfiguration _configuration;
        private ISpService _ispService;
        public EnumProfessionsController(GoGoodDBContext context, IConfiguration configuration, ISpService ispService)
        {
            _configuration = configuration;
            _context = context;
            _ispService = ispService;
        }



        // GET: api/EnumProfessions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EnumProfessionWithHebrew>>> GetEnumProfessions()
        {
            try
            {
                if (_context.EnumProfessions == null)
                {
                    return NotFound();
                }
                var result = await _ispService.ActivateSp<EnumProfessionWithHebrew>("ProffesionsMixLanguages", null);
                return result.ToList();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }


        ////-- old one should be deleted after upload to aws server and tested--
        //List<EnumProfessionWithHebrew> GetEnumProfessionWithHebrews(){
        //    List<EnumProfessionWithHebrew> prefessionsTypes = new List<EnumProfessionWithHebrew>();
        //    using(MySqlConnection con = new MySqlConnection(_configuration.GetSection("ConnectionStrings:GoGoodDBContext").Value)){
        //          using(MySqlCommand cmd = new MySqlCommand("ProffesionsMixLanguages",con)){
        //          cmd.CommandType= CommandType.StoredProcedure;
        //          con.Open();
        //          MySqlDataReader dr = cmd.ExecuteReader();
        //          while(dr.Read()){
        //                prefessionsTypes.Add(new EnumProfessionWithHebrew
        //                {
        //                    Id = dr.GetInt32(0),
        //                    Category = dr.IsDBNull(1) ? null : dr.GetString(1),
        //                    Icon = dr.IsDBNull(2) ? null : dr.GetString(2),
        //                    HebrewCategory = dr.IsDBNull(3) ? null : dr.GetString(3)
        //                });
        //            }
        //          }

        //        return prefessionsTypes;
        //       }
        //}







        // GET: api/EnumProfessions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<EnumProfession>> GetEnumProfession(int id)
        {
            var enumProfession = await _context.EnumProfessions.FindAsync(id);

            if (enumProfession == null)
            {
                return NotFound();
            }

            return enumProfession;
        }

        // PUT: api/EnumProfessions/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEnumProfession(int id, EnumProfession enumProfession)
        {
            if (id != enumProfession.Id)
            {
                return BadRequest();
            }

            _context.Entry(enumProfession).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EnumProfessionExists(id))
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

        // POST: api/EnumProfessions
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<EnumProfession>> PostEnumProfession(EnumProfession enumProfession)
        {
            _context.EnumProfessions.Add(enumProfession);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEnumProfession", new { id = enumProfession.Id }, enumProfession);
        }

        // DELETE: api/EnumProfessions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEnumProfession(int id)
        {
            var enumProfession = await _context.EnumProfessions.FindAsync(id);
            if (enumProfession == null)
            {
                return NotFound();
            }

            _context.EnumProfessions.Remove(enumProfession);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EnumProfessionExists(int id)
        {
            return _context.EnumProfessions.Any(e => e.Id == id);
        }
    }
}
