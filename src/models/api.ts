// API types
interface AssetReference {
  sys: {
    id: string;
  };
}

interface Asset<Fields> extends AssetReference {
  fields: Fields;
}

type Image = Asset<{
  file: {
    url: string;
  };
}>;

// Exports
export type { Asset, AssetReference, Image };
