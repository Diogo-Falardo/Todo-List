from pydantic import BaseModel, field_validator, ConfigDict
from typing import Optional
from enum import Enum
# utils: validators
from app.utils import field_V

# profile

class Plan(str, Enum):
    free = "free"
    pro = "pro"

class profileBase(BaseModel):
    username: str

    @field_validator("username", mode="before")
    @classmethod
    def _username(cls, username):
        return field_V.vUsername(username)

class profileBasePlus(profileBase):
    country: str
    plan: Plan

    @field_validator("country", mode="before")
    @classmethod
    def _country(cls, country):
        return field_validator.vString(country, title = "country", maxlen = 35)
    


