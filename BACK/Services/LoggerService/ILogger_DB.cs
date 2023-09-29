using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoGoodServer.Services.LoggerService
{
    public interface ILogger_DB
    {
        Task addLog(int type, string description, string? stackTrace, string? logLevel);
    }
}