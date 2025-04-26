export interface User {
  id: string
  student_id: string
  email: string
  first_name: string
  middle_name?: string
  surname: string
  avatar_url?: string
  room_number?: string
  phone?: string
  alt_phone?: string
  move_in_date?: string
  location?: string
  building?: string
  id_number?: string
  start_date?: string
  date_of_birth?: string
  gender?: string
  race?: string
  home_address?: string
  province?: string
  municipality?: string
  locality?: string
  citizenship?: string
  disability?: string
  employment_status?: string
  sassa_grant?: string
  highest_education?: string
  education_mark?: string
  year_completed?: string
  institution?: string
  program?: string
  trade?: string
  bio?: string
}

export interface StipendQuery {
  id: string
  first_name: string
  surname: string
  email: string
  id_number: string
  query: string
  status: string
  notes: string
  updated_at: string
}

export interface Query {
  id: string
  user_id: string
  unique_id: string
  name: string
  building: string
  room_number: string
  priority: string
  type: string
  details: string
  status: string
  created_at: string
  updated_at: string
  reference: string
}

export interface NewsArticle {
  id: string
  category: string
  user_group: string
  title: string
  article: string
  date: string
  time: string
}

export interface Resource {
  id: string
  category: string
  user_group: string
  title: string
  article: string
  date: string
  time: string
}

export interface Event {
  id: string
  user_group: string
  title: string
  event_details: string
  location: string
  date: string
  time: string
}

export interface Message {
  id: string
  user_group: string
  title: string
  message: string
  from: string
  date: string
  time: string
}

export interface Visitor {
  id: string
  full_name: string
  email: string
  visitor_code: string
  code_status: string
  date: string
  time_entry: string
  time_exit: string
}

export interface SupportTicket {
  id: string
  full_name: string
  email: string
  support_category: string
  support_details: string
  status?: string
  created_at?: string
  updated_at?: string
}

export interface ActivityLog {
  id: string
  user_email: string
  action: string
  details: string
  timestamp: string
}

export interface DashboardStats {
  totalUsers: number
  activeQueries: number
  resolvedQueries: number
  pendingStipends: number
  visitorCodes: {
    generated: number
    used: number
    expired: number
  }
  supportTickets: {
    open: number
    closed: number
  }
}

export type UserGroup = "All Students" | "Location" | "User"
export type SupportCategory = "Password Reset" | "Building" | "General"
export type QueryStatus = "Pending" | "Processing" | "Approved" | "Rejected" | "Closed"
export type CodeStatus = "Generated" | "Used" | "Expired"
export type MessageFrom = "Support" | "Management"

