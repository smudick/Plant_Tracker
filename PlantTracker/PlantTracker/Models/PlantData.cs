using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlantTracker.Models
{
    public class PlantData
    {
        public int Id { get; set; }
        public string Scientific_Name { get; set; }
        public string Common_Name { get; set; }
        public int Shade { get; set; }
        public int Moisture_Use { get; set; }
        public int Soil_Watering_Indicator { get; set; }
        public int Max_Width { get; set; }
        public bool Toxic_Dogs { get; set; }
        public bool Toxic_Cats { get; set; }
        public int Type { get; set; }
        public bool Flowering { get; set; }
        public bool Hanging { get; set; }
        public bool Air_Purifying { get; set; }
        public int Max_Height { get; set; }
        public string Ph_Soil { get; set; }
        public string Bloom { get; set; }
        public int Watering_Interval { get; set; }
        public int User_Id { get; set; }
    }
}
