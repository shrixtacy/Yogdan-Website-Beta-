/*
  # Update donor visibility policies

  1. Changes
    - Update the public donor visibility policy to show all registered donors
    - Remove the is_available condition to show all donors

  2. Security
    - Maintains read-only access for public users
    - Keeps existing policies for authenticated users
*/

-- Drop the existing public policy
DROP POLICY IF EXISTS "Public can view available donors" ON profiles;

-- Create new public policy to view all donors
CREATE POLICY "Public can view all donors"
  ON profiles
  FOR SELECT
  TO public
  USING (true);