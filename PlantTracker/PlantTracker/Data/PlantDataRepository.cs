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
                        FROM Plant_Data
                        WHERE User_Id = 0";
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
        public List<PlantData> Search(string term)
        {
            var sql = @"SELECT *
                        FROM Plant_Data
                        WHERE (Common_Name like '%' + @searchTerm + '%'
	                          OR
	                          Scientific_Name like '%' + @searchTerm + '%')
                              AND
                              User_Id = 0";

            using var db = new SqlConnection(ConnectionString);

            return db.Query<PlantData>(sql, new { searchTerm = term }).ToList();
        }
        public void AddCustomPlant(PlantData plant)
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = @"INSERT INTO [dbo].[Plant_Data]
                            ([Scientific_Name]
                            ,[Common_Name]
                            ,[Shade]
                            ,[Moisture_Use]
                            ,[Soil_Watering_Indicator]
                            ,[Max_Width]
                            ,[Toxic_Dogs]
                            ,[Toxic_Cats]
                            ,[Type]
                            ,[Flowering]
                            ,[Hanging]
                            ,[Air_Purifying]
                            ,[Max_Height]
                            ,[Ph_Soil]
                            ,[Bloom]
                            ,[Watering_Interval]
                            ,[User_Id]
                            ,[Image_Url])
                        VALUES                 
                            (@Scientific_Name
                            ,@Common_Name
                            ,@Shade
                            ,@Moisture_Use
                            ,@Soil_Watering_Indicator
                            ,@Max_Width
                            ,@Toxic_Dogs
                            ,@Toxic_Cats
                            ,@Type
                            ,@Flowering
                            ,@Hanging
                            ,@Air_Purifying
                            ,@Max_Height
                            ,@Ph_Soil
                            ,@Bloom
                            ,@Watering_Interval
                            ,@User_Id
                            ,@Image_Url)";
            var id = db.ExecuteScalar<int>(sql, plant);
            plant.Id = id;
        }
        public PlantData GetMostRecentCustomPlant(int userId)
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = $@"SELECT TOP 1 * FROM Plant_Data pd
                          WHERE pd.User_Id = @userId
                            ORDER BY pd.id DESC";
            return db.QueryFirstOrDefault<PlantData>(sql, new { userId = userId });
        }
    }
}
