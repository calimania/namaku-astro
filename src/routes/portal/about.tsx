// import { useRouteContext } from "@tanstack/react-router";
// import type { Store } from '../../markket';
import { markketplace } from "../../markket.config";
import { useQuery } from "@tanstack/react-query";
import PageContent from "../../components/content.blocks";
import type { Page } from "../../markket";

export const Route = createFileRoute({
  component: PortalAbout,
});

const fetchPage = async () => {
  const res = await fetch(new URL(`/api/pages?filters[slug][$eq]=platform.about&filters[store][slug][$eq]=${markketplace.portal.slug}&populate[]=SEO`, markketplace.api));
  if (!res.ok) throw new Error("Failed to fetch store");
  return res.json();
};

function PortalAbout() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["page.platform.about"],
    queryFn: fetchPage,
  });

  const page = data?.data?.[0] as Page;

  return (
    <div className="flex flex-col justify-center min-h-[60vh]">
      <h2 className="text-lg text-gray-600 mb-4 text-left">
        {page?.Title || 'About'}
      </h2>
      <div className="bg-blue-50 px-4 py-2 rounded text-blue-700 max-w-[728px]" >
        <PageContent params={{ page }} />
      </div>
    </div>
  );
}

export default PortalAbout;
