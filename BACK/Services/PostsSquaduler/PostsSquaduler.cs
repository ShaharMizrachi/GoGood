using System;
using System.Threading;
using System.Threading.Tasks;

namespace GoGoodServer.Services.PostsSquaduler
{
    public class PostsSquaduler : IDisposable
    {
        private readonly Timer _timer;
        private readonly int _intervalInMilliseconds = 2000;
        private bool _isDisposed = false;

        public PostsSquaduler()
        {
            _timer = new Timer(TimerCallback, null, 0, _intervalInMilliseconds);
        }

        private void TimerCallback(object state)
        {
            Console.WriteLine("Scheduled task executed every 2 seconds: " + DateTime.UtcNow);
        }

        public void Dispose()
        {
            if (!_isDisposed)
            {
                _timer.Dispose();
                _isDisposed = true;
            }
        }
    }
}
