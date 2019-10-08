using System.ComponentModel.DataAnnotations;

namespace TuDou.Grace.Authorization.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}
