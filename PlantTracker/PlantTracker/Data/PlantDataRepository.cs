using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using PlantTracker.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlantTracker.Data
{
    public class PlantDataRepository
    {
        readonly string ConnectionString;
        public PlantDataRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("PlantTracker");
        }
        public List<PlantData> GetAllPlants()
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = @"SELECT * 
                        FROM Plant_Data";
            return db.Query<PlantData>(sql).ToList();
        }
    }
}
