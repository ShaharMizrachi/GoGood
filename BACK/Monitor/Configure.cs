using Hangfire;
using Hangfire.MySql.Core;

namespace GoGoodServer.Monitor
{
    public static class Configure
    {
        public static IApplicationBuilder ScheduleTasks(this IApplicationBuilder app)
        {
            RecurringJob.AddOrUpdate<GoGoodServer.Monitor.Tasks.Posts>(
               "process-new-posts-job",
               x => x.ProcessNewPosts(),
              "0 0 * * *");
            return app;
        }
    }
}
