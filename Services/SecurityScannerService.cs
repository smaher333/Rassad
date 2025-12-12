using SmartRevwinMVC.Models;

namespace SmartRevwinMVC.Services
{
    public interface ISecurityScannerService
    {
        Task<ScanResult> ScanIdentityAsync(string idNumber);
    }

    public class SecurityScannerService : ISecurityScannerService
    {
        private readonly Dictionary<string, ScanResult> _testDataMap = new()
        {
            {
                "1234567890", new ScanResult
                {
                    TrustScore = 95,
                    RiskLevel = "منخفضة",
                    Status = "موثوق",
                    Details = new ScanDetails
                    {
                        IdentityVerified = true,
                        RecordsMatch = true,
                        FlagCount = 0,
                        LastUpdate = "2025-12-11"
                    }
                }
            },
            {
                "9876543210", new ScanResult
                {
                    TrustScore = 72,
                    RiskLevel = "متوسطة",
                    Status = "محذر",
                    Details = new ScanDetails
                    {
                        IdentityVerified = true,
                        RecordsMatch = true,
                        FlagCount = 1,
                        LastUpdate = "2025-12-10"
                    }
                }
            },
            {
                "5555555555", new ScanResult
                {
                    TrustScore = 45,
                    RiskLevel = "عالية",
                    Status = "محذر",
                    Details = new ScanDetails
                    {
                        IdentityVerified = true,
                        RecordsMatch = false,
                        FlagCount = 2,
                        LastUpdate = "2025-12-09"
                    }
                }
            },
            {
                "1111111111", new ScanResult
                {
                    TrustScore = 20,
                    RiskLevel = "حرجة",
                    Status = "خطر",
                    Details = new ScanDetails
                    {
                        IdentityVerified = false,
                        RecordsMatch = false,
                        FlagCount = 5,
                        LastUpdate = "2025-12-08"
                    }
                }
            },
            {
                "3333333333", new ScanResult
                {
                    TrustScore = 88,
                    RiskLevel = "منخفضة",
                    Status = "موثوق",
                    Details = new ScanDetails
                    {
                        IdentityVerified = true,
                        RecordsMatch = true,
                        FlagCount = 0,
                        LastUpdate = "2025-12-11"
                    }
                }
            },
            {
                "7777777777", new ScanResult
                {
                    TrustScore = 55,
                    RiskLevel = "عالية",
                    Status = "محذر",
                    Details = new ScanDetails
                    {
                        IdentityVerified = true,
                        RecordsMatch = false,
                        FlagCount = 2,
                        LastUpdate = "2025-12-07"
                    }
                }
            }
        };

        public async Task<ScanResult> ScanIdentityAsync(string idNumber)
        {
            await Task.Delay(2000);

            if (_testDataMap.TryGetValue(idNumber, out var result))
            {
                return result;
            }

            return GenerateRandomResult(idNumber);
        }

        private ScanResult GenerateRandomResult(string idNumber)
        {
            var idHash = idNumber.Aggregate(0, (acc, c) => acc + (int)c);
            var trustScore = 40 + (idHash % 60);

            string riskLevel;
            string status;

            if (trustScore >= 80)
            {
                riskLevel = "منخفضة";
                status = "موثوق";
            }
            else if (trustScore >= 60)
            {
                riskLevel = "متوسطة";
                status = "محذر";
            }
            else if (trustScore >= 40)
            {
                riskLevel = "عالية";
                status = "محذر";
            }
            else
            {
                riskLevel = "حرجة";
                status = "خطر";
            }

            return new ScanResult
            {
                TrustScore = trustScore,
                RiskLevel = riskLevel,
                Status = status,
                Details = new ScanDetails
                {
                    IdentityVerified = trustScore > 50,
                    RecordsMatch = trustScore > 45,
                    FlagCount = (100 - trustScore) / 20,
                    LastUpdate = DateTime.Now.ToString("yyyy-MM-dd")
                }
            };
        }
    }
}
