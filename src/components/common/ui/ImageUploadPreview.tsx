import { useEffect, useState } from "react";
import { Layout, Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);
interface ImageUploadPreviewProps {
  onHandleChange?: (urls: string[]) => void;
  id?: string;
  name?: string;
}
function ImageUploadPreview({ onHandleChange }: ImageUploadPreviewProps) {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [layout, setLayout] = useState<Layout[]>([]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const images = Array.from(files).map((file) => URL.createObjectURL(file));

      // Limit the number of images to 9 (3 rows of 3)
      const remainingImages = images.slice(0, 9 - uploadedImages.length);

      setUploadedImages((prevImages) => [...prevImages, ...remainingImages]);
    }
  };

  const sortImages = (layout: Layout[]) => {
    const sortedImages = layout
      .sort((a, b) => a.y - b.y || a.x - b.x)
      .map((item) => uploadedImages[item.i as unknown as number]);
    onHandleChange && onHandleChange(sortedImages);
  };

  useEffect(() => {
    sortImages(layout);
  }, [layout]);

  useEffect(() => {
    const newLayout: Layout[] = uploadedImages.map((image, index) => ({
      i: index.toString(),
      x: index % 3, // Each grid item takes up 1 column, and there are 3 items per row
      y: Math.floor(index / 3), // Move to the next row every 3 items
      w: 1,
      h: 1,
    }));

    setLayout(newLayout);
    return () => {
      uploadedImages.forEach((image) => URL.revokeObjectURL(image));
    };
  }, [uploadedImages]);

  const onDragStop = (newLayout: Layout[]) => {
    // Sort items by y coordinate, and then by x coordinate
    newLayout.sort((a, b) => a.y - b.y || a.x - b.x);

    const correctedLayout = newLayout.map((item, index) => {
      item.x = index % 3;
      item.y = Math.floor(index / 3);
      return item;
    });

    setLayout(correctedLayout);
  };

  return (
    <div className="p-4">
      <label className="mb-4 block text-lg font-semibold text-gray-800">
        Upload Images
      </label>
      <div className="relative mb-4 flex h-32 w-full cursor-pointer items-center justify-center overflow-hidden rounded-md border-2 border-dashed border-gray-300 bg-white">
        <span className="text-gray-600">
          {uploadedImages.length === 0
            ? "Drop files here or click to browse"
            : `${uploadedImages.length} image${
                uploadedImages.length > 1 ? "s" : ""
              } selected`}
        </span>
        <input
          type="file"
          multiple
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          onChange={handleImageUpload}
        />
      </div>
      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: layout }}
        breakpoints={{ lg: 1200 }}
        cols={{ lg: 3 }}
        onDragStop={onDragStop}
      >
        {uploadedImages.map((src, index) => (
          <div
            key={index}
            className="h-40 bg-gray-300 bg-cover bg-center"
            style={{ backgroundImage: `url(${src})` }}
          ></div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
}

export default ImageUploadPreview;
