using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace TuDou.Grace.EntityFrameworkCore
{
    public static class GraceDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<GraceDbContext> builder, string connectionString)
        {
            builder.UseSqlServer(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<GraceDbContext> builder, DbConnection connection)
        {
            builder.UseSqlServer(connection);
        }
    }
}