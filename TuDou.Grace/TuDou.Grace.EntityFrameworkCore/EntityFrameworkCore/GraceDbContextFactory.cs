using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using TuDou.Grace.Configuration;
using TuDou.Grace.Web;

namespace TuDou.Grace.EntityFrameworkCore
{
    /* This class is needed to run "dotnet ef ..." commands from command line on development. Not used anywhere else */
    public class GraceDbContextFactory : IDesignTimeDbContextFactory<GraceDbContext>
    {
        public GraceDbContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<GraceDbContext>();
            var configuration = AppConfigurations.Get(WebContentDirectoryFinder.CalculateContentRootFolder(), addUserSecrets: true);

            GraceDbContextConfigurer.Configure(builder, configuration.GetConnectionString(GraceConsts.ConnectionStringName));

            return new GraceDbContext(builder.Options);
        }
    }
}