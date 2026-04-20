import urllib.request
import json

url = "https://yqsydacjmxxigwpnejyt.supabase.co/rest/v1/media?select=*"
headers = {
    "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlxc3lkYWNqbXh4aWd3cG5lanl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYwMDMwNzEsImV4cCI6MjA5MTU3OTA3MX0.xetPdEXDYX6H6duhY2qejYbaeEpa_e1pI3Ur1-CllLE",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlxc3lkYWNqbXh4aWd3cG5lanl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYwMDMwNzEsImV4cCI6MjA5MTU3OTA3MX0.xetPdEXDYX6H6duhY2qejYbaeEpa_e1pI3Ur1-CllLE"
}

req = urllib.request.Request(url, headers=headers)
try:
    with urllib.request.urlopen(req) as response:
        print(json.dumps(json.loads(response.read()), indent=2))
except Exception as e:
    print("Error:", e)
