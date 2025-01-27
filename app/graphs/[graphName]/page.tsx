type Params = Promise<{ graphName: string }>;

export default async function Graph({ params }: { params: Params }) {
  const { graphName } = await params;

  return (
    <div>
      <span>{graphName}</span> goes here.
    </div>
  );
}
