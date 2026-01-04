from db.database import SessionLocal
from db.schema import Satellite as SatelliteModel
from db.schema import User as UserModel
from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from schemas import SatelliteCreate, UserBase
from sqlalchemy.orm import Session

app = FastAPI(title="Satellite Tracker API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
async def root():
    return {"status": "for all mankind"}


@app.post("/users")
async def create_or_update_user(user: UserBase, db: Session = Depends(get_db)):
    db_user = (
        db.query(UserModel).filter(UserModel.telegram_id == user.telegram_id).first()
    )
    if db_user:
        db_user.latitude = user.latitude
        db_user.longitude = user.longitude
    else:
        db_user = UserModel(
            telegram_id=user.telegram_id,
            latitude=user.latitude,
            longitude=user.longitude,
        )
        db.add(db_user)
    db.commit()
    return {"message": f"User {user.telegram_id} created or updated"}


@app.post("/satellites/add")
async def add_satellite(satellite: SatelliteCreate, db: Session = Depends(get_db)):
    user = (
        db.query(UserModel)
        .filter(UserModel.telegram_id == satellite.user_telegram_id)
        .first()
    )
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    db_satellite = (
        db.query(SatelliteModel)
        .filter(
            SatelliteModel.name == satellite.name,
        )
        .first()
    )
    if not db_satellite:
        db_satellite = SatelliteModel(
            name=satellite.name, tle_1=satellite.tle_1, tle_2=satellite.tle_2
        )
        db.add(db_satellite)
        db.flush()

    if db_satellite not in user.satellites:
        user.satellites.append(db_satellite)
        db.commit()
        db.refresh(user)
        return {
            "message": f"Satellite {satellite.name} added with ID {db_satellite.id}"
        }

    raise HTTPException(status_code=409, detail="Satellite already exists")


@app.get("/satellites/{telegram_id}")
async def get_user_satellites(telegram_id: int, db: Session = Depends(get_db)):
    user = db.query(UserModel).filter(UserModel.telegram_id == telegram_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    satellites = user.satellites
    return {"satellites": satellites}
