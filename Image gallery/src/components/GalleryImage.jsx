import React, { useState } from 'react';

const GalleryImage = () => {
  const images = [
    "https://picsum.photos/id/101/300/200",
    "https://picsum.photos/id/102/300/200",
    "https://picsum.photos/id/103/300/200",
    "https://picsum.photos/id/104/300/200",
  ];

  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <>
      {/* Heading */}
      <div className="flex justify-center items-center">
        <p className='text-black underline mt-4'>Click on an image!</p>
      </div>

      {/* Gallery Grid */}
      <div className='flex justify-center items-center'>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-5">
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`photo-${idx}`}
              className="w-full h-40 object-cover rounded-lg shadow-md cursor-pointer hover:scale-105 transition border-none"
              onClick={() => setSelectedImg(img)}
            />
          ))}
        </div>
      </div>

      {/* Selected Image */}
      {selectedImg && (
        <div className="mt-6 flex flex-col justify-center items-center">
          {/* Text above image */}
          <p className='mb-2 font-semibold text-gray-700'>Selected Image</p>

          {/* Image */}
          <img
            src={selectedImg}
            alt="enlarged"
            className="w-[230px] md:w-2/3 lg:w-1/2 h-auto rounded-lg shadow-md transition-transform duration-300"
          />
        </div>
      )}
    </>
  );
};

export default GalleryImage;
