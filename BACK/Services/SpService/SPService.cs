using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GoGoodServer.Models;
using MySql.Data.MySqlClient;
using Microsoft.Data.SqlClient;
using System.Data;
using GoGoodServer.Controllers.DataContainers;
using System.Net.Http.Headers;
using Microsoft.AspNetCore.Authorization;
using Amazon;
using Amazon.S3;
using Amazon.S3.Transfer;
using Amazon.Runtime;
using Amazon.S3.Model;
using GoGoodServer.Services.AwsSettings;
using Microsoft.Extensions.Options;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Linq.Expressions;
using GoGoodServer.Services.FirebaseService;
using GoGoodServer.Migrations;
using Dapper;

namespace GoGoodServer.Services.SpService
{
    public class SPService: ISpService
    {

        private readonly GoGoodDBContext _context;
        private readonly IConfiguration _configuration;

        public SPService(GoGoodDBContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }


        // need to work on it in case returning single object
        public async Task<T> ActivateSpSingleAnswer<T>(string storedProcedureName, DynamicParameters parameters = null) where T : class
        {
            try
            {
                await using (MySqlConnection con = new MySqlConnection(_configuration.GetSection("ConnectionStrings:GoGoodDBContext").Value))
                {
                    await con.OpenAsync();

                    var result = await con.QueryFirstOrDefaultAsync<T>(storedProcedureName, parameters, commandType: CommandType.StoredProcedure);

                    return result;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine($"An error occurred: {e.Message}");
                return null;
            }
        }




        public async Task<IEnumerable<T>> ActivateSp<T>(string storedProcedureName, DynamicParameters parameters = null) where T : class
        {
            try
            {
                await using (MySqlConnection con = new MySqlConnection(_configuration.GetSection("ConnectionStrings:GoGoodDBContext").Value))
                {
                    await con.OpenAsync();

                    var result = await con.QueryAsync<T>(storedProcedureName, parameters, commandType: CommandType.StoredProcedure);

                    return result;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine($"An error occurred: {e.Message}");
                return null;
            }
        }

    }
}
