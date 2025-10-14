export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      blog_posts: {
        Row: {
          author: string
          blocked: boolean
          content: string
          created_at: string
          excerpt: string
          id: string
          image_url: string | null
          publish_date: string
          published: boolean
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          author: string
          blocked?: boolean
          content: string
          created_at?: string
          excerpt: string
          id?: string
          image_url?: string | null
          publish_date?: string
          published?: boolean
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          author?: string
          blocked?: boolean
          content?: string
          created_at?: string
          excerpt?: string
          id?: string
          image_url?: string | null
          publish_date?: string
          published?: boolean
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      company_info: {
        Row: {
          address: string | null
          company_name: string
          created_at: string
          description: string | null
          email: string | null
          facebook_url: string | null
          founded_year: string | null
          id: string
          instagram_url: string | null
          linkedin_url: string | null
          logo: string
          phone: string | null
          tagline: string | null
          team_size: string | null
          twitter_url: string | null
          updated_at: string
          website: string | null
        }
        Insert: {
          address?: string | null
          company_name: string
          created_at?: string
          description?: string | null
          email?: string | null
          facebook_url?: string | null
          founded_year?: string | null
          id?: string
          instagram_url?: string | null
          linkedin_url?: string | null
          logo: string
          phone?: string | null
          tagline?: string | null
          team_size?: string | null
          twitter_url?: string | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          address?: string | null
          company_name?: string
          created_at?: string
          description?: string | null
          email?: string | null
          facebook_url?: string | null
          founded_year?: string | null
          id?: string
          instagram_url?: string | null
          linkedin_url?: string | null
          logo?: string
          phone?: string | null
          tagline?: string | null
          team_size?: string | null
          twitter_url?: string | null
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      images: {
        Row: {
          id: string
          name: string
          size: number
          type: string
          uploaded_at: string
          url: string
        }
        Insert: {
          id?: string
          name: string
          size: number
          type: string
          uploaded_at?: string
          url: string
        }
        Update: {
          id?: string
          name?: string
          size?: number
          type?: string
          uploaded_at?: string
          url?: string
        }
        Relationships: []
      }
      pages: {
        Row: {
          content: string
          created_at: string
          id: string
          slug: string
          title: string
          updated_at: string
          visible: boolean
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          slug: string
          title: string
          updated_at?: string
          visible?: boolean
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          slug?: string
          title?: string
          updated_at?: string
          visible?: boolean
        }
        Relationships: []
      }
      portfolio: {
        Row: {
          blocked: boolean
          category: string
          content: string | null
          created_at: string
          description: string
          featured: boolean
          id: string
          image_url: string | null
          project_url: string | null
          published: boolean
          slug: string
          technologies: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          blocked?: boolean
          category: string
          content?: string | null
          created_at?: string
          description: string
          featured?: boolean
          id?: string
          image_url?: string | null
          project_url?: string | null
          published?: boolean
          slug: string
          technologies?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          blocked?: boolean
          category?: string
          content?: string | null
          created_at?: string
          description?: string
          featured?: boolean
          id?: string
          image_url?: string | null
          project_url?: string | null
          published?: boolean
          slug?: string
          technologies?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      pricing: {
        Row: {
          billing_period: string | null
          created_at: string
          currency: string
          display_order: number
          features: string[] | null
          id: string
          popular: boolean
          price: number
          service_name: string
          updated_at: string
          visible: boolean
        }
        Insert: {
          billing_period?: string | null
          created_at?: string
          currency?: string
          display_order?: number
          features?: string[] | null
          id?: string
          popular?: boolean
          price: number
          service_name: string
          updated_at?: string
          visible?: boolean
        }
        Update: {
          billing_period?: string | null
          created_at?: string
          currency?: string
          display_order?: number
          features?: string[] | null
          id?: string
          popular?: boolean
          price?: number
          service_name?: string
          updated_at?: string
          visible?: boolean
        }
        Relationships: []
      }
      reviews: {
        Row: {
          comment: string
          created_at: string
          email: string
          id: string
          name: string
          rating: number
          source: string
          updated_at: string
          visible: boolean
        }
        Insert: {
          comment: string
          created_at?: string
          email: string
          id?: string
          name: string
          rating: number
          source?: string
          updated_at?: string
          visible?: boolean
        }
        Update: {
          comment?: string
          created_at?: string
          email?: string
          id?: string
          name?: string
          rating?: number
          source?: string
          updated_at?: string
          visible?: boolean
        }
        Relationships: []
      }
      services: {
        Row: {
          created_at: string
          description: string
          display_order: number
          icon: string
          id: string
          image_path: string | null
          page_url: string
          title: string
          updated_at: string
          visible: boolean
        }
        Insert: {
          created_at?: string
          description: string
          display_order?: number
          icon: string
          id?: string
          image_path?: string | null
          page_url: string
          title: string
          updated_at?: string
          visible?: boolean
        }
        Update: {
          created_at?: string
          description?: string
          display_order?: number
          icon?: string
          id?: string
          image_path?: string | null
          page_url?: string
          title?: string
          updated_at?: string
          visible?: boolean
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          author: string
          company: string
          created_at: string
          display_order: number
          id: string
          image_url: string | null
          quote: string
          role: string
          updated_at: string
          visible: boolean
        }
        Insert: {
          author: string
          company: string
          created_at?: string
          display_order?: number
          id?: string
          image_url?: string | null
          quote: string
          role: string
          updated_at?: string
          visible?: boolean
        }
        Update: {
          author?: string
          company?: string
          created_at?: string
          display_order?: number
          id?: string
          image_url?: string | null
          quote?: string
          role?: string
          updated_at?: string
          visible?: boolean
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
