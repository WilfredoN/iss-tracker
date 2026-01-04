from sqlalchemy import (
    BigInteger,
    Column,
    DateTime,
    Float,
    ForeignKey,
    Integer,
    String,
    Table,
    Text,
    func,
)
from sqlalchemy.orm import declarative_base, relationship

Base = declarative_base()

user_satellites = Table(
    "user_satellites",
    Base.metadata,
    Column("user_id", Integer, ForeignKey("users.id"), primary_key=True),
    Column("satellite_id", Integer, ForeignKey("satellites.id"), primary_Key=True),
)


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    telegram_id = Column(BigInteger, unique=True, nullable=True, index=True)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    satellites = relationship(
        "Satellite", secondary=user_satellites, back_populates="users"
    )


class Satellite(Base):
    __tablename__ = "satellites"
    id = Column(Integer, primary_key=True)
    name = Column(String(128), nullable=False, unique=True)
    tle_1 = Column(Text, nullable=False)
    tle_2 = Column(Text, nullable=False)
    added_at = Column(DateTime, nullable=False, server_default=func.now())
    users = relationship("User", secondary=user_satellites, back_populates="satellites")
