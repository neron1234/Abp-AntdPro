using System.Threading.Tasks;

namespace TuDou.Grace.Net.Sms
{
    public interface ISmsSender
    {
        Task SendAsync(string number, string message);
    }
}