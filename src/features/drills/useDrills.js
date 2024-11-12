import { useQuery } from "@tanstack/react-query";
import { getDrills } from "../../services/apiDrills";

export function useDrills() {
  const {
    isLoading,
    data: drills,
    error,
  } = useQuery({
    queryKey: ["drills"],
    queryFn: getDrills,
  });

  return { drills, isLoading, error };
}
