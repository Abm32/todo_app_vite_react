import { supabase } from '../../config/supabase';
import { PostgrestError } from '@supabase/supabase-js';

export const supabaseDB = {
  // Journal Entries
  createJournalEntry: async (data: any) => {
    try {
      const { data: entry, error } = await supabase
        .from('journal_entries')
        .insert([{ ...data, created_at: new Date() }])
        .select()
        .single();
      
      if (error) throw error;
      return entry;
    } catch (error) {
      throw error as PostgrestError;
    }
  },

  getJournalEntries: async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('journal_entries')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      throw error as PostgrestError;
    }
  },

  // Families
  createFamily: async (data: any) => {
    try {
      const { data: family, error } = await supabase
        .from('families')
        .insert([{ ...data, created_at: new Date() }])
        .select()
        .single();

      if (error) throw error;
      return family;
    } catch (error) {
      throw error as PostgrestError;
    }
  },

  getFamilies: async () => {
    try {
      const { data, error } = await supabase
        .from('families')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      throw error as PostgrestError;
    }
  },

  // Family Members
  addFamilyMember: async (familyId: string, userData: any) => {
    try {
      const { data: member, error } = await supabase
        .from('family_members')
        .insert([{
          family_id: familyId,
          ...userData,
          joined_at: new Date()
        }])
        .select()
        .single();

      if (error) throw error;
      return member;
    } catch (error) {
      throw error as PostgrestError;
    }
  },

  getFamilyMembers: async (familyId: string) => {
    try {
      const { data, error } = await supabase
        .from('family_members')
        .select('*')
        .eq('family_id', familyId);

      if (error) throw error;
      return data;
    } catch (error) {
      throw error as PostgrestError;
    }
  },

  // Messages
  sendMessage: async (data: any) => {
    try {
      const { data: message, error } = await supabase
        .from('messages')
        .insert([{
          ...data,
          timestamp: new Date()
        }])
        .select()
        .single();

      if (error) throw error;
      return message;
    } catch (error) {
      throw error as PostgrestError;
    }
  },

  getMessages: async (conversationId: string) => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('timestamp', { ascending: true });

      if (error) throw error;
      return data;
    } catch (error) {
      throw error as PostgrestError;
    }
  },

  // Calendar Events
  createEvent: async (data: any) => {
    try {
      const { data: event, error } = await supabase
        .from('events')
        .insert([{
          ...data,
          created_at: new Date()
        }])
        .select()
        .single();

      if (error) throw error;
      return event;
    } catch (error) {
      throw error as PostgrestError;
    }
  },

  getEvents: async (familyId: string) => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('family_id', familyId)
        .order('date', { ascending: true });

      if (error) throw error;
      return data;
    } catch (error) {
      throw error as PostgrestError;
    }
  }
};