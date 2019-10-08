using Microsoft.Extensions.Configuration;

namespace TuDou.Grace.Configuration
{
    public interface IAppConfigurationAccessor
    {
        IConfigurationRoot Configuration { get; }
    }
}
