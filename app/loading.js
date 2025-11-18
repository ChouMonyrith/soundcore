import { Spinner } from "./_ui/spinner";

export default function loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Spinner className="size-16" />
    </div>
  );
}
