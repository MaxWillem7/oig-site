/**
 * Openbaar basiscertificaat van Supabase ("Supabase Root 2021 CA", geldig tot 26 april 2031).
 * Bron: https://supabase-downloads.s3-ap-southeast-1.amazonaws.com/prod/ssl/prod-ca-2021.crt
 * SHA-256: 80:70:25:AD:50:D4:ED:21:9D:2C:9C:7D:29:9C:00:4F:82:4E:B0:0C:F7:F6:5A:FE:F6:07:D0:7B:72:E6:CA:FA
 * Nodig omdat de database van Supabase een eigen certificaatketen gebruikt. Hiermee blijft de verbinding
 * versleuteld en gecontroleerd; dit is geen geheim.
 */
export const SUPABASE_CA = 
