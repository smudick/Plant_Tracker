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
    public class UserPlantsRepository
    {
        readonly string ConnectionString;
        public UserPlantsRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("PlantTracker");
        }
        public List<UserPlants> GetAllUserPlants()
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = @"SELECT * 
                        FROM User_Plants";
            return db.Query<UserPlants>(sql).ToList();
        }
        public UserPlants GetUserPlantById(int id)
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = @"SELECT * 
                        FROM User_Plants
                        WHERE User_Plants.Id = @id";
            return db.QueryFirstOrDefault<UserPlants>(sql, new { id = id });
        }
        public List<UserPlants> GetUserPlantsByUserId(int userId)
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = @"SELECT * 
                        FROM User_Plants
                        WHERE User_Plants.User_Id = @userId
                        ORDER BY User_Plants.Next_Watered_Date asc";
            return db.Query<UserPlants>(sql, new { userId = userId }).ToList();
        }
        public List<UserPlants> GetUserPlantByNextWaterDate(DateTime next_Watered_Date)
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = @"SELECT * 
                        FROM User_Plants
                        WHERE User_Plants.Next_Watered_Date = @next_Watered_Date";
            return db.Query<UserPlants>(sql, new { next_Watered_Date = next_Watered_Date }).ToList();
        }
        public void AddPlantToUser(UserPlants userPlants)
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = @"INSERT INTO [dbo].[User_Plants]
                            ([User_Id]
                            ,[Plant_Id]
                            ,[Notes]
                            ,[User_Water_Time])
                       VALUES                 
                            (@User_Id
                            ,@Plant_Id
                            ,@Notes
                            ,@User_Water_Time)";
            var id = db.ExecuteScalar<int>(sql, userPlants);
            userPlants.Id = id;
        }
        public void WaterPlant(UserPlants userPlant)
        {
            using var db = new SqlConnection(ConnectionString);
            var id = userPlant.Id;
            var Last_Watered_Date = DateTime.Now;
            userPlant.Last_Watered_Date = Last_Watered_Date;
            var Next_Watered_Date = Last_Watered_Date.AddDays(userPlant.User_Water_Time);
            userPlant.Next_Watered_Date = Next_Watered_Date;
            var sql = @"UPDATE [dbo].[User_Plants]
                            SET
                                [Last_Watered_Date] = @Last_Watered_Date,
                                [Next_Watered_Date] = @Next_Watered_Date
                            WHERE [User_Plants].id = @id";
            db.Execute(sql, userPlant);
        }
        public void UpdateUserPlant(UserPlants userPlant)
        {
            using var db = new SqlConnection(ConnectionString);
            var id = userPlant.Id;
            var Notes = userPlant.Notes;
            var User_Water_Time = userPlant.User_Water_Time;
            var Next_Watered_Date = userPlant.Next_Watered_Date;
            var sql = @"UPDATE [dbo].[User_Plants]
                            SET
                                [Notes] = @Notes,
		                        [User_Water_Time] = @User_Water_Time,
                                [Next_Watered_Date] = @Next_Watered_Date
                            WHERE [User_Plants].id = @id";
            db.Execute(sql, userPlant);
        }
        public void DeleteUserPlant(int id)
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = @"DELETE FROM [dbo].[User_Plants]
                            WHERE [User_Plants].Id = @id";
            db.Execute(sql, new { id = id });
        }
    }
}
