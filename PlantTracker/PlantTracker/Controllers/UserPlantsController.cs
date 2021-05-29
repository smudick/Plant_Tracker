using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PlantTracker.Data;
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
    }
}
