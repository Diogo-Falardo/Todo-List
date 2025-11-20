from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
# models and schemas
from .auth_model import Auth
from .auth_schema import authBasePlus
# utils: exceptions
from app.utils.exceptions import THROW_ERROR

def aUser(auth_UID: int, db: Session):
    user = db.query(Auth).filter(Auth.id == auth_UID).first()
    if not user:
        THROW_ERROR("Invalid user for authentication!", 400)
    
    return user

def aEmail(auth_email: str, db: Session):
    user = db.query(Auth).filter(Auth.email == auth_email).first()
    if user: return user
    else: return False

def aRole(auth_UID: int, db: Session):
    user = db.query(Auth).filter(Auth.id == auth_UID).first()
    if user.roles != "admin":
        THROW_ERROR("Not enought access!", 404)
    else: return True

# inserts
def ins_UserAuth(user: authBasePlus, db: Session):
    try:
        new_UserAuth = Auth(
            email = user.email,
            hashed_password = user.password
        )

        db.add(new_UserAuth)
        db.commit()
        db.refresh(new_UserAuth)

        return new_UserAuth
    except SQLAlchemyError:
        db.rollback()
        raise THROW_ERROR("Some error occurer!")
    

