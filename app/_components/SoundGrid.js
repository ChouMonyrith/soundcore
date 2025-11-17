import { Spinner } from "../_ui/spinner";
import SoundCard from "./SoundCard";

const SoundGrid = ({ sounds, error, loadingOverride = false }) => {
  const loading = loadingOverride || !sounds;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner className="size-16" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {error && <p className="text-center text-red-500">{error}</p>}

      {sounds.map((sound) => (
        <SoundCard key={sound.id} sound={sound} />
      ))}
    </div>
  );
};

export default SoundGrid;
