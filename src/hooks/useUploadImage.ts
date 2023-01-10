import { useCallback, useState } from 'react';
import supabase from '../utils/supabase';

export function useUploadImage(
  setError: React.Dispatch<React.SetStateAction<string | undefined>>
) {
  const [imageLoading, setImageLoading] = useState(false);

  const upload = useCallback(
    async (image: File | null) => {
      if (!image) return null;
      setImageLoading(true);
      const { data, error } = await supabase.storage
        .from('gastry')
        .upload(`recipes/${crypto.randomUUID()}`, image);

      if (error) {
        setError(error.message);
        setImageLoading(false);
        return null;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from('gastry').getPublicUrl(data.path);

      setImageLoading(false);
      return publicUrl;
    },
    [setError]
  );

  return {
    imageLoading,
    upload,
  };
}
