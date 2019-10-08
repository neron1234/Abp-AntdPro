using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace TuDou.Grace.Web.Url
{
    public static class UrlChecker
    {
        private static readonly Regex UrlWithProtocolRegex = new Regex("^.{1,10}://.*$");

        public static bool IsRooted(string url)
        {
            return url.StartsWith("/") || UrlChecker.UrlWithProtocolRegex.IsMatch(url);
        }
    }
}
