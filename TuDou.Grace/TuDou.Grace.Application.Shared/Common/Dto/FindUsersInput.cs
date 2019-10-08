using TuDou.Grace.Dto;

namespace TuDou.Grace.Common.Dto
{
    public class FindUsersInput : PagedAndFilteredInputDto
    {
        public int? TenantId { get; set; }
    }
}