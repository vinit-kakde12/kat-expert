import { PageHero } from "@/components/site/page-hero";
import { ResourcesGrid } from "@/components/site/resources-grid";
import { CAT_RESOURCES } from "@/lib/site-data";

function CatResourcesPage() {
  return (
    <main>
      <PageHero title="CAT" breadcrumb={["CAT"]} />
      <ResourcesGrid resources={CAT_RESOURCES} />
    </main>
  );
}

export default CatResourcesPage;
