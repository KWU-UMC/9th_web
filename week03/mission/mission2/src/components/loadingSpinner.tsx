import { ClipLoader } from "react-spinners";

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-screen">
      <ClipLoader color="#36d7b7" />
    </div>
  );
}
