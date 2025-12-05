'use client';

const services = [
  'Website Development',
  'App Development in Nepal',
  'System / Software Development',
  'UI/UX Design',
  'Search Engine Optimization (SEO)',
  'Social Media Marketing (SMM)',
  'Graphic Design',
  'Content Writing',
];

export function WaterWheel() {
  return (
    <div className="relative flex h-full min-h-[400px] w-full items-center justify-center overflow-visible sm:min-h-[500px] md:min-h-[600px]">
      {/* Subtle gradient background circle */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-[90%] w-[90%] rounded-full bg-gradient-to-br from-blue-950/20 via-transparent to-gray-950/20 blur-3xl"></div>
      </div>

      {/* Main Wheel Container */}
      <div className="relative h-64 w-64 overflow-visible sm:h-80 sm:w-80 md:h-96 md:w-96 lg:h-[420px] lg:w-[420px]">
        {/* Outer glow ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-600/10 via-transparent to-blue-800/10 blur-xl"></div>

        {/* Wheel Shadow */}
        <div className="absolute inset-0 translate-y-4 transform rounded-full bg-black/30 blur-2xl"></div>

        {/* Rotating Wheel */}
        <div className="animate-rotate-wheel relative h-full w-full overflow-visible rounded-full">
          {/* Central Hub */}
          <div className="absolute left-1/2 top-1/2 z-20 h-16 w-16 -translate-x-1/2 -translate-y-1/2 sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-28 lg:w-28">
            <div className="relative h-full w-full">
              {/* Hub shadow */}
              <div className="absolute inset-0 rounded-full bg-black/40 blur-md"></div>
              {/* Hub main */}
              <div className="absolute inset-0 rounded-full border-4 border-amber-600/50 bg-gradient-to-br from-amber-800 via-amber-700 to-amber-900 shadow-2xl">
                <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-amber-600/30 to-transparent"></div>
                <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-900/80 shadow-inner sm:h-4 sm:w-4"></div>
              </div>
            </div>
          </div>

          {/* Wheel Spokes with Service Buckets */}
          {services.map((service, index) => {
            const angle = (index * 360) / services.length;
            const radius = 0.42; // 42% of container radius

            return (
              <div
                key={`spoke-${index}`}
                className="absolute left-1/2 top-1/2"
                style={{
                  transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                  transformOrigin: 'center center',
                }}
              >
                {/* Spoke/Arm */}
                <div
                  className="absolute left-1/2 top-0 -translate-x-1/2"
                  style={{
                    width: '3px',
                    height: `${radius * 100}%`,
                    transformOrigin: 'top center',
                  }}
                >
                  {/* Spoke shadow */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-b from-amber-900/60 to-amber-800/40 blur-sm"></div>
                  {/* Spoke main */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-b from-amber-800 via-amber-700 to-amber-900 shadow-lg">
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 to-transparent"></div>
                  </div>
                </div>

                {/* Service Bucket */}
                <div
                  key={`bucket-${index}`}
                  className="absolute left-1/2"
                  style={{
                    top: `${radius * 100}%`,
                    transform: `translate(-50%, -50%) rotate(${-angle}deg)`,
                    transformOrigin: 'center center',
                  }}
                >
                  <div className="relative">
                    {/* Bucket shadow */}
                    <div className="absolute inset-0 translate-x-0.5 translate-y-1 transform rounded-lg bg-black/30 blur-md"></div>

                    {/* Bucket container */}
                    <div className="relative rounded-lg border-2 border-amber-600/50 bg-gradient-to-br from-amber-800 via-amber-700 to-amber-900 px-2.5 py-2 shadow-xl sm:px-3.5 sm:py-2.5 md:px-4 md:py-3">
                      {/* Bucket inner highlight */}
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-tr from-amber-600/20 to-transparent"></div>
                      {/* Bucket wood grain effect */}
                      <div className="absolute inset-0 rounded-lg opacity-10">
                        <div className="h-full w-full bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.1)_50%,transparent_100%)]"></div>
                      </div>

                      {/* Service text */}
                      <p className="relative z-10 max-w-[110px] whitespace-normal text-center text-[9px] font-semibold leading-tight text-white drop-shadow-lg sm:max-w-[130px] sm:text-[10px] md:max-w-[150px] md:text-xs">
                        {service}
                      </p>

                      {/* Bucket handle/rim */}
                      <div className="absolute -top-0.5 left-1/2 h-0.5 w-[90%] -translate-x-1/2 rounded-full bg-gradient-to-r from-amber-600 to-amber-700 shadow-md"></div>
                      <div className="absolute -bottom-0.5 left-1/2 h-0.5 w-[90%] -translate-x-1/2 rounded-full bg-gradient-to-r from-amber-900 to-amber-800"></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Outer Wheel Rim */}
          <div className="absolute inset-0 rounded-full border-8 border-amber-800/60 shadow-2xl">
            <div className="absolute inset-2 rounded-full border-4 border-amber-700/40"></div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-700/20 via-transparent to-amber-900/20"></div>
          </div>

          {/* Wood texture overlay */}
          <div className="pointer-events-none absolute inset-0 rounded-full opacity-5">
            <div className="h-full w-full bg-[radial-gradient(circle_at_50%_50%,rgba(139,69,19,0.3)_0%,transparent_70%)]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
