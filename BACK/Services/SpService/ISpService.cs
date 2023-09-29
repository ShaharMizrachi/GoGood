using Dapper;

namespace GoGoodServer.Services.SpService
{
    public interface ISpService
    {
        Task<T> ActivateSpSingleAnswer<T>(string storedProcedureName, DynamicParameters parameters = null) where T : class;



        Task<IEnumerable<T>> ActivateSp<T>(string storedProcedureName, DynamicParameters parameters = null) where T : class;
    }
}
