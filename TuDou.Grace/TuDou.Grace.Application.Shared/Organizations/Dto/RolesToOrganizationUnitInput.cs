using System.ComponentModel.DataAnnotations;

namespace TuDou.Grace.Organizations.Dto
{
    public class RolesToOrganizationUnitInput
    {
        public int[] RoleIds { get; set; }

        [Range(1, long.MaxValue)]
        public long OrganizationUnitId { get; set; }
    }
}