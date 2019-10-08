using System.ComponentModel.DataAnnotations;

namespace TuDou.Grace.Localization.Dto
{
    public class CreateOrUpdateLanguageInput
    {
        [Required]
        public ApplicationLanguageEditDto Language { get; set; }
    }
}