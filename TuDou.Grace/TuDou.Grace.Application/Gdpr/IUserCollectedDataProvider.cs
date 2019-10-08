using System.Collections.Generic;
using System.Threading.Tasks;
using Abp;
using TuDou.Grace.Dto;

namespace TuDou.Grace.Gdpr
{
    public interface IUserCollectedDataProvider
    {
        Task<List<FileDto>> GetFiles(UserIdentifier user);
    }
}
