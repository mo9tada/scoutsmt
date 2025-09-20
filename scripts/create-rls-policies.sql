-- RLS Policies

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON public.profiles
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Events policies
CREATE POLICY "Users can view events in their troop" ON public.events
    FOR SELECT USING (
        troop_id IN (
            SELECT troop_id FROM public.profiles WHERE id = auth.uid()
        )
    );

CREATE POLICY "Leaders and admins can create events" ON public.events
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role IN ('admin', 'leader')
        )
    );

CREATE POLICY "Leaders and admins can update events" ON public.events
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role IN ('admin', 'leader')
        )
    );

-- Event registrations policies
CREATE POLICY "Users can view their own registrations" ON public.event_registrations
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can register for events" ON public.event_registrations
    FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own registrations" ON public.event_registrations
    FOR UPDATE USING (user_id = auth.uid());

-- Merit badges policies (public read)
CREATE POLICY "Anyone can view merit badges" ON public.merit_badges
    FOR SELECT USING (true);

-- User merit badges policies
CREATE POLICY "Users can view their own merit badge progress" ON public.user_merit_badges
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can create their own merit badge progress" ON public.user_merit_badges
    FOR INSERT WITH CHECK (user_id = auth.uid());

-- Service hours policies
CREATE POLICY "Users can view their own service hours" ON public.service_hours
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can create their own service hours" ON public.service_hours
    FOR INSERT WITH CHECK (user_id = auth.uid());
