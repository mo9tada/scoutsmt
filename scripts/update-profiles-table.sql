-- Add metadata column to store additional signup information
ALTER TABLE public.profiles 
ADD COLUMN metadata JSONB DEFAULT '{}';

-- Add some additional useful columns
ALTER TABLE public.profiles 
ADD COLUMN address TEXT,
ADD COLUMN parent_guardian_name TEXT,
ADD COLUMN parent_guardian_email TEXT;

-- Create index on metadata for better query performance
CREATE INDEX idx_profiles_metadata ON public.profiles USING GIN (metadata);
