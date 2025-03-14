import { z } from "zod";

export const uploadMusicSchemaZod = z.object({
  title: z.string().min(1, "Title is required"),
  duration: z.string().min(1, "Duration is required"),
  genre: z.string().min(1, "Genre is required"),
  bpm: z.number().min(1, "BPM must be a positive number"),
  mood: z.string().min(1, "Mood is required"),
  price: z.number().min(0, "Price must be a non-negative number"),
  audio: z.string().min(1, "Audio URL is required"),
  sellerID: z.string().min(1, "Seller ID is required"),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  image: z.string().min(1, "Image URL is required"),
});
