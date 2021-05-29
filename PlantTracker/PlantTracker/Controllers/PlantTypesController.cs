using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PlantTracker.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlantTracker.Controllers
{
    [Route("api/types")]
    [ApiController]
    public class PlantTypesController : ControllerBase
    {
        PlantTypesRepository _repo;

        public PlantTypesController(PlantTypesRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public IActionResult GetAllTypes()
        {
            return Ok(_repo.GetAllTypes());
        }
        [HttpGet("{id}")]
        public IActionResult GetTypeById(int id)
        {
            return Ok(_repo.GetTypeById(id));
        }
    }
}
