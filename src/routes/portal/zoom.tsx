// import { markketplace } from "../../config";
// import type { Store } from '../../markket/index.d';
// import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute({
  component: PortalZoomIndex,
});

var config = {
  videoSDKJWT: "",
  sessionName: "SessionA",
  userName: "UserA",
  sessionPasscode: "abc123",
};


function PortalZoomIndex() {

  // if (isLoading) return <div className="p-8 text-lg">Loading store info…</div>;
  // if (error) return <div className="p-8 text-red-500">Error loading store!</div>;
  console.log({config})

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-3xl font-bold mb-2">Meeting room</h1>
      <p className="text-lg text-gray-600 mb-4">
        Loading interface...
      </p>
    </div>
  );
}

export default PortalZoomIndex;
