from pydantic import BaseModel

class PopulationBase(BaseModel):
    count: int
    growth_rate: float

class PopulationCreate(PopulationBase):
    pass

class PopulationResponse(PopulationBase):
    id: int

    class Config:
        orm_mode = True

class BuildingBase(BaseModel):
    name: str
    type: str

class BuildingCreate(BuildingBase):
    pass

class BuildingResponse(BuildingBase):
    id: int

    class Config:
        orm_mode = True

