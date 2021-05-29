using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PlantTracker.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlantTracker.Controllers
{
    [Route("api/Plants")]
    [ApiController]
    public class PlantDataController : ControllerBase
    {
        PlantDataRepository _repo;

        public PlantDataController(PlantDataRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public IActionResult GetAllPlants()
        {
            return Ok(_repo.GetAllPlants());
        }
    }
}
