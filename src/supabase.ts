// src/supabase.ts
import { createClient } from '@supabase/supabase-js';

// Remplacez par vos informations Supabase
const supabaseUrl = 'https://dxbyncqvkmifcvabhbey.supabase.co'; // Remplacez par l'URL de votre projet Supabase
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR4YnluY3F2a21pZmN2YWJoYmV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzMzc1MTYsImV4cCI6MjA2ODkxMzUxNn0.Eww30cCJ6NXRKWDGRK1Tr7Zr6pTb1O5O2gKSTdnfzpk'; // Remplacez par votre clé anonyme

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
