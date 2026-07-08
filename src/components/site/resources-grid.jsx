import { PdfViewerCard } from "./pdf-viewer-card";

function ResourcesGrid({ resources }) {
  return (
    <section className="bg-background py-12 sm:py-16">
      <div className="container-x mx-auto max-w-6xl">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => (
            <PdfViewerCard
              key={resource.id}
              title={resource.title}
              subtitle={resource.subtitle}
              pdfUrl={resource.pdfUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export { ResourcesGrid };
