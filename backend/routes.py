from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import Population as PopulationModel, Building as BuildingModel
from schemas import PopulationResponse, PopulationCreate, BuildingCreate, BuildingResponse

router = APIRouter()


# Population routes
@router.get("/population", response_model=PopulationResponse)
async def get_population(db: Session = Depends(get_db)):
    population = db.query(PopulationModel).first()
    return population

@router.get("/population/{population_id}", response_model=PopulationResponse)
async def get_population(population_id: int, db: Session = Depends(get_db)):
    population = db.query(PopulationModel).filter(PopulationModel.id == population_id).first()
    return population

@router.post("/population", response_model=PopulationResponse)
async def create_population(population: PopulationCreate, db: Session = Depends(get_db)):
    # Create a new population instance using Pydantic data
    new_population = PopulationModel(count=population.count, growth_rate=population.growth_rate)
    db.add(new_population)
    db.commit()
    db.refresh(new_population)
    return new_population

# Building routes
@router.get("/buildings", response_model=list[BuildingResponse])
async def get_buildings(db: Session = Depends(get_db)):
    buildings = db.query(BuildingModel).all()
    return buildings

@router.get("/buildings/{building_id}", response_model=BuildingResponse)
async def get_building(building_id: int, db: Session = Depends(get_db)):
    building = db.query(BuildingModel).filter(BuildingModel.id == building_id).first()
    return building

@router.post("/buildings", response_model=BuildingResponse)
async def create_building(building: BuildingCreate, db: Session = Depends(get_db)):
    new_building = BuildingModel(name=building.name, type=building.type)
    db.add(new_building)
    db.commit()
    db.refresh(new_building)
    return new_building
