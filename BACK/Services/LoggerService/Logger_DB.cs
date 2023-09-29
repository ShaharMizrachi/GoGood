using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GoGoodServer.Models;
using Microsoft.Extensions.Logging; 

namespace GoGoodServer.Services.LoggerService
{
    public class Logger_DB : ILogger_DB
    {
        private readonly GoGoodDBContext _goGoodDBContext;

        public Logger_DB(GoGoodDBContext goGoodDBContext)
        {
            _goGoodDBContext = goGoodDBContext;
        }

        public async Task addLog(int type, string description, string? stackTrace, string? logLevel)
        {
            Log log = new Log()
            {
                Type = type,
                Description = description,
                StackTrace = stackTrace,
                LogLevel = logLevel,
            };

            _goGoodDBContext.Log.Add(log);
            await _goGoodDBContext.SaveChangesAsync();
        }
    }

}
