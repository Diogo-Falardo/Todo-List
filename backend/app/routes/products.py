from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from enum import Enum
from typing import Optional, Literal
# db, security
from app.application.security import validate_auth_token
from app.application.db import db
# exceptions
from app.utils.exceptions import THROW_ERROR
# product
from app.models.schemas.product_schema import productBasePlus, productBasePlusUpdate, productOut, productStockBasePlus, productStockOut, Category
from app.controllers import products_controller

router = APIRouter(prefix="/products", tags=["products"])

@router.post("/create-product", response_model=productOut, name="createProduct")
def create_product(
    payload: productBasePlus,
    user_id = Depends(validate_auth_token),
    db: Session = Depends(db)
):
    dumped_payload = payload.model_dump(exclude_unset=True)
    return products_controller.create_new_product(dumped_payload, user_id,db)

@router.post("/update-product", response_model=productOut, name="updateProduct")
def update_product(
    payload: productBasePlusUpdate,
    user_id = Depends(validate_auth_token),
    db: Session = Depends(db)
):
    dumped_payload = payload.model_dump(exclude_unset=True)
    return products_controller.update_product(payload.product_sku,dumped_payload, user_id, db)

@router.get("/product-list", response_model=list[productOut], name="product-list")
def products(
    category: Optional[Category] = Query(
        None,
        description="filter by category"
    ),
    search: Optional[str] = Query(
        None,
        description="Search in name or SKU",
    ),
    order_dir: Literal["asc", "desc"] = Query(
        "asc",
        description="Ascending or descending",
    ),
    # pagination
    limit: int = Query(10,ge=1),
    offset: int = Query(0, ge=0),

    user_id = Depends(validate_auth_token),
    db: Session = Depends(db),
): return products_controller.products(category, search, order_dir, limit, offset, user_id, db)

@router.get("/product", response_model=productOut, name="product")
def product(
    sku: str = Query(None,description="Sku"),
    user_id = Depends(validate_auth_token),
    db: Session = Depends(db),
): return products_controller.product(sku,user_id,db)