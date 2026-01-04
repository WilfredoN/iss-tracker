from pydantic import BaseModel


class SatelliteCreate(BaseModel):
    name: str
    tle_1: str
    tle_2: str
    user_telegram_id: int


class UserBase(BaseModel):
    telegram_id: int
    latitude: float
    longitude: float
