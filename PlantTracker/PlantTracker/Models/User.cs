using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlantTracker.Models
{
    public class User
    {
        public int Id { get; set; }
        public string First_Name { get; set; }
        public string Last_Name { get; set; }
        public string Profile_Picture { get; set; }
        public DateTime Created_Date { get; set; }
        public string Firebase_Uid { get; set; }
    }
}
