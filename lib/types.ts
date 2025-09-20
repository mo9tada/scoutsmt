export interface Event {
  id: string
  title: string
  description: string
  date: string // YYYY-MM-DD format for display
  location: string
  created_at?: string
}

export interface DatabaseEvent {
  id: string
  title: string
  description?: string
  event_type: "meeting" | "camping" | "service" | "training" | "social" | "fundraising" | "other"
  start_date: string // ISO timestamp
  end_date?: string
  location?: string
  address?: string
  max_participants?: number
  cost: number
  requirements?: string
  what_to_bring?: string
  troop_id?: string
  created_by?: string
  status: "active" | "cancelled" | "completed" | "draft"
  created_at: string
  updated_at: string
}

export interface Profile {
  id: string
  user_id: string
  first_name: string
  last_name: string
  phone: string
  date_of_birth: string
  address: string
  emergency_contact_name: string
  emergency_contact_phone: string
  emergency_contact_relationship: string
  previous_scouting_experience: boolean
  interests: string
  availability: string
  troop_id?: string
  created_at: string
  updated_at: string
}

export interface Troop {
  id: string
  name: string
  location: string
  meeting_day: string
  meeting_time: string
  created_at: string
  updated_at: string
}

export interface EventRegistration {
  id: string
  event_id: string
  user_id: string
  status: "registered" | "attended" | "no_show" | "cancelled"
  registration_date: string
  notes?: string
}

export interface MeritBadge {
  id: string
  name: string
  description?: string
  requirements: string[]
  category?: string
  difficulty_level?: number
  created_at: string
}

export interface UserMeritBadge {
  id: string
  user_id: string
  merit_badge_id: string
  status: "in_progress" | "completed" | "awarded"
  started_date: string
  completed_date?: string
  awarded_date?: string
  counselor_id?: string
  notes?: string
}

export interface Rank {
  id: string
  name: string
  description?: string
  requirements: string[]
  order_sequence: number
  created_at: string
}

export interface ServiceHours {
  id: string
  user_id: string
  event_id?: string
  project_name: string
  description?: string
  hours: number
  service_date: string
  organization?: string
  verified_by?: string
  verified_date?: string
  created_at: string
}

export interface AdminSession {
  isAuthenticated: boolean
  expiresAt: number
}

export interface Application {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  date_of_birth: string
  address: string
  emergency_contact_name: string
  emergency_contact_phone: string
  emergency_contact_relationship: string
  previous_scouting_experience: boolean
  interests: string
  availability: string
  status: "pending" | "approved" | "rejected" | "contacted"
  created_at: string
  updated_at: string
}
