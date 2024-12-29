import { useQuery } from "@tanstack/react-query";
import { getPlans } from "../../services/apiPlans";

export function usePlans() {
  const {
    isLoading,
    data: plans,
    error,
  } = useQuery({
    queryKey: ["plans"],
    queryFn: getPlans,
  });

  return { plans, isLoading, error };
}