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
      apartment_bookings: {
        Row: {
          created_at: string
          date: string
          email: string
          id: string
          meeting_platform: string
          name: string
          notes: string | null
          phone: string
          source: string
          status: string
          time: string
          timezone: string | null
          timezone_offset: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          date: string
          email: string
          id?: string
          meeting_platform: string
          name: string
          notes?: string | null
          phone: string
          source?: string
          status?: string
          time: string
          timezone?: string | null
          timezone_offset?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          date?: string
          email?: string
          id?: string
          meeting_platform?: string
          name?: string
          notes?: string | null
          phone?: string
          source?: string
          status?: string
          time?: string
          timezone?: string | null
          timezone_offset?: number | null
          updated_at?: string
        }
        Relationships: []
      }
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
      clients: {
        Row: {
          address: string | null
          city: string | null
          company: string | null
          country: string
          created_at: string
          email: string
          id: string
          name: string
          notes: string | null
          phone: string | null
          state: string | null
          updated_at: string
          zip_code: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          company?: string | null
          country?: string
          created_at?: string
          email: string
          id?: string
          name: string
          notes?: string | null
          phone?: string | null
          state?: string | null
          updated_at?: string
          zip_code?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          company?: string | null
          country?: string
          created_at?: string
          email?: string
          id?: string
          name?: string
          notes?: string | null
          phone?: string | null
          state?: string | null
          updated_at?: string
          zip_code?: string | null
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
      contact_submissions: {
        Row: {
          company: string | null
          created_at: string
          email: string
          id: string
          message: string
          name: string
          pdf_url: string | null
          phone: string | null
          status: string
          updated_at: string
        }
        Insert: {
          company?: string | null
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          pdf_url?: string | null
          phone?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          company?: string | null
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          pdf_url?: string | null
          phone?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      expenses: {
        Row: {
          amount: number
          category: string
          client_id: string | null
          created_at: string
          date: string
          description: string
          id: string
          invoice_id: string | null
          notes: string | null
          payment_method: string
          receipt_url: string | null
          status: string
          updated_at: string
          vendor: string | null
        }
        Insert: {
          amount?: number
          category: string
          client_id?: string | null
          created_at?: string
          date?: string
          description: string
          id?: string
          invoice_id?: string | null
          notes?: string | null
          payment_method: string
          receipt_url?: string | null
          status?: string
          updated_at?: string
          vendor?: string | null
        }
        Update: {
          amount?: number
          category?: string
          client_id?: string | null
          created_at?: string
          date?: string
          description?: string
          id?: string
          invoice_id?: string | null
          notes?: string | null
          payment_method?: string
          receipt_url?: string | null
          status?: string
          updated_at?: string
          vendor?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "expenses_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expenses_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
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
      income: {
        Row: {
          amount: number
          client_id: string | null
          created_at: string
          date: string
          description: string
          id: string
          invoice_id: string | null
          notes: string | null
          payment_method: string
          receipt_url: string | null
          source: string
          status: string
          updated_at: string
        }
        Insert: {
          amount?: number
          client_id?: string | null
          created_at?: string
          date?: string
          description: string
          id?: string
          invoice_id?: string | null
          notes?: string | null
          payment_method: string
          receipt_url?: string | null
          source: string
          status?: string
          updated_at?: string
        }
        Update: {
          amount?: number
          client_id?: string | null
          created_at?: string
          date?: string
          description?: string
          id?: string
          invoice_id?: string | null
          notes?: string | null
          payment_method?: string
          receipt_url?: string | null
          source?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "income_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "income_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      invoice_items: {
        Row: {
          amount: number
          created_at: string
          description: string
          display_order: number
          id: string
          invoice_id: string
          quantity: number
          unit_price: number
        }
        Insert: {
          amount?: number
          created_at?: string
          description: string
          display_order?: number
          id?: string
          invoice_id: string
          quantity?: number
          unit_price?: number
        }
        Update: {
          amount?: number
          created_at?: string
          description?: string
          display_order?: number
          id?: string
          invoice_id?: string
          quantity?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "invoice_items_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          client_id: string
          created_at: string
          due_date: string
          id: string
          invoice_number: string
          issue_date: string
          notes: string | null
          paid_at: string | null
          payment_terms: string | null
          sent_at: string | null
          status: string
          subtotal: number
          tax_amount: number
          tax_rate: number
          total: number
          updated_at: string
        }
        Insert: {
          client_id: string
          created_at?: string
          due_date: string
          id?: string
          invoice_number: string
          issue_date?: string
          notes?: string | null
          paid_at?: string | null
          payment_terms?: string | null
          sent_at?: string | null
          status?: string
          subtotal?: number
          tax_amount?: number
          tax_rate?: number
          total?: number
          updated_at?: string
        }
        Update: {
          client_id?: string
          created_at?: string
          due_date?: string
          id?: string
          invoice_number?: string
          issue_date?: string
          notes?: string | null
          paid_at?: string | null
          payment_terms?: string | null
          sent_at?: string | null
          status?: string
          subtotal?: number
          tax_amount?: number
          tax_rate?: number
          total?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "invoices_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      pages: {
        Row: {
          content: string
          created_at: string
          id: string
          iframe_url: string | null
          slug: string
          title: string
          updated_at: string
          visible: boolean
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          iframe_url?: string | null
          slug: string
          title: string
          updated_at?: string
          visible?: boolean
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          iframe_url?: string | null
          slug?: string
          title?: string
          updated_at?: string
          visible?: boolean
        }
        Relationships: []
      }
      pdf_access_requests: {
        Row: {
          company: string | null
          created_at: string
          email: string
          id: string
          name: string
          pdf_id: string
          phone: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string
          email: string
          id?: string
          name: string
          pdf_id: string
          phone?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string
          email?: string
          id?: string
          name?: string
          pdf_id?: string
          phone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pdf_access_requests_pdf_id_fkey"
            columns: ["pdf_id"]
            isOneToOne: false
            referencedRelation: "pdf_documents"
            referencedColumns: ["id"]
          },
        ]
      }
      pdf_documents: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          file_size: number | null
          file_url: string
          id: string
          slug: string | null
          title: string
          updated_at: string
          visible: boolean
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          file_size?: number | null
          file_url: string
          id?: string
          slug?: string | null
          title: string
          updated_at?: string
          visible?: boolean
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          file_size?: number | null
          file_url?: string
          id?: string
          slug?: string | null
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
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
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
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      transactions: {
        Row: {
          amount: number | null
          category: string | null
          client_id: string | null
          created_at: string | null
          date: string | null
          description: string | null
          id: string | null
          invoice_id: string | null
          payment_method: string | null
          status: string | null
          type: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      generate_invoice_number: { Args: never; Returns: string }
      grant_admin_to_self_if_allowed: { Args: never; Returns: undefined }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
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
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
