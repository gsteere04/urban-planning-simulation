from sqlalchemy import Column, Integer, String, Float, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

Base = declarative_base()

class Building(Base):
    __tablename__ = 'buildings'
    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    name = Column(String, nullable=False)
    type = Column(String)

class Population(Base):
    __tablename__ = 'population'
    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    count = Column(Integer, nullable=False)
    growth_rate = Column(Float, nullable=False)

DATABASE_URL = "postgresql://postgres:postgres@localhost:5432/urban-planning-simulator-db"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base.metadata.create_all(bind=engine)
