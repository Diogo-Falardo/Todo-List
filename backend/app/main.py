from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# system
from app.application.system import settings

app = FastAPI(title=settings.APP_NAME)

""
# [DO NOT FORGET TO UPDATE THIS ON PRODUCTION]
""

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# auth
from app.auth.auth import router as auth_router
app.include_router(auth_router)
