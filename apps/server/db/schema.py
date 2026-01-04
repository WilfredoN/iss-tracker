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
from sqlalchemy.orm import Mapped, declarative_base, mapped_column, relationship

Base = declarative_base()

user_satellites = Table(
    "user_satellites",
    Base.metadata,
    Column("user_id", Integer, ForeignKey("users.id"), primary_key=True),
    Column("satellite_id", Integer, ForeignKey("satellites.id"), primary_key=True),
)


class User(Base):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    telegram_id: Mapped[int] = mapped_column(
        BigInteger, unique=True, nullable=True, index=True
    )
    latitude: Mapped[float] = mapped_column(Float, nullable=False)
    longitude: Mapped[float] = mapped_column(Float, nullable=False)
    satellites: Mapped[list["Satellite"]] = relationship(
        "Satellite", secondary=user_satellites, back_populates="users"
    )


class Satellite(Base):
    __tablename__ = "satellites"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(128), nullable=False, unique=True)
    tle_1: Mapped[str] = mapped_column(Text, nullable=False)
    tle_2: Mapped[str] = mapped_column(Text, nullable=False)
    added_at: Mapped[str] = mapped_column(
        DateTime, nullable=False, server_default=func.now()
    )
    users: Mapped[list["User"]] = relationship(
        "User", secondary=user_satellites, back_populates="satellites"
    )
