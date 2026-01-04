from sqlalchemy import (
    BigInteger,
    Boolean,
    Column,
    DateTime,
    Float,
    ForeignKey,
    Integer,
    String,
    Text,
    func,
)
from sqlalchemy.orm import declarative_base, relationship

Base = declarative_base()


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    chat_id = Column(BigInteger, unique=True, nullable=True)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())
    satellites = relationship(
        "Satellite", back_populates="user", cascade="all, delete-orphan"
    )


class Satellite(Base):
    __tablename__ = "satellites"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    name = Column(String(128), nullable=False)
    tle_1 = Column(Text, nullable=False)
    tle_2 = Column(Text, nullable=False)
    added_at = Column(DateTime, server_default=func.now())
    user = relationship("User", back_populates="satellites")
