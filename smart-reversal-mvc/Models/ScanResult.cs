namespace SmartRevwinMVC.Models
{
    public class ScanResult
    {
        public int TrustScore { get; set; }
        public string RiskLevel { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public ScanDetails Details { get; set; } = new();
    }

    public class ScanDetails
    {
        public bool IdentityVerified { get; set; }
        public bool RecordsMatch { get; set; }
        public int FlagCount { get; set; }
        public string LastUpdate { get; set; } = string.Empty;
    }

    public class ScanRequest
    {
        public string IdNumber { get; set; } = string.Empty;
    }
}
