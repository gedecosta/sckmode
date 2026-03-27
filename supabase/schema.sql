-- 1. Profiles & Follows
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  location TEXT,
  level INT DEFAULT 1,
  xp INT DEFAULT 0,
  is_pro BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE follows (
  follower_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  following_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (follower_id, following_id)
);

-- 2. Activities & Tracking
CREATE TABLE activities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT,
  sport_type TEXT NOT NULL,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ,
  duration_seconds INT NOT NULL,
  distance_meters FLOAT,
  avg_heart_rate INT,
  max_heart_rate INT,
  calories INT,
  map_polyline TEXT,
  is_public BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Store high frequency GPS/HR pings inside partitioned or dedicated table
CREATE TABLE activity_points (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  activity_id UUID REFERENCES activities(id) ON DELETE CASCADE,
  lat FLOAT NOT NULL,
  lng FLOAT NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL,
  heart_rate INT,
  speed_ms FLOAT,
  altitude FLOAT
);

-- 3. Social Feed (Posts, Comments, Likes)
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  activity_id UUID REFERENCES activities(id) ON DELETE SET NULL,
  content TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Separate media storage referencing Storage Bucket
CREATE TABLE post_media (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  media_url TEXT NOT NULL,
  media_type TEXT CHECK (media_type IN ('image', 'video')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE likes (
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (post_id, user_id)
);

CREATE TABLE comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Challenges System
CREATE TABLE challenges (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  creator_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  difficulty TEXT, -- Easy, Medium, Hard
  is_official BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE challenge_steps (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  challenge_id UUID REFERENCES challenges(id) ON DELETE CASCADE,
  type TEXT NOT NULL, -- run, pushups, swim
  target_value FLOAT NOT NULL,
  target_unit TEXT NOT NULL,
  step_order INT NOT NULL
);

CREATE TABLE challenge_completions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  challenge_id UUID REFERENCES challenges(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  total_time_seconds INT -- for leaderboard
);

-- 5. Subscriptions & Earnings (Substack like)
CREATE TABLE subscription_plans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  creator_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  price_brl DECIMAL(10, 2) NOT NULL,
  features TEXT[],
  active BOOLEAN DEFAULT TRUE
);

CREATE TABLE subscriptions (
  subscriber_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  creator_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  plan_id UUID REFERENCES subscription_plans(id),
  status TEXT NOT NULL, -- active, canceled
  current_period_end TIMESTAMPTZ,
  PRIMARY KEY (subscriber_id, creator_id)
);

-- 6. Badges & Gamification
CREATE TABLE badges (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  condition_query TEXT -- Metadata to evaluate awards
);

CREATE TABLE user_badges (
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  badge_id UUID REFERENCES badges(id) ON DELETE CASCADE,
  awarded_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, badge_id)
);

-- RLS POLICIES --

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- 1. Profiles
CREATE POLICY "Public profiles are visible to everyone" 
  ON profiles FOR SELECT USING (true);

CREATE POLICY "Users can edit their own profile" 
  ON profiles FOR UPDATE USING (auth.uid() = id);

-- 2. Activities
CREATE POLICY "Public activities are visible to everyone" 
  ON activities FOR SELECT USING (is_public = true);

CREATE POLICY "Users can see all their own activities" 
  ON activities FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own activities" 
  ON activities FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own activities" 
  ON activities FOR DELETE USING (auth.uid() = user_id);

-- 3. Posts
CREATE POLICY "Posts from public accounts are visible" 
  ON posts FOR SELECT USING (true); -- Requires join check logic in reality

CREATE POLICY "Users can create posts" 
  ON posts FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Automatic Profile Creation via Trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name, avatar_url)
  VALUES (
    new.id, 
    LOWER(REGEXP_REPLACE(new.raw_user_meta_data->>'full_name', '\s+', '', 'g')) || floor(random() * 1000)::text,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
