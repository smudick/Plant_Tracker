﻿using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using PlantTracker.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlantTracker.Data
{
    public class UserRepository
    {
        readonly string ConnectionString;
        public UserRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("PlantTracker");
        }
        public List<User> GetAllUsers()
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = @"SELECT * 
                        FROM [User]";
            return db.Query<User>(sql).ToList();
        } 
        public User GetUserById(int id)
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = @"SELECT * 
                        FROM [User]
                        WHERE [User].Id = @id";
            return db.QueryFirstOrDefault<User>(sql, new { id = id });
        }
        public User GetUserByFirebaseUid(int uid)
        {
            using var db = new SqlConnection(ConnectionString);
            var sql = @"SELECT * 
                        FROM [User]
                        WHERE [User].FirebaseUid = @uid";
            return db.QueryFirstOrDefault<User>(sql, new { uid = uid });
        }
    }
}
