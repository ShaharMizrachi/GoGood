using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GoGoodServer.Models;
using Microsoft.Data.SqlClient;
using MySql.Data.MySqlClient;
using System.Data;
using GoGoodServer.Migrations;
using Microsoft.Extensions.Hosting;
using GoGoodServer.Services.FirebaseService;

namespace GoGoodServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecommendationsController : ControllerBase
    {
        private readonly GoGoodDBContext _context;
        private readonly IConfiguration _configuration;
        private IFirebaseService _ifireBaseService;

        public RecommendationsController(GoGoodDBContext context, IConfiguration configuration, IFirebaseService ifireBaseService)
        {
            _context = context;
            _configuration = configuration;
            _ifireBaseService = ifireBaseService;

        }

        // GET: api/Recommendations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Recommendation>>> GetRecommendations()
        {
            return await _context.Recommendations.ToListAsync();
        }

        // GET: api/Recommendations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Recommendation>> GetRecommendation(int id)
        {
            var recommendation = await _context.Recommendations.FindAsync(id);

            if (recommendation == null)
            {
                return NotFound();
            }

            return recommendation;
        }

        //get recommendation for post
        // GET: api/getRecommendationsForPost/5
        //[HttpGet("getRecommendationsForPost/{id}")]
        //public async Task<ActionResult<List<Recommendation>>> GetRecommendationsForPost(int id)
        //{
        //    return await GetRecommendationsForPostFromDb(id) ;
        //}
        //async Task<List<Recommendation>>   GetRecommendationsForPostFromDb(int id){
        //     List<Recommendation> recommondations= new List<Recommendation>();
        //    await using(MySqlConnection con = new MySqlConnection(_configuration.GetSection("ConnectionStrings:GoGoodDBContext").Value)){
        //        using(MySqlCommand cmd = new MySqlCommand("getRecommendationsForPost",con)){
        //         cmd.CommandType= CommandType.StoredProcedure;
        //         cmd.Parameters.AddWithValue("@idPost",id);
        //         con.Open();
        //         MySqlDataReader dr = cmd.ExecuteReader();
        //         while(dr.Read()){
        //            recommondations.Add(new Recommendation{
        //                Id=dr.GetInt32(0),
        //                GivingHelpOwnerPostId = dr.GetInt32(1),
        //                Review = dr.GetString(2),
        //                Rate = dr.GetDouble(3)
        //            });
        //        }
        //    }
        //  }
        //     return recommondations;
        //  }



        //get all recommendation user gave by the user id  
        [HttpGet("getAllWhoGaveItRecommendationsByUserId/{id}")]
        public async Task<ActionResult<List<Recommendation>>> GetAllWhoGaveItRecommendationsByUserId(int id)
        {
            return await GetAllWhoGaveItRecommendationsByUserIdDb(id);
        }
        async Task<List<Recommendation>> GetAllWhoGaveItRecommendationsByUserIdDb(int id)
        {
            List<Recommendation> recommondations = new List<Recommendation>();
            await using (MySqlConnection con = new MySqlConnection(_configuration.GetSection("ConnectionStrings:GoGoodDBContext").Value))
            {
                using (MySqlCommand cmd = new MySqlCommand("getAllWhoGaveItRecommendationsByUserId", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@UserId", id);
                    con.Open();
                    MySqlDataReader dr = cmd.ExecuteReader();
                    while (dr.Read())
                    {
                        recommondations.Add(new Recommendation
                        {
                            Id = dr.GetInt32(0),
                            PostId = dr.GetInt32(1),
                            Review = dr.GetString(2),
                            Rate = dr.GetDouble(3),
                            WhoGaveItId = dr.GetInt32(4),
                            WhoGotItId = dr.GetInt32(5),
                            reviewDate = dr.GetDateTime(6),
                        });
                    }
                }
            }
            return recommondations;
        }


        //get all recommendation user got by the user id  
        [HttpGet("getAllWhoGotItRecommendationsByUserId/{id}")]
        public async Task<ActionResult<List<Recommendation>>> GetAllWhoGotItRecommendationsByUserId(int id)
        {
            var test = await GetAllWhoGotItRecommendationsByUserIdDb(id);
            Console.WriteLine(test);
            return test;
        }


        async Task<List<Recommendation>> GetAllWhoGotItRecommendationsByUserIdDb(int id)
        {
            List<Recommendation> recommondations = new List<Recommendation>();
            await using (MySqlConnection con = new MySqlConnection(_configuration.GetSection("ConnectionStrings:GoGoodDBContext").Value))
            {
                using (MySqlCommand cmd = new MySqlCommand("getAllWhoGotItRecommendationsByUserId", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@UserId", id);
                    con.Open();
                    MySqlDataReader dr = cmd.ExecuteReader();
                    while (dr.Read())
                    {
                        recommondations.Add(new Recommendation
                        {
                            Id = dr.GetInt32(0),
                            PostId = dr.GetInt32(1),
                            Review = dr.GetString(2),
                            Rate = dr.GetDouble(3),
                            WhoGaveItId = dr.GetInt32(4),
                            WhoGotItId = dr.GetInt32(5),
                            reviewDate = dr.GetDateTime(6),
                        });
                    }
                }
            }
            return recommondations;
        }






        //get all recommendation by post id 
        [HttpGet("getAllRecommendationsBypostId/{id}")]
        public async Task<ActionResult<List<Recommendation>>> GetAllRecommendationsBypostId(int id)
        {
            return await GetAllRecommendationsBypostIdDb(id);
        }


        async Task<List<Recommendation>> GetAllRecommendationsBypostIdDb(int id)
        {
            List<Recommendation> recommondations = new List<Recommendation>();
            await using (MySqlConnection con = new MySqlConnection(_configuration.GetSection("ConnectionStrings:GoGoodDBContext").Value))
            {
                using (MySqlCommand cmd = new MySqlCommand("getAllRecommendationsBypostId", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@postId", id);
                    con.Open();
                    MySqlDataReader dr = cmd.ExecuteReader();
                    while (dr.Read())
                    {
                        recommondations.Add(new Recommendation
                        {
                            Id = dr.GetInt32(0),
                            PostId = dr.GetInt32(1),
                            Review = dr.GetString(2),
                            Rate = dr.GetDouble(3),
                            WhoGaveItId = dr.GetInt32(4),
                            WhoGotItId = dr.GetInt32(5),
                            reviewDate = dr.GetDateTime(6),
                        });
                    }
                }
            }
            return recommondations;
        }


        //get recommendation avg on user        
        [HttpGet("getUserAvgRateByUserId/{id}")]
        public async Task<ActionResult<double>> GetUserAvgRateByUserId(int id)
        {
            return await GetUserAvgRateByUserIdIdFromDb(id);
        }
        async Task<double> GetUserAvgRateByUserIdIdFromDb(int id)
        {
            double avg = 0;
            await using (MySqlConnection con = new MySqlConnection(_configuration.GetSection("ConnectionStrings:GoGoodDBContext").Value))
            {
                using (MySqlCommand cmd = new MySqlCommand("getUserAvgRateByUserId", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@userId", id);
                    con.Open();
                    MySqlDataReader dr = cmd.ExecuteReader();
                    while (dr.Read())
                    {
                        avg = dr.GetDouble(0);
                    }
                }
            }
            return avg;
        }







        //get recommendation avg ( not in use any more !! ) 
        // GET: api/getAvgRateByGivingHelpId/5
        //[HttpGet("getAvgRateByGivingHelpId/{id}")]
        //public async Task<ActionResult<double>> GetAvgRateByGivingHelpId(int id)
        //{
        //    return await GetAvgRateByGivingHelpIdFromDb(id) ;
        //}
        //async Task<double>   GetAvgRateByGivingHelpIdFromDb(int id){
        //    double avg = 0;
        //    await using(MySqlConnection con = new MySqlConnection(_configuration.GetSection("ConnectionStrings:GoGoodDBContext").Value)){
        //        using(MySqlCommand cmd = new MySqlCommand("getAvgRateByGivingHelpId",con)){
        //         cmd.CommandType= CommandType.StoredProcedure;
        //         cmd.Parameters.AddWithValue("@idGivingHelpId",id);
        //         con.Open();
        //         MySqlDataReader dr = cmd.ExecuteReader();
        //         while(dr.Read()){
        //            avg = dr.GetDouble(0);
        //        }
        //      }
        //    }
        //     return avg;
        //  }


        // PUT: api/Recommendations/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRecommendation(int id, Recommendation recommendation)
        {
            if (id != recommendation.Id)
            {
                return BadRequest();
            }

            _context.Entry(recommendation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RecommendationExists(id))
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

        // POST: api/Recommendations
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Recommendation>> PostRecommendation(Recommendation recommendation)
        {
            PushNotificationMessages pushMessage = new PushNotificationMessages();
            string fcmToken = "";
            _context.Recommendations.Add(recommendation);
            await _context.SaveChangesAsync();
            pushMessage = await _ifireBaseService.GetPushNotificationMessage(5);
            fcmToken = await _ifireBaseService.GetFcmTokenByUserId((int)recommendation.WhoGotItId);
            await _ifireBaseService.SendNotificationSingle(fcmToken, pushMessage.Title, pushMessage.Body, new Post(), "Reviews", recommendation.WhoGotItId.ToString());
            return CreatedAtAction("GetRecommendation", new { id = recommendation.Id }, recommendation);
        }

        // DELETE: api/Recommendations/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRecommendation(int id)
        {
            var recommendation = await _context.Recommendations.FindAsync(id);
            if (recommendation == null)
            {
                return NotFound();
            }

            _context.Recommendations.Remove(recommendation);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RecommendationExists(int id)
        {
            return _context.Recommendations.Any(e => e.Id == id);
        }
    }
}
