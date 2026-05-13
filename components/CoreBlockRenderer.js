export default function CoreBlockRenderer({ block }) {
  switch (block.name) {
    case 'core/paragraph':
      return (
        <div
          className="max-w-4xl mx-auto px-6 py-6 text-lg text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: block.attributes?.content || '',
          }}
        />
      );

    case 'core/heading':
      return (
        <div
          className="max-w-4xl mx-auto px-6 py-6"
          dangerouslySetInnerHTML={{
            __html: block.attributes?.content || '',
          }}
        />
      );

    case 'core/image':
      return (
        <div className="max-w-5xl mx-auto px-6 py-10">
          <img
            src={block.attributes?.url}
            alt={block.attributes?.alt || ''}
            className="w-full rounded-3xl"
          />
        </div>
      );

    case 'core/list':
      return (
        <div
          className="max-w-4xl mx-auto px-6 py-6"
          dangerouslySetInnerHTML={{
            __html: block.attributes?.values || '',
          }}
        />
      );

    default:
      return null;
  }
}