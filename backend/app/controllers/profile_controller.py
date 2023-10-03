from ..models.Profile import Profile

def get_profile_by_user(username):
  profile = Profile.query.filter_by(member_username=username).first()
  return profile

def update_profile_by_user(username, data):
  profile = Profile.query.filter_by(member_username=username).first()
  if profile:
    profile.update(data)  
    return "Profile updated successfully"
  else: 
    return "Profile not found"