import React from 'react';

interface ServiceCardSkeletonProps {
  index?: number;
}

const ServiceCardSkeleton: React.FC<ServiceCardSkeletonProps> = ({ index = 0 }) => {
  return (
    <div 
      className="relative overflow-hidden rounded-xl bg-surface border border-white/5 p-1"
      style={{ 
        contain: 'layout style paint',
        contentVisibility: 'auto'
      }}
      role="status"
      aria-label="Loading service information"
      aria-busy="true"
    >
      <div className="flex flex-col md:flex-row h-full rounded-lg overflow-hidden bg-[#151b26]">
        {/* Image Skeleton */}
        <div className="w-full md:w-2/5 aspect-video md:aspect-auto relative overflow-hidden">
          <div 
            className="absolute inset-0 bg-white/5 animate-pulse"
            style={{ willChange: 'opacity' }}
          />
          {/* Shimmer effect */}
          <div 
            className="absolute inset-0 -translate-x-full animate-shimmer"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)',
              willChange: 'transform'
            }}
          />
        </div>

        {/* Content Skeleton */}
        <div className="flex flex-1 flex-col justify-between p-6 md:p-8">
          <div className="flex flex-col gap-4">
            {/* Icon Skeleton */}
            <div 
              className="w-8 h-8 rounded bg-white/5 animate-pulse"
              style={{ willChange: 'opacity' }}
            />
            
            {/* Title Skeleton */}
            <div 
              className="h-8 w-3/4 rounded bg-white/5 animate-pulse"
              style={{ 
                willChange: 'opacity',
                animationDelay: `${index * 100}ms`
              }}
            />
            
            {/* Description Skeleton */}
            <div className="space-y-2">
              <div 
                className="h-4 w-full rounded bg-white/5 animate-pulse"
                style={{ 
                  willChange: 'opacity',
                  animationDelay: `${index * 100 + 50}ms`
                }}
              />
              <div 
                className="h-4 w-5/6 rounded bg-white/5 animate-pulse"
                style={{ 
                  willChange: 'opacity',
                  animationDelay: `${index * 100 + 100}ms`
                }}
              />
            </div>
          </div>

          {/* Tags Skeleton */}
          <div 
            className="mt-8 flex flex-wrap gap-2"
            aria-hidden="true"
          >
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-6 w-20 rounded-full bg-white/5 animate-pulse"
                style={{ 
                  willChange: 'opacity',
                  animationDelay: `${index * 100 + i * 50}ms`
                }}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Screen reader text */}
      <span className="sr-only">
        Loading service card {index + 1} of 3
      </span>
    </div>
  );
};

export default ServiceCardSkeleton;
