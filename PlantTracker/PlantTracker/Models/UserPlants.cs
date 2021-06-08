using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlantTracker.Models
{
    public class UserPlants
    {
        public int Id { get; set; }
        public int User_Id { get; set; }
        public int Plant_Id { get; set; }
        public DateTime Last_Watered_Date { get; set; }
        public DateTime Next_Watered_Date { get; set; }
        public string Notes { get; set; }
        public int User_Water_Time { get; set; }
    }
}
