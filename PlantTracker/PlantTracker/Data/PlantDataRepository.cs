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

        public PlantData GetPlantById(int id)
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = @"SELECT * 
                        FROM Plant_Data
                            WHERE Plant_Data.Id = @id";
            return db.QueryFirstOrDefault<PlantData>(sql, new { id = id });
        }

        public List<PlantData> GetAllPlantsForSingleUser(int id)
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = @"SELECT pd.*
                        FROM Plant_Data pd
                            JOIN User_Plants up
                                ON up.Plant_Id = pd.id
                            JOIN [User] u
                                ON u.id = up.User_Id
                            WHERE up.User_Id = @id";
            return db.Query<PlantData>(sql, new { id = id }).ToList();
        }
    }
}
