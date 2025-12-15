import { useMutation } from "@tanstack/react-query"
import { deleteLp } from "../../apis/lp"

export const useDeleteLp = () => {
  return useMutation({
    mutationFn: deleteLp,
    onSuccess: () => {
      window.location.href = "/"
    }
  })
}