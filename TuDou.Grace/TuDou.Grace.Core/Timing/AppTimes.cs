using Abp.Dependency;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TuDou.Grace.Timing
{
    public class AppTimes : ISingletonDependency
    {
        public AppTimes()
        {

        }

        public DateTime StartupTime { get; set; }
    }
}
