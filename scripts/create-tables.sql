-- Users table (extends Supabase auth.users)
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    role TEXT DEFAULT 'member' CHECK (role IN ('admin', 'leader', 'member')),
    troop_id UUID REFERENCES public.troops(id),
    phone TEXT,
    emergency_contact TEXT,
    emergency_phone TEXT,
    date_of_birth DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Troops/Groups table
CREATE TABLE public.troops (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    troop_number TEXT UNIQUE,
    location TEXT,
    meeting_location TEXT,
    meeting_time TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Events table
CREATE TABLE public.events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    event_type TEXT DEFAULT 'meeting' CHECK (event_type IN ('meeting', 'camping', 'service', 'training', 'social', 'fundraising', 'other')),
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE,
    location TEXT,
    address TEXT,
    max_participants INTEGER,
    cost DECIMAL(10,2) DEFAULT 0,
    requirements TEXT,
    what_to_bring TEXT,
    troop_id UUID REFERENCES public.troops(id),
    created_by UUID REFERENCES public.profiles(id),
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'completed', 'draft')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Event Registrations/Attendance
CREATE TABLE public.event_registrations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'registered' CHECK (status IN ('registered', 'attended', 'no_show', 'cancelled')),
    registration_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    notes TEXT,
    UNIQUE(event_id, user_id)
);

-- Merit Badges
CREATE TABLE public.merit_badges (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    requirements TEXT[],
    category TEXT,
    difficulty_level INTEGER CHECK (difficulty_level BETWEEN 1 AND 5),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Merit Badge Progress
CREATE TABLE public.user_merit_badges (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    merit_badge_id UUID REFERENCES public.merit_badges(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'awarded')),
    started_date DATE DEFAULT CURRENT_DATE,
    completed_date DATE,
    awarded_date DATE,
    counselor_id UUID REFERENCES public.profiles(id),
    notes TEXT,
    UNIQUE(user_id, merit_badge_id)
);

-- Merit Badge Requirements Progress
CREATE TABLE public.requirement_progress (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_merit_badge_id UUID REFERENCES public.user_merit_badges(id) ON DELETE CASCADE,
    requirement_number INTEGER NOT NULL,
    requirement_text TEXT,
    completed BOOLEAN DEFAULT FALSE,
    completed_date DATE,
    verified_by UUID REFERENCES public.profiles(id),
    notes TEXT,
    UNIQUE(user_merit_badge_id, requirement_number)
);

-- Ranks/Advancement
CREATE TABLE public.ranks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    requirements TEXT[],
    order_sequence INTEGER UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Rank Progress
CREATE TABLE public.user_ranks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    rank_id UUID REFERENCES public.ranks(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'awarded')),
    started_date DATE DEFAULT CURRENT_DATE,
    completed_date DATE,
    awarded_date DATE,
    board_of_review_date DATE,
    notes TEXT,
    UNIQUE(user_id, rank_id)
);

-- Service Hours
CREATE TABLE public.service_hours (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    event_id UUID REFERENCES public.events(id),
    project_name TEXT NOT NULL,
    description TEXT,
    hours DECIMAL(4,2) NOT NULL CHECK (hours > 0),
    service_date DATE NOT NULL,
    organization TEXT,
    verified_by UUID REFERENCES public.profiles(id),
    verified_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_events_start_date ON public.events(start_date);
CREATE INDEX idx_events_troop_id ON public.events(troop_id);
CREATE INDEX idx_event_registrations_event_id ON public.event_registrations(event_id);
CREATE INDEX idx_event_registrations_user_id ON public.event_registrations(user_id);
CREATE INDEX idx_profiles_troop_id ON public.profiles(troop_id);
CREATE INDEX idx_user_merit_badges_user_id ON public.user_merit_badges(user_id);
CREATE INDEX idx_service_hours_user_id ON public.service_hours(user_id);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.troops ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.merit_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_merit_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.requirement_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ranks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_ranks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_hours ENABLE ROW LEVEL SECURITY;
