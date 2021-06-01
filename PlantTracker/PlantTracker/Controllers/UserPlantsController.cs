using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PlantTracker.Data;
using PlantTracker.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlantTracker.Controllers
{
    [Route("api/user-plants")]
    [ApiController]
    public class UserPlantsController : ControllerBase
    {
        UserPlantsRepository _repo;

        public UserPlantsController(UserPlantsRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public IActionResult GetAllUserPlants()
        {
            return Ok(_repo.GetAllUserPlants());
        }
        [HttpGet("{id}")]
        public IActionResult GetUserPlantById(int id)
        {
            return Ok(_repo.GetUserPlantById(id));
        }
        [HttpPost]
        public IActionResult AddPlant(UserPlants userPlants)
        {
            _repo.AddPlantToUser(userPlants);
            return Created($"api/UserPlants/{userPlants.Id}", userPlants);
        }
        [HttpPut("water")]
        public IActionResult WaterPlant(UserPlants userPlant)
        {
            _repo.WaterPlant(userPlant);
            return Created($"api/UserPlants/{userPlant.Id}", userPlant);
        }
        [HttpPut("update")]
        public IActionResult UpdateUserPlant(UserPlants userPlant)
        {
            var existingUserPlant = _repo.GetUserPlantById(userPlant.Id);
            userPlant.Last_Watered_Date = existingUserPlant.Last_Watered_Date;
            _repo.UpdateUserPlant(userPlant);
            return Created($"api/UserPlants/{userPlant.Id}", userPlant);
        }
        [HttpDelete("delete/{id}")]
        public IActionResult DeleteUserPlant(int id)
        {
            _repo.DeleteUserPlant(id);
            return Ok();
        }
    }
}
