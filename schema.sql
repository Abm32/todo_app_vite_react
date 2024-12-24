-- Enable RLS (Row Level Security)
alter table public.users enable row level security;
alter table public.journal_entries enable row level security;
alter table public.families enable row level security;
alter table public.family_members enable row level security;
alter table public.messages enable row level security;
alter table public.events enable row level security;

-- Create tables
create table public.users (
  id uuid references auth.users on delete cascade,
  name text,
  email text,
  date_of_birth date,
  bio text,
  profile_photo text,
  role text default 'user',
  is_profile_complete boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (id)
);

create table public.journal_entries (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users on delete cascade,
  date date not null,
  content text not null,
  mood text,
  photos text[],
  tags text[],
  is_public boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.families (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text,
  created_by uuid references public.users on delete cascade,
  cover_photo text,
  member_count int default 1,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.family_members (
  id uuid default uuid_generate_v4() primary key,
  family_id uuid references public.families on delete cascade,
  user_id uuid references public.users on delete cascade,
  role text default 'member',
  parent_id uuid references public.family_members(id),
  generation int default 0,
  joined_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(family_id, user_id)
);

create table public.messages (
  id uuid default uuid_generate_v4() primary key,
  chat_id uuid not null,
  sender_id uuid references public.users on delete cascade,
  recipient_id uuid references public.users on delete cascade,
  content text not null,
  type text default 'text',
  status text default 'sent',
  timestamp timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.events (
  id uuid default uuid_generate_v4() primary key,
  family_id uuid references public.families on delete cascade,
  title text not null,
  description text,
  date timestamp with time zone not null,
  type text default 'event',
  created_by uuid references public.users on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create indexes
create index journal_entries_user_id_idx on public.journal_entries(user_id);
create index family_members_family_id_idx on public.family_members(family_id);
create index family_members_user_id_idx on public.family_members(user_id);
create index messages_chat_id_idx on public.messages(chat_id);
create index events_family_id_idx on public.events(family_id);

-- Set up Row Level Security policies
create policy "Users can view their own profile"
  on public.users for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.users for update
  using (auth.uid() = id);

create policy "Users can view their own journal entries"
  on public.journal_entries for select
  using (auth.uid() = user_id or is_public = true);

create policy "Users can create their own journal entries"
  on public.journal_entries for insert
  with check (auth.uid() = user_id);

create policy "Users can view families they belong to"
  on public.families for select
  using (exists (
    select 1 from public.family_members
    where family_members.family_id = families.id
    and family_members.user_id = auth.uid()
  ));

create policy "Users can create families"
  on public.families for insert
  with check (auth.uid() = created_by);

create policy "Users can view family members"
  on public.family_members for select
  using (exists (
    select 1 from public.family_members as fm
    where fm.family_id = family_members.family_id
    and fm.user_id = auth.uid()
  ));