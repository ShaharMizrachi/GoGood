using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GoGoodServer.Models;

namespace GoGoodServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TraslatorsController : ControllerBase
    {
        private readonly GoGoodDBContext _context;

        public TraslatorsController(GoGoodDBContext context)
        {
            _context = context;
        }

        // GET: api/Traslators
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Traslator>>> GetTraslators()
        {
            return await _context.Traslators.ToListAsync();
        }

        // GET: api/Traslators/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Traslator>> GetTraslator(int id)
        {
            var traslator = await _context.Traslators.FindAsync(id);

            if (traslator == null)
            {
                return NotFound();
            }

            return traslator;
        }

        // PUT: api/Traslators/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTraslator(int id, Traslator traslator)
        {
            if (id != traslator.Id)
            {
                return BadRequest();
            }

            _context.Entry(traslator).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TraslatorExists(id))
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

        // POST: api/Traslators
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Traslator>> PostTraslator(Traslator traslator)
        {
            _context.Traslators.Add(traslator);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTraslator", new { id = traslator.Id }, traslator);
        }

        // DELETE: api/Traslators/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTraslator(int id)
        {
            var traslator = await _context.Traslators.FindAsync(id);
            if (traslator == null)
            {
                return NotFound();
            }

            _context.Traslators.Remove(traslator);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TraslatorExists(int id)
        {
            return _context.Traslators.Any(e => e.Id == id);
        }
    }
}
