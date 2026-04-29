# =============================================================
# FASTAPI BACKEND — Thiru.Vi.Ka. School Website API
# Deploy on Vercel as serverless function
# =============================================================

from fastapi import FastAPI, HTTPException, Request, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import os
import json
import httpx

app = FastAPI(title="TVK School API", version="1.0.0")

# CORS — Allow frontend origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5500",
        "http://127.0.0.1:5500",
        "http://localhost:8080",
        "https://*.vercel.app",
        "*"  # Remove in production, use specific origins
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Configuration ───
SUPABASE_URL = os.environ.get("SUPABASE_URL", "https://your-project-id.supabase.co")
SUPABASE_SERVICE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY", "your-service-role-key")
SUPABASE_ANON_KEY = os.environ.get("SUPABASE_ANON_KEY", "your-anon-key")

ADMIN_EMAILS = [
    "thiruvika1955@gmail.com"
]

# ─── Pydantic Models ───
class MediaCreate(BaseModel):
    title: str
    description: Optional[str] = ""
    media_url: str
    type: str  # "image" or "video"
    category: str  # "home", "gallery", "alumni", "about", "events"
    featured: Optional[bool] = False

class MediaUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    featured: Optional[bool] = None


# ─── Helper: Verify Supabase JWT ───
async def verify_token(authorization: str = Header(None)):
    """Verify the Supabase JWT token and check admin whitelist."""
    if not authorization:
        raise HTTPException(status_code=401, detail="No authorization header")
    
    token = authorization.replace("Bearer ", "")
    
    # Verify token with Supabase
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"{SUPABASE_URL}/auth/v1/user",
            headers={
                "Authorization": f"Bearer {token}",
                "apikey": SUPABASE_ANON_KEY
            }
        )
    
    if response.status_code != 200:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    user = response.json()
    email = user.get("email", "")
    
    if email.lower() not in [e.lower() for e in ADMIN_EMAILS]:
        raise HTTPException(status_code=403, detail="Not an admin")
    
    return user


# ─── Helper: Supabase DB request ───
async def supabase_request(method: str, endpoint: str, data=None, params=None):
    """Make authenticated request to Supabase REST API."""
    headers = {
        "apikey": SUPABASE_SERVICE_KEY,
        "Authorization": f"Bearer {SUPABASE_SERVICE_KEY}",
        "Content-Type": "application/json",
        "Prefer": "return=representation"
    }
    
    url = f"{SUPABASE_URL}/rest/v1/{endpoint}"
    
    async with httpx.AsyncClient() as client:
        if method == "GET":
            response = await client.get(url, headers=headers, params=params)
        elif method == "POST":
            response = await client.post(url, headers=headers, json=data)
        elif method == "PATCH":
            response = await client.patch(url, headers=headers, json=data, params=params)
        elif method == "DELETE":
            response = await client.delete(url, headers=headers, params=params)
        else:
            raise ValueError(f"Unsupported method: {method}")
    
    if response.status_code >= 400:
        raise HTTPException(
            status_code=response.status_code, 
            detail=f"Supabase error: {response.text}"
        )
    
    try:
        return response.json()
    except Exception:
        return {"status": "ok"}


# ═══════════════════════════════════════════
# API ENDPOINTS
# ═══════════════════════════════════════════

@app.get("/api")
async def root():
    """Health check endpoint."""
    return {
        "status": "ok",
        "message": "TVK School API is running",
        "version": "1.0.0"
    }


@app.get("/api/verify-user")
async def verify_user(authorization: str = Header(None)):
    """Verify if the current user is an authenticated admin."""
    user = await verify_token(authorization)
    return {
        "verified": True,
        "email": user.get("email"),
        "name": user.get("user_metadata", {}).get("full_name", ""),
        "is_admin": True
    }


@app.get("/api/media")
async def get_media(
    category: Optional[str] = None,
    featured: Optional[bool] = None,
    type: Optional[str] = None,
    limit: Optional[int] = 100
):
    """Fetch all media with optional filters. Public endpoint."""
    params = {
        "select": "*",
        "order": "created_at.desc",
        "limit": str(limit)
    }
    
    if category:
        params["category"] = f"eq.{category}"
    if featured is not None:
        params["featured"] = f"eq.{str(featured).lower()}"
    if type:
        params["type"] = f"eq.{type}"
    
    result = await supabase_request("GET", "media", params=params)
    return result


@app.post("/api/upload")
async def upload_media(media: MediaCreate, authorization: str = Header(None)):
    """Save media metadata to database. Requires admin auth."""
    user = await verify_token(authorization)
    
    # Validate type
    if media.type not in ["image", "video"]:
        raise HTTPException(status_code=400, detail="Type must be 'image' or 'video'")
    
    # Validate category
    valid_categories = [
        "home", "about", "events", "achiever",
        "ahm", "teacher", 
        "gallery_event", "gallery_sports", "gallery_academic", "gallery_alumni"
    ]
    if media.category not in valid_categories:
        raise HTTPException(status_code=400, detail=f"Category must be one of: {valid_categories}")
    
    data = {
        "title": media.title,
        "description": media.description or "",
        "media_url": media.media_url,
        "type": media.type,
        "category": media.category,
        "featured": media.featured or False,
        "updated_by": user.get("email", "")
    }
    
    result = await supabase_request("POST", "media", data=data)
    return result


@app.put("/api/update/{media_id}")
async def update_media(media_id: str, media: MediaUpdate, authorization: str = Header(None)):
    """Update media metadata. Requires admin auth."""
    user = await verify_token(authorization)
    
    update_data = {}
    if media.title is not None:
        update_data["title"] = media.title
    if media.description is not None:
        update_data["description"] = media.description
    if media.category is not None:
        valid_categories = [
            "home", "about", "events", "achiever",
            "ahm", "teacher", 
            "gallery_event", "gallery_sports", "gallery_academic", "gallery_alumni"
        ]
        if media.category not in valid_categories:
            raise HTTPException(status_code=400, detail=f"Category must be one of: {valid_categories}")
        update_data["category"] = media.category
    if media.featured is not None:
        update_data["featured"] = media.featured
    
    update_data["updated_by"] = user.get("email", "")
    
    if not update_data:
        raise HTTPException(status_code=400, detail="No fields to update")
    
    params = {"id": f"eq.{media_id}"}
    result = await supabase_request("PATCH", "media", data=update_data, params=params)
    return result


@app.delete("/api/delete/{media_id}")
async def delete_media(media_id: str, authorization: str = Header(None)):
    """Delete media record. Requires admin auth."""
    user = await verify_token(authorization)
    
    # First get the media to find storage path
    params_get = {"id": f"eq.{media_id}", "select": "*"}
    media_list = await supabase_request("GET", "media", params=params_get)
    
    if not media_list:
        raise HTTPException(status_code=404, detail="Media not found")
    
    # Delete from database
    params = {"id": f"eq.{media_id}"}
    await supabase_request("DELETE", "media", params=params)
    
    # Try to delete from storage
    media_item = media_list[0] if isinstance(media_list, list) else media_list
    media_url = media_item.get("media_url", "")
    
    if "/storage/v1/object/public/media/" in media_url:
        try:
            file_path = media_url.split("/storage/v1/object/public/media/")[1]
            async with httpx.AsyncClient() as client:
                await client.delete(
                    f"{SUPABASE_URL}/storage/v1/object/media/{file_path}",
                    headers={
                        "Authorization": f"Bearer {SUPABASE_SERVICE_KEY}",
                        "apikey": SUPABASE_SERVICE_KEY
                    }
                )
        except Exception as e:
            print(f"Warning: Could not delete storage file: {e}")
    
    return {"status": "deleted", "id": media_id}
