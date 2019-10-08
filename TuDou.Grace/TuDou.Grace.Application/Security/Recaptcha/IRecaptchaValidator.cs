using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace TuDou.Grace.Security.Recaptcha
{
    public interface IRecaptchaValidator
    {
        Task ValidateAsync(string captchaResponse);
    }
}
