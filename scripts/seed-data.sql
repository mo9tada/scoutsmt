-- Insert sample troops
INSERT INTO public.troops (name, troop_number, location, meeting_location, meeting_time) VALUES
('Troop 123', '123', 'Springfield', 'Community Center', 'Mondays 7:00 PM'),
('Troop 456', '456', 'Riverside', 'Church Hall', 'Wednesdays 6:30 PM');

-- Insert sample ranks
INSERT INTO public.ranks (name, description, order_sequence, requirements) VALUES
('Scout', 'First rank in Boy Scouts', 1, ARRAY['Complete application', 'Repeat Scout Oath and Law']),
('Tenderfoot', 'Second rank', 2, ARRAY['Active participation for 2 months', 'Demonstrate Scout spirit']),
('Second Class', 'Third rank', 3, ARRAY['Active participation for 2 months since Tenderfoot', 'Demonstrate camping skills']),
('First Class', 'Fourth rank', 4, ARRAY['Active participation for 2 months since Second Class', 'Demonstrate leadership']),
('Star', 'Fifth rank', 5, ARRAY['4 months active since First Class', 'Earn 6 merit badges']),
('Life', 'Sixth rank', 6, ARRAY['6 months active since Star', 'Earn 5 additional merit badges']),
('Eagle', 'Highest rank', 7, ARRAY['6 months active since Life', 'Earn 21 merit badges', 'Complete Eagle project']);

-- Insert sample merit badges
INSERT INTO public.merit_badges (name, description, category, difficulty_level, requirements) VALUES
('Camping', 'Learn outdoor camping skills', 'Outdoor', 2, ARRAY['Plan and execute 20 nights of camping', 'Demonstrate camp setup skills']),
('First Aid', 'Learn basic first aid and emergency response', 'Health & Safety', 3, ARRAY['Demonstrate bandaging techniques', 'Show CPR knowledge']),
('Cooking', 'Learn cooking and nutrition skills', 'Life Skills', 2, ARRAY['Plan and cook meals', 'Demonstrate food safety']),
('Swimming', 'Water safety and swimming skills', 'Sports', 3, ARRAY['Swim 150 yards', 'Demonstrate water rescue techniques']),
('Citizenship in the Community', 'Learn about community involvement', 'Citizenship', 2, ARRAY['Attend community meetings', 'Complete community service project']);
