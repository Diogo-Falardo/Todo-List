from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
# utils: excepitions
from app.utils.exceptions import THROW_ERROR
# profile
from app.models.profile_model import Profile
from app.models.schemas.profile_schema import Plan

# check

def has_profile(user_id: int, db: Session):
    profile = db.query(Profile).filter(Profile.user_id == user_id).first()
    if not profile:
        return False
    
    return profile

# inserts

def insProfile(profile: dict, user_id: int, db: Session):

    try:
        new_profile = Profile(
            user_id = user_id,
            username = profile["username"],
            country = profile.get("country"),
            plan = Plan.free
        )

        db.add(new_profile)
        db.commit()
        db.refresh(new_profile)

        return new_profile
    except SQLAlchemyError:
        db.rollback()
        THROW_ERROR("Error while creating profile...", 500)

def patchProfile(payload: dict, user_id: int, db: Session):
    
    profile = has_profile(user_id, db)

    try:
        if "username" in payload:
            if payload["username"] == profile.username:
                pass
            else:
                Profile.username = payload["username"]
        if "country" in payload:
            Profile.country = payload["country"]
    except SQLAlchemyError:
        db.rollback()
        THROW_ERROR("Error while updating profile...", 500)