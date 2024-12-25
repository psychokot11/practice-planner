import { useQuery } from "@tanstack/react-query";
import { getTags } from "../../services/apiTags";

export function useTags() {
  const {
    isLoading,
    data: tags,
    error,
  } = useQuery({
    queryKey: ["tags"],
    queryFn: getTags,
  });

  return { tags, isLoading, error };
}