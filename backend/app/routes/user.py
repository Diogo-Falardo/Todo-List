from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
# db, security
from app.application.security import validate_auth_token
from app.application.db import db
# controller
from app.controllers import user_controller
# profile
from app.models.schemas.profile_schema import profileBasePlus


router = APIRouter(prefix="/user", tags=["user"])

# profile

@router.patch("/create-profile", response_model=profileBasePlus, name="createProfile")
def create_profile(
    payload: profileBasePlus,
    user_id = Depends(validate_auth_token),
    db: Session = Depends(db)
): 
    dumped_payload = payload.model_dump(exclude_unset=True)
    return user_controller.profile(dumped_payload, user_id, db)