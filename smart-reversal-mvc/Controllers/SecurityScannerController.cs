using Microsoft.AspNetCore.Mvc;
using SmartRevwinMVC.Models;
using SmartRevwinMVC.Services;

namespace SmartRevwinMVC.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SecurityScannerController : ControllerBase
    {
        private readonly ISecurityScannerService _scannerService;

        public SecurityScannerController(ISecurityScannerService scannerService)
        {
            _scannerService = scannerService;
        }

        [HttpPost("scan")]
        public async Task<IActionResult> Scan([FromBody] ScanRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.IdNumber))
            {
                return Ok(new { success = false, message = "رقم الهوية مطلوب" });
            }

            if (request.IdNumber.Length < 10)
            {
                return Ok(new { success = false, message = "رقم الهوية يجب أن يكون 10 أرقام على الأقل" });
            }

            try
            {
                var result = await _scannerService.ScanIdentityAsync(request.IdNumber);
                return Ok(new { success = true, data = result });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "حدث خطأ أثناء المسح", error = ex.Message });
            }
        }

        [HttpGet("test-data")]
        public IActionResult GetTestData()
        {
            var testData = new[]
            {
                new { id = "1234567890", label = "موثوق (95%)" },
                new { id = "9876543210", label = "محذر (72%)" },
                new { id = "5555555555", label = "عالية (45%)" },
                new { id = "1111111111", label = "حرجة (20%)" },
                new { id = "3333333333", label = "موثوق (88%)" },
                new { id = "7777777777", label = "عالية (55%)" }
            };

            return Ok(testData);
        }
    }
}
