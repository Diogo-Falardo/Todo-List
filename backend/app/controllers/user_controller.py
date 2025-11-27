from sqlalchemy.orm import Session
from typing import Optional
# excepitons
from app.utils.exceptions import THROW_ERROR
# service
from app.services import user_service
# profile
from app.models.schemas.profile_schema import Plan

def profile(payload: dict, user_id: int, db:Session):

    profile = user_service.has_profile(user_id, db)
    if profile is False:
        return user_service.insProfile(payload, user_id, db)

    return user_service.patchProfile(payload, user_id,db)

    

    
    
