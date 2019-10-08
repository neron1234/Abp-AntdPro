using TuDou.Grace.EntityFrameworkCore;

namespace TuDou.Grace.Migrations.Seed.Host
{
    public class InitialHostDbBuilder
    {
        private readonly GraceDbContext _context;

        public InitialHostDbBuilder(GraceDbContext context)
        {
            _context = context;
        }

        public void Create()
        {
            new DefaultEditionCreator(_context).Create();
            new DefaultLanguagesCreator(_context).Create();
            new HostRoleAndUserCreator(_context).Create();
            new DefaultSettingsCreator(_context).Create();

            _context.SaveChanges();
        }
    }
}
